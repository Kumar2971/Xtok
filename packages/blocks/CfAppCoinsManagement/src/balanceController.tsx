import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import Toast from 'react-native-toast-message';
import { translate } from "../../../components/src/i18n/translate";
import { getStorageData } from "../../../framework/src/Utilities";
import { baseURL } from "../../bulkuploading/src/BulkUploadingController";
import { Platform } from "react-native";

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  route: any;
  // Customizable Area End
}
interface S {
    // Customizable Area Start
    selectedIndex: number;
    token: string;
    userID: string;
    coinBalance: any;
    ListPreMadePackages: any;
    productIdList : string [];
    ListTransactionsOfAnAccount: any;
    coins_count: any;
    coins_worth: any;
    withdrawCoinValue:any;
    isModalVisible: boolean
    isCustomCoinPurchase: boolean
    isCustomCoinWithdrawal: boolean
    isPackageCoinPurchase: boolean
    isValidWithDrawal: boolean,
    aboutThePassword: any,
    withdrawRules: any,
    DataSource: any,
    language:any;
    totalAmount: any;
    taxAmount: any;
    issuedDate:any;
    fullName:any;
    // Customizable Area End
}
interface SS {
    id: any;
  }

export default class BalanceController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    getCurrentProfileAPICallId: any;
    getCoinBalanceAPICallId: any;
    getPreMadePackagesAPICallId: any;
    getCoinsWorthAPICallId: any;
    getAllCoinTransactionsAPICallId: any;
    customCoinPurchaseAPICallId: any;
    customCoinWithdrawalAPICallId: any;
    packageCoinPurchaseAPICallId: any;
    coinsWithdrawalCriteriaAPICallId: any;
    getCoinTransactionApiCallId: string[] = [];
    // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage) ];
      // Customizable Area Start
      // Customizable Area End
  
    this.state = {
      selectedIndex: 0,
      token: '',
      userID: '',
      coinBalance: {},
      ListPreMadePackages:[],
      ListTransactionsOfAnAccount:[],
      coins_count: null,
      coins_worth: null,
      withdrawCoinValue:  null,
      isModalVisible: false,
      isCustomCoinPurchase: false,
      isCustomCoinWithdrawal: false,
      isPackageCoinPurchase: false,
      isValidWithDrawal: false,
      aboutThePassword: [
       translate("only_the_correct"),
       translate("If_you_forgot_your_password"),
       translate("If_you_encounter")],
      withdrawRules: [
       translate("GoLavi_coins"),
       translate("Minimum_cashable_5000"),
       translate("You_can_only_withdraw_money_once_a_week"),
       translate("For_a_single_withdrawal_exceeding_$500"), 
        translate("Withdrawals_made_before_the_25th"),
       translate("You_need_to_complete_the_contract_signing_before_withdrawal"),
       translate("You_need_to_pass_real_person_detection_for_each_withdrawal"),
    ],
    DataSource: [],
    language:"",
    totalAmount:'',
    taxAmount:'',
    issuedDate:'',
    fullName:'',
    productIdList : []
    }
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    const language = await getStorageData("SelectedLng");
    this.setState({language:language});
    this.props.navigation.addListener("focus", () => {
      this.setState({
        selectedIndex:this.props.route?.params?.selectedIndex,
      })
    })
  }

  onCompleteInAppPurchase = async(body : any) => {
    const token = (await getStorageData("authToken", false)) || "";
    const apiEndPoint = `${baseURL}/bx_block_cfappcoinsmanagement/coin_transactions`;
    const header = {
      "Content-Type": "application/json",
      token,
    };

    this.apiCall({
      setApiCallId: "getCoinTransactionApiCallId",
      header,
      method: "POST",
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body),
    });
  }

  getBuyButtonTitle = () => {
    if(this.state.coins_worth && this.state.coins_count && this.state.coins_count.length > 0){
      return '$' + this.state.coins_worth;
    }else{
      return translate("buy")
    }
  }

  showToast = (text:string, type:string) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }

  apiCall = (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    if (setApiCallId === 'getCurrentUserProfileDetails') {
      this.getCurrentProfileAPICallId = requestMessage.messageId;
    } else if (setApiCallId === 'getCoinBalance') {
      this.getCoinBalanceAPICallId = requestMessage.messageId;
    } else if (setApiCallId === 'getPreMadePackages') {
      this.getPreMadePackagesAPICallId = requestMessage.messageId;
    } else if (setApiCallId === 'getCoinsWorth') {
      this.getCoinsWorthAPICallId = requestMessage.messageId;
    } else if (setApiCallId === 'getAllCoinTransactions') {
      this.getAllCoinTransactionsAPICallId = requestMessage.messageId;
    } else if (setApiCallId === 'customCoinWithdrawal') {
      this.customCoinWithdrawalAPICallId = requestMessage.messageId;
    } else if (setApiCallId === 'getCoinsWithdrawalCriteria') {
      this.coinsWithdrawalCriteriaAPICallId = requestMessage.messageId;
    } else if(setApiCallId === 'getCoinTransactionApiCallId') {
      this.getCoinTransactionApiCallId.push(requestMessage.messageId);
    }

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
    );
 
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      body
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    
    return true;
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Received", message);

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {

      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      const errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.debugLog("API Message Received.", message);

      if (responseJson?.errors) {
      console.log('Error in Balance Controller')
      if(responseJson.errors.toString() === "Account Balance is insufficient" || responseJson.errors.toString() === "Coin Balance is insufficient") {
        this.showToast(responseJson.errors?.toString(),'error')
      }
      this.setState({isCustomCoinPurchase: false, isCustomCoinWithdrawal: false, isPackageCoinPurchase: false});
      } else if (responseJson) {
        if(this.getCoinTransactionApiCallId.includes(apiRequestCallId)){
          this.getCoinTransactionApiCallId = this.getCoinTransactionApiCallId.filter(apiId=> apiId !== apiRequestCallId);
          this.getCoinBalance();
          return
        }
        switch(apiRequestCallId){
          case this.getCurrentProfileAPICallId : {
            this.getCurrentUserProfileDetailsApiSuccess(responseJson);
            break
          }
          case this.getCoinBalanceAPICallId : {
            this.getCoinBalanceApiSuccess(responseJson);
            break
          }
          case this.getPreMadePackagesAPICallId : {
            this.getPreMadePackagesApiSuccess(responseJson);
            break
          }
          case this.getCoinsWorthAPICallId : {
            this.getCoinWorthApiSuccess(responseJson);
            break
          }
          case this.getAllCoinTransactionsAPICallId : {
            this.getAllCoinTransactionsAPiSuccess(responseJson);
            break
          }
          case this.coinsWithdrawalCriteriaAPICallId : {
            this.coinsWithdrawalCriteriaApiSuccess(responseJson);
            break
          }
          case this.customCoinPurchaseAPICallId : {
            this.customCoinPurchaseApiSuccess(responseJson);
            break
          }
          case this.customCoinWithdrawalAPICallId : {
            this.customCoinWithdrawalApiSuccess(responseJson);
            break
          }
          case this.packageCoinPurchaseAPICallId : {
            this.packageCoinPurchaseApiSuccess(responseJson);
            break
          }
        }
      } else if (errorResponse) {
        this.setState({isCustomCoinPurchase: false, isCustomCoinWithdrawal: false, isPackageCoinPurchase: false});
        console.log('Error in Balance Controller', errorResponse)
      }
    }

    // Customizable Area Start
    // Customizable Area End
  }
  // api success functions
  getCurrentUserProfileDetailsApiSuccess = (responseJson:any) => {
    if(responseJson.data != null){
      this.setState({ 
        userID: responseJson.data?.id || '',
      });
    }
  }
 
  getCoinBalanceApiSuccess = (responseJson:any) => {
    if(responseJson != null){
      this.setState({coinBalance:responseJson})
      console.log('ResponseJson - getCoinBalance',responseJson);
    }
  }

  getPreMadePackagesApiSuccess = (responseJson:any) => {
    if(responseJson != null){
      this.setState({ListPreMadePackages:responseJson})
      console.log('++++++++ResponseJson - getPreMadePackages++++',responseJson);
    }
  }
 
  getCoinWorthApiSuccess = (responseJson:any) => {
    if(responseJson != null){
      this.setState({coins_worth: responseJson?.coins_worth})
      console.log('ResponseJson - getCoinsWorth',responseJson);
    }
  }

  getAllCoinTransactionsAPiSuccess = (responseJson:any) => {
    if(responseJson != null){
      this.setState({ListTransactionsOfAnAccount: responseJson})   
    }
  }

  coinsWithdrawalCriteriaApiSuccess = (responseJson:any) => {
    if(responseJson != null){
      if(responseJson.error === 'Insufficient coin balance') {
       
        this.setState({isValidWithDrawal: false});
        this.showToast('Insufficient coin balance','error')
      } else if (responseJson.message === "This transaction is valid") {
        
        this.setState({isValidWithDrawal: true});
        // this.showToast('This transaction is valid','success')
      }
    }
  }

  customCoinPurchaseApiSuccess = (responseJson:any) => {
    if(responseJson != null){
           
      if(responseJson.status === 'success'){
        this.getCoinBalance();
        this.props.navigation.navigate("paymentsuccess",{result:"success"})
        this.setState({isCustomCoinPurchase: false});
      }
    }
  }

  customCoinWithdrawalApiSuccess = (responseJson:any) => {
    if(responseJson != null){
          
      if(responseJson.status === 'success'){
        this.getCoinBalance();
        this.setState({isModalVisible: !this.state.isModalVisible, coins_worth: null, withdrawCoinValue: null})
        this.setState({isCustomCoinWithdrawal: false});
      }
    }
  }

  packageCoinPurchaseApiSuccess = (responseJson:any) => {
    if(responseJson != null){
            
      if(responseJson.status === 'success'){
        this.getCoinBalance();
        // this.props.navigation.navigate("paymentsuccess",{result:"success"})
        this.setState({isPackageCoinPurchase: false});
      }
    }
  }

  // GET API's
  getCurrentUserProfileDetails = async () => {
    const token = this.state.token

    const header = {
      "Content-Type": "application/json",
      "token": token
    };
    this.apiCall({
      setApiCallId: 'getCurrentUserProfileDetails',
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `/account_block/show_profile`,
      body: null
    });
  }

  getCoinBalance = async () => {
    const token = this.state.token

    const header = {
      "Content-Type": "application/json",
      "token": token
    };
    this.apiCall({
      setApiCallId: 'getCoinBalance',
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_cfappcoinsmanagement/your_balance`,
      body: null
    });
  }

  getBillingDetails = async (coinsWorth:any) => {
    const authToken = (await getStorageData('authToken', false)) || '';
    const res = await fetch(`${baseURL}/bx_block_cfappcoinsmanagement/get_billing_details?amount=${coinsWorth}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: await authToken
      },
    });
    const response = await res.json();
    const {total_amount, tax_amount, date, account_data} = response
      this.setState({
        totalAmount:total_amount, 
        taxAmount: tax_amount,
        issuedDate: date,
        fullName: account_data.full_name
  })
  }

  getFormattedCoinValue = () => {
    let formattedCoin = "0";
    if(this.state.coinBalance?.coins_count){
      if(this.state.coinBalance.coins_count.toString().indexOf('.') == -1){
        formattedCoin = this.state.coinBalance.coins_count
      }else{
        formattedCoin = Number(this.state.coinBalance.coins_count).toFixed(2)
      }
    }
    return formattedCoin;
  }

  getPreMadePackages = async () => {
    const token = this.state.token

    const header = {
      "Content-Type": "application/json",
      "token": token
    };

   this.apiCall({
      setApiCallId: 'getPreMadePackages',
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_cfappcoinsmanagement/premade_packages?transaction_type=purchase&platform=${Platform.OS}`,
      body: null
    });    
  }

  getCoinsWorth = async (coins_count: any, type: string) => {
    const token = this.state.token

    const header = {
      "Content-Type": "application/json",
      "token": token
    };

    this.apiCall({
      setApiCallId: 'getCoinsWorth',
      header: header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_cfappcoinsmanagement/custom_coins/coins_worth?coins_count=${parseInt(coins_count)}&transaction_type=${type}`,
      body: null
    });
  }

  getCoinsWithdrawalCriteria = async (coins_count: any) => {
    const token = this.state.token

    const header = {
      "Content-Type": "application/json",
      "token": token
    };

    this.apiCall({
      setApiCallId: 'getCoinsWithdrawalCriteria',
      header: header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_cfappcoinsmanagement/check_withdrawl_criteria?coins_count=${parseInt(coins_count)}`,
      body: null
    });
  }

  getAllCoinTransactions = async () => {
    const token = this.state.token

    const header = {
      "Content-Type": "application/json",
      "token": token
    };
    this.apiCall({
      setApiCallId: 'getAllCoinTransactions',
      header,
      method: configJSON.validationApiMethodType,
      endPoint: `/bx_block_cfappcoinsmanagement/coin_transactions`,
      body: null
    });
  }
  // POST API's
  customCoinWithdrawal = async (coins_count:any, amount:any) => {
    console.log('coins_count',coins_count)
    console.log('amount',amount)

    const token = this.state.token

    const header = {
      "Content-Type": "application/json",
      "token": token
    };

    // If Stripe return success then status would be "success" otherwise "failed". There would be possibilites
    let body = {
      "coins_count":coins_count,
      "amount":amount,
      "transaction_type": "withdrawal",
      "status": "success",
      "payment_id": "payment1",
      // "reasons" : ["",""] if failed
    };

    this.apiCall({
      setApiCallId: 'customCoinWithdrawal',
      header,
      method: configJSON.exampleAPiMethod,
      endPoint: `/bx_block_cfappcoinsmanagement/coin_transactions`,
      body: JSON.stringify(body)
    });
  }

}
  