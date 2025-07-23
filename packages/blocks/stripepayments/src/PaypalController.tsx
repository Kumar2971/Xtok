// Customizable Area Start
import React from "react";
import { BlockComponent } from "../../../framework/src/BlockComponent";

import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";
import { baseURL } from "../../bulkuploading/src/BulkUploadingController";
import { Platform } from "react-native";
// Customizable Area End	

// Customizable Area Start
export interface Props {
  navigation: any;
  route: any;
  id: string;
}
interface S {
  isPaypalWebOn: boolean;
  isWebUrl: any;
  isOrderId: string;
  totalAmount: number;
  taxAmount: number;
  isAccessToken: string;
  callGetAccessToken: boolean;
}
interface SS {
  id: any;
}
export default class PaypalController extends BlockComponent<Props, S, SS> {
  getBillingDetailsApiCallId: any;
  confirmPaymentApiCallId: any;
  onPaypalApiCallId: any;
  getAccessTokenApiCallId: any;
  getCoinTransactionApiCallId: any;

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
      isPaypalWebOn: false,
      isWebUrl: "",
      isOrderId: "",
      totalAmount: 0,
      taxAmount: 0,
      isAccessToken: "",
      callGetAccessToken: true,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  handleApiRequest = async (
    apiRequestCallId: any,
    responseJson: any,
    errorReponse: any
  ) => {
    switch (apiRequestCallId) {
      case this.getAccessTokenApiCallId: {
        this.getAccessTokenApiSuccess(responseJson);
        break;
      }

      case this.getBillingDetailsApiCallId: {
        this.getBillingDetailsApiSuccess(responseJson);
        break;
      }

      case this.confirmPaymentApiCallId: {
        this.confirmPaymentApiSuccess(responseJson);
        break;
      }

      case this.onPaypalApiCallId: {
        this.onPaypalApiSuccess(responseJson);
        this.setState({ isPaypalWebOn: true });
        break;
      }

      case this.getCoinTransactionApiCallId: {
        this.getCoinTransactionSuccess(responseJson);
        break;
      }
    }
  };

  apiCall = async (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    switch (setApiCallId) {
      case "getBillingDetailsApiCallId": {
        this.getBillingDetailsApiCallId = requestMessage.messageId;
        break;
      }
      case "confirmPaymentApiCallId": {
        this.confirmPaymentApiCallId = requestMessage.messageId;
        break;
      }
      case "onPaypalApiCallId": {
        this.onPaypalApiCallId = requestMessage.messageId;
        break;
      }
      case "getAccessTokenApiCallId": {
        this.getAccessTokenApiCallId = requestMessage.messageId;
        break;
      }
      case "getCoinTransactionApiCallId": {
        this.getCoinTransactionApiCallId = requestMessage.messageId;
        break;
      }
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      header
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

  handleErrorResponse = async (
    responseJson: any,
    parseError: boolean = true
  ) => {
    if (
      responseJson.errors &&
      responseJson.errors.hasOwnProperty("token") &&
      responseJson.errors.token
    ) {
      return;
    }
  };

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      runEngine.debugLog("API Message Recived", message);

      this.handleApiRequest(apiRequestCallId, responseJson, errorReponse);
    }
  }

  getAccessTokenApiSuccess = async (responseJson: any) => {
    if (responseJson && (responseJson.errors || responseJson.error)) {
      this.handleErrorResponse(responseJson);
    }
    if (responseJson?.access_token) {
      this.setState({ isAccessToken: responseJson?.access_token });
      await this.onPayPal();
    }
  };

  getBillingDetailsApiSuccess = async (responseJson: any) => {
    console.log("*********************_____________", responseJson?.total_amount, responseJson?.tax_amount, responseJson?.total_amount && responseJson?.tax_amount)
    if (responseJson && (responseJson.errors || responseJson.error)) {
      this.handleErrorResponse(responseJson);
    } else if (responseJson?.total_amount && responseJson?.tax_amount) {
      this.setState({
        totalAmount: responseJson?.total_amount,
        taxAmount: responseJson?.tax_amount,
      });
      // Need to call GetAccess token after receiving total amount and it should call only on initial time. 
      // Added callGetAccessToken state to avoid getAccesToken api call while finishing payment.
      if (this.state.callGetAccessToken) {
        this.setState({ callGetAccessToken: false });
        const authT: any = (await getStorageData("authToken", false)) || "";
        this.getAccesToken(authT);
      }
      return (responseJson?.total_amount, responseJson?.tax_amount);
    }
  };

