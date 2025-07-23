import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker from "react-native-image-crop-picker";
import { Alert } from "react-native";
import { isEmpty } from "../../../components/src/Utilities";
import { getStorageData } from "../../../framework/src/Utilities";
import { AnyLengthString } from "aws-sdk/clients/comprehendmedical";
import { translate } from "../../../components/src/i18n/translate";

const maxImageSizeInBytes = 5242880;
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token:any;
  description:any;
  imgType: any;
  profileFile: any;
  ImageSourceviewarray:any;
  apiCallLoader:boolean;
  errors:any;
  imagErrorMsg:any;
  openReportModal:boolean;
  modalMessage:any;
  disable:boolean;
  language:any;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class ReportProblemController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  sendReportProblemApiCallId: any;
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.sendReportProblemApiCallId = "";

    this.state = {
        token:"",
        description:"",
        imgType: "",
        profileFile: "",
        ImageSourceviewarray:[],
        apiCallLoader:false,
        errors:'',
        imagErrorMsg:"",
        openReportModal:false,
        modalMessage:"",
        disable:false,
        language:""
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    const language = await getStorageData("SelectedLng");
    this.setState({language:language})
    // Customizable Area End
  }
  async receive(from: string, message: Message) {
    // Customizable Area Start
     if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      runEngine.debugLog("API Message Recived", message);

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.sendReportProblemApiCallId) {
          console.log(" sendReportProblemApiCallId response==>", responseJson);
          this.setState({ apiCallLoader: false,})
          if (responseJson && (responseJson.errors || responseJson.error)) {
            //Check Error Response
            this.handleErrorResponse(responseJson);
          } else if (responseJson?.data?.attributes) {
            this.setState({modalMessage: responseJson.data.attributes.message,disable:true})
            this.setReportModal(true)
          }
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  onCaptionTextChange = (text:any) => {
    this.setState({description: text , errors:""})
  }
  setReportModal = (visible: any) => {
		this.setState({ openReportModal: visible });
	};
  goToNext = () => {
    this.setReportModal(false);
    this.props.navigation.navigate("PrivacySettings")
  }

  imageList = (response:any) => {
    const temp_array:any = [];
    response.map((image:any, index:AnyLengthString) => {
    const splitArray = image?.path.split("/");
    const fileName = image?.filename || splitArray?.length ? splitArray[splitArray.length - 1] : ".jpg";

    let imageOBJ =   {
        id: index,
        filename: fileName,
        path: image.path,
        type: image.mime,
        data: image.data,
      }
      temp_array.push(imageOBJ);
    });
    this.setState({ImageSourceviewarray : [...this.state.ImageSourceviewarray , ...temp_array]});
  }

  goImagePicker() {
    ImagePicker.openPicker({
        multiple: true,
        waitAnimationEnd: false,
        includeExif: false,
        forceJpg: true,
        compressImageQuality: 0.3,
        maxFiles: 10,
        mediaType: 'photo',
        includeBase64: true,
      }).then(response => {
           this.imageList(response)
        }).catch((e) => {
          console.log('ERROR ' + e.message);

        });
  }
  _validateForm = () => {
    const {description,ImageSourceviewarray} = this.state;

    let formIsValid = true;

    if (isEmpty(description)) {
      this.setState({errors: translate("sendReportValidation")});
      formIsValid = false;
    }else if (ImageSourceviewarray.length > 10){
      this.setState({imagErrorMsg: configJSON.imgerrorMSg});
      formIsValid = false;
    }
    return formIsValid
  };
  sendReport = async () => {
    const token = await getStorageData("authToken", false) || "";
    const {description} = this.state;
    if (this._validateForm()) {

      this.setState({ apiCallLoader: true,disable: true  });
      const apiEndPoint = `/bx_block_contact_us/report_problems`;

      const header = {
        "Content-Type": configJSON.formContentType,
        token
      };

      let formdata: any = new FormData();
      formdata.append("report[description]", description);
      this.state.ImageSourceviewarray.map((image: any) => {
        if (image) {
              let name = image?.path.split('/')
              let imgFile: any = {
                uri: image.path,
                type: image.mime ?? image.type,
                name: name[name.length - 1],
                // ...profileFile
              };
              formdata.append("report[images][]", imgFile);
            }
      })

      console.log("console -> formdata", formdata);

      this.apiCall({
        setApiCallId: 'sendReportProblemApiCallId',
        header,
        method: configJSON.postMethod,
        endPoint: `${apiEndPoint}`,
        body: formdata
      });
    }
  }
  apiCall = async (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if (setApiCallId === "sendReportProblemApiCallId") {
      this.sendReportProblemApiCallId = requestMessage.messageId;
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  handleErrorResponse = async (responseJson: any, parseError: boolean = true) => {
    if (responseJson?.errors.hasOwnProperty('token') && responseJson.errors.token) {
      return;
    }
    //Check Error Response
    parseError && console.log("parseError==>",parseError);
  }
  // Customizable Area End
}
