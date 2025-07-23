import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import createRequestMessage from "./helpers/create-request-message";
import { handleResponseMessage } from "./helpers/handle-response-message";
import { getStorageData } from "framework/src/Utilities";
import { DeviceEventEmitter } from "react-native";
import { translate } from "../../../components/src/i18n/translate";
const {openDatabase} = require("react-native-sqlite-storage");
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  setGiftData:(data:any) => void;
  setCategoryData:(data:any) => void;
  setSelectedGift:(data:any)=>void;
  getParticipant:()=>void;
  setGiftModel:()=>void;
  setParticipantModel:()=>void;
  setParticipantLoader:()=>void;
  giftsModal:boolean;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  giftsdata: any;
  categorydata: any;
  categoryid: any;
  selectedGift: any;
  giftsLoader: boolean;
  coins: number;
  giftAlertPopup: { openAlertModal: boolean; alertMsg: string };
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class GiftModelController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  unsubscribe: any;
  deviceEmitter:any;
  database : any;
  getcategoryApiCallId: string = "";
  getcatlogApiCallId: string = "";
  getAllGiftsDataApiId: {catId : string, apiId : string}[] = [];
  getcoinid: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.database = openDatabase({name : "gift_asset"});
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      giftsdata: {},
      categorydata: [],
      categoryid: '',
      selectedGift: null,
      giftsLoader: false,
      coins: 0,
      giftAlertPopup: { openAlertModal: false, alertMsg: "" },
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    const apiRequestMessageID = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage),
    );

    const responseDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
    );

    const errorDataJson = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage),
    );

    this.handleAllGift(responseDataJson,errorDataJson,apiRequestMessageID)

    switch (apiRequestMessageID) {
        case this.getcategoryApiCallId: {
            handleResponseMessage({
                responseJson: responseDataJson,
                errorJson: errorDataJson,

                onSuccess: () => {
                    this.setState({
                        categorydata: responseDataJson.data,
                        categoryid: responseDataJson.data[0].id
                    }, () => {
                        this.props.setCategoryData(this.state.categorydata)
                        responseDataJson?.data?.forEach((item: any) => {
                            this.getCatloge(item?.id)
                        })
                    })

                },
                onFail: () => { }
            })
            break;
        }


      case this.getcoinid: {
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson:errorDataJson,
          
          onSuccess: ()=> {
            this.setState({coins:responseDataJson.coins_count})
          },
          onFail:() => {this.props.setParticipantLoader()}
        })
        break;
      }

        case this.getcatlogApiCallId: {
            handleResponseMessage({
                responseJson: responseDataJson,
                errorJson: errorDataJson,

                onSuccess: () => {
                    const newGiftsData = { ...this.state.giftsdata };
                    newGiftsData[this.state.categoryid] = responseDataJson.data;
                    this.setState({ giftsdata: newGiftsData, giftsLoader: false },()=>{
                        this.props.setGiftData(this.state.giftsdata)
                    })

                },
                onFail: () => {
                    this.setState({ giftsLoader: false })
                }
            })
            break;
        }
    }

    // Customizable Area End
  }

  async componentDidMount() {
      this.getCategoryDetails();
      this.getCoinBalance()
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
          this.getCoinBalance()
      });

      this.deviceEmitter = DeviceEventEmitter.addListener('getCoinBalance',(event:any)=> {
        this.getCoinBalance()
      })
  }

  async componentWillUnmount() {
    this.deviceEmitter?.remove();
    this.unsubscribe();
  }

  getCoinBalance = async () => {
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    
    this.getcoinid = requestMessage.messageId;
    
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `/bx_block_cfappcoinsmanagement/your_balance`,
      method: configJSON.getMethod,
      header: header,
      body: undefined

    });
  }

  closeGiftAlertModal = () => {
    this.setState({ giftAlertPopup: { openAlertModal: false, alertMsg: "" } })
  }

  getCategoryDetails = () => {
    this.database.transaction((tx : any) => {
      tx.executeSql(
        'SELECT * FROM categories',
        [],
        (_ : any, { rows } : {rows : any}) => {
          const allCategories = rows.raw();
          if(allCategories && allCategories.length > 0 && allCategories[0].item){
            const parsedCategoryData = JSON.parse(allCategories[0].item);
            if(Array.isArray(parsedCategoryData) && parsedCategoryData.length > 0){
              this.props.setCategoryData(parsedCategoryData)
              this.setState({categorydata : parsedCategoryData, categoryid : parsedCategoryData[0].id},()=>{
                this.getGiftDetails();
              })
            }
          }
        },
        (_ : any, error : any) => console.error('Error fetching categories:', error)
      );
    });
  }

  getGiftDetails = () => {
    this.database.transaction((tx : any) => {
      tx.executeSql(
        'SELECT * FROM gifts',
        [],
        (_ : any, { rows } : {rows : any}) => {
          const allGiftsData = rows.raw();
          if(allGiftsData && allGiftsData.length > 0){
            const transformedArray = allGiftsData.reduce((acc : any, curr : {id: string, item:any}) => {
              const { id, item } = curr;
              acc[id] = JSON.parse(item);
              return acc;
            }, {});
              this.setState({giftsdata : transformedArray},()=>{
                this.props.setGiftData(this.state.giftsdata)
              })
          }
        },
        (_ : any, error : any) => console.error('Error fetching categories:', error)
      );
    });
  }


  getCategory = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.getcategoryApiCallId = requestMessage.messageId;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `/bx_block_categories/categories/`,
      method: configJSON.getMethod,
      header: header,
      body: undefined
    });
  }

  getCatloge = async (categoriId : string = "") => {
    const giftData = this.state.giftsdata[this.state.categoryid] ?? [];
    if(giftData && giftData.length > 0){
      return;
    }
    this.setState({ giftsLoader: true });
    const token = await getStorageData("authToken", false)

    const header = {
      token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    if(categoriId!=""){
      this.getAllGiftsDataApiId.push({apiId: requestMessage.messageId, catId : categoriId});
    }else{
      this.getcatlogApiCallId = requestMessage.messageId;
    }

    const categorie_id = categoriId!="" ? categoriId : this.state.categoryid;

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `catalogue/catalogues?category_id=${categorie_id}`,
      method: configJSON.getMethod,
      header: header,
      body: undefined
    });
  }

  handleAllGift = (responseDataJson:any,errorDataJson:any,apiRequestMessageID:any) => {
    const isGiftId = this.getAllGiftsDataApiId.filter((item: any) => item?.apiId == apiRequestMessageID);

   if(isGiftId && isGiftId?.length > 0){
     let keyId = isGiftId[0].catId;
     this.getAllGiftsDataApiId = this.getAllGiftsDataApiId.filter((item : any)=>(item.apiId!=apiRequestMessageID));
     handleResponseMessage({
       responseJson: responseDataJson,
       errorJson: errorDataJson,
       onSuccess: () => {
         const newGiftsData = {...this.state.giftsdata};
         newGiftsData[keyId] = responseDataJson.data;
         this.setState({giftsdata : newGiftsData},()=> {
            this.props.setGiftData(this.state.giftsdata)
         });
       },
       onFail: () => {}
     })
   }
  }

  checkCoins = () => {
    if(this.state.selectedGift?.attributes?.coins > this.state.coins){
      this.setState({giftAlertPopup:{openAlertModal: true, alertMsg: translate("insufficient_coin_bal"),}});
      return;
    }
    if(this.state.selectedGift?.id){
      this.props.getParticipant()
      this.props.setGiftModel();
      this.props.setParticipantModel();
    }
  }

  goToRecharge = () => {
    this.props.setGiftModel()
    this.props.navigation.navigate("Balance", { isFromLiveChallenge: true });
  };
}
