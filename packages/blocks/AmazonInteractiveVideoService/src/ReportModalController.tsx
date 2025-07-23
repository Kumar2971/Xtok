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
import { translate } from "../../../components/src/i18n/translate";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  // Customizable Area Start
  isVisible: boolean;
  language: string;
  onClose: () => void;
  selectedGridId: number | null;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  selectedReportReason: any;
  report_desc: any;
  inProcess: boolean;
  reportAlertPopupReason: { openAlertModal: boolean, alertMsg: string };
  reportAlertPopupDescription: { openAlertModal: boolean, alertMsg: string };
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}
export default class ReportModalController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  reportPostId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      selectedReportReason: null,
      report_desc: null,
      inProcess: false,
      reportAlertPopupReason: { openAlertModal: false, alertMsg: "" },
      reportAlertPopupDescription: { openAlertModal: false, alertMsg: "" },
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

      if(apiRequestMessageID === this.reportPostId){
        handleResponseMessage({
          responseJson: responseDataJson,
          errorJson: errorDataJson,
         
          onSuccess: () => {
            this.setState({
              reportAlertPopupReason:{openAlertModal: true, alertMsg: translate("thanks")},
              selectedReportReason:'',
              report_desc:''
            })
          },
          onFail: () => {
  
          }
        })
      }

    // Customizable Area End
  }

  selectReportReason = (value: any) => {
    this.setState({ selectedReportReason: value, report_desc: null })
  }

  closeReportalertPopupReason = () => {
    this.setState({ reportAlertPopupReason: { openAlertModal: false, alertMsg: "" } },() => {
      this.props.onClose()
    })
  }

  closeReportalertPopupDescription = () => {
    this.setState({ reportAlertPopupDescription: { openAlertModal: false, alertMsg: "" } })
  }

  onpressReport = () => {
    this.setState({ inProcess: true });
    if (this.state.selectedReportReason == -1 || !this.state.selectedReportReason) {
      this.setState({
        inProcess: false,
        reportAlertPopupReason: { openAlertModal: true, alertMsg: translate("please_select_a_reason"), }
      })
      return
    }
    else if (this.state.selectedReportReason == "Other" && (this.state.report_desc == null || this.state.report_desc == '')) {
      this.setState({ inProcess: false, reportAlertPopupDescription: { openAlertModal: true, alertMsg: translate("give_detailed_description"), } })
      return
    }
    this.reportPost()
  }

  reportPost = async () => {

    const token = await getStorageData("authToken", false)

    const header = {
      token
    };
    const body = {
      "report":
      {
        "account_id": this.props.selectedGridId,
        "reason": this.state.selectedReportReason,
        "description": this.state.report_desc
      }
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    this.reportPostId = requestMessage.messageId;
    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: `account_block/reported_users`,
      method: configJSON.postMethod,
      header: header,
      body: JSON.stringify(body)

    });
    this.setState({ inProcess: false });
  }

  enterdescription = (text: string) => {
    this.setState({ report_desc: text })
  }
}