  confirmPaymentApiSuccess = async (responseJson: any) => {
    if (responseJson && (responseJson.errors || responseJson.error)) {
      this.handleErrorResponse(responseJson);
    } else {
      await this.onUpdateCoinPurchaseAfterSuccess("success");
    }
  };

  onPaypalApiSuccess = (responseJson: any) => {
    console.log("onPaypalApiSuccess===", responseJson);

    if (responseJson && (responseJson.errors || responseJson.error)) {
      this.handleErrorResponse(responseJson);
    } else if (responseJson?.links && responseJson?.links.length > 0) {
      this.setState({ isOrderId: responseJson.id });
      let link = responseJson?.links.filter((i: any) => i.rel == "approve");
      if (link) {
        this.setState({ isWebUrl: link[0].href });
      }
    }
  };

  getCoinTransactionSuccess = (responseJson: any) => {
    if (responseJson && (responseJson.errors || responseJson.error)) {
      this.handleErrorResponse(responseJson);
    } else {
      this.props.navigation?.pop();
      this.props.navigation.navigate("paymentsuccess", { result: "success" });
    }
  }

  async componentDidMount() {
    super.componentDidMount();
    await this.getBillingDetails();

  }

  getBillingDetails = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    const apiEndPoint = `${baseURL}/bx_block_cfappcoinsmanagement/get_billing_details?amount=${this.props.route.params.amount}`;

    const header = {
      "Content-Type": "application/json",
      token,
    };

    this.apiCall({
      setApiCallId: "getBillingDetailsApiCallId",
      header,
      method: "GET",
      endPoint: `${apiEndPoint}`,
      body: null,
    });
  };

  onPayPal = async () => {
    const token: any = (await getStorageData("authToken", false)) || "";
    // await this.getAccesToken(token);
    //Commented this getAccess token api call to avoid API calls in loop. So It will prevent from screen rerender again and again.
    const totalAmount = Number(this.state.totalAmount)?.toFixed(2);
    // Need to pass total amount with two decimal digits
    const apiEndPoint = `${baseURL}/create_paypal_order`;
    const header = {
      "Content-Type": "application/json",
      token,
    };
    const body = {
      amount: totalAmount,
      auth_token: this.state.isAccessToken,
      return_url: "https://success",
      cancel_url: "https://fail",
    };
    this.apiCall({
      setApiCallId: "onPaypalApiCallId",
      header,
      method: "POST",
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body),
    });
  };

  getAccesToken = async (authT: any) => {
    const token = (await getStorageData("authToken", false)) || "";
    const apiEndPoint = `${baseURL}/create_access_token`;

    const header = {
      "Content-Type": "application/json",
      token,
    };

    this.apiCall({
      setApiCallId: "getAccessTokenApiCallId",
      header,
      method: "GET",
      endPoint: `${apiEndPoint}`,
      body: null,
    });
    return true;
  };

  onNavigationStateChange = async (webReponse: any) => {
    console.log("webReponse", webReponse);
    if (webReponse?.url && webReponse.url.includes("https://success")) {
      this.setState({ isPaypalWebOn: false, isWebUrl: null });
      await this.onConfirmPayment();
    } else if (webReponse?.url && webReponse.url.includes("https://fail")) {
      this.props.navigation?.pop();
      this.props.navigation.navigate("paymentsuccess", { result: "" });
    }
  };

  onConfirmPayment = async () => {
    const token = (await getStorageData("authToken", false)) || "";
    const apiEndPoint = `${baseURL}/capture_paypal_order`;
    const header = {
      "Content-Type": "application/json",
      token,
    };
    const body = {
      auth_token: this.state.isAccessToken,
      order_id: this.state.isOrderId,
    };
    this.apiCall({
      setApiCallId: "confirmPaymentApiCallId",
      header,
      method: "POST",
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body),
    });
  };

  onUpdateCoinPurchaseAfterSuccess = async (status: any) => {
    await this.getBillingDetails();
    const token = (await getStorageData("authToken", false)) || "";
    const apiEndPoint = `${baseURL}/bx_block_cfappcoinsmanagement/coin_transactions`;
    const header = {
      "Content-Type": "application/json",
      token,
    };
    const body = {
      transaction_type: "purchase",
      amount: this.state.totalAmount,
      coins_count: this.props.route.params.count,
      status: "success",
      payment_id: this.state.isOrderId,
      tax_amount: this.state.taxAmount,
      package_id: this.props.route.params.packageId
        ? this.props.route.params.packageId
        : null,
      platform: Platform.OS,
    };
    this.apiCall({
      setApiCallId: "getCoinTransactionApiCallId",
      header,
      method: "POST",
      endPoint: `${apiEndPoint}`,
      body: JSON.stringify(body),
    });
  };
}
// Customizable Area End