import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { Message } from "../../../../framework/src/Message";
import { runEngine } from "../../../../framework/src/RunEngine";

export function createRequestMessage(request: {
  requestMessage: Message;
  endPoint: string;
  header?: object;
  method: string;
  token?: string;
  body?: string | FormData;
  isFormDataRequest?: boolean;
}) {
  const {
    requestMessage: apiMessage,
    endPoint: apiEndPoint,
    header: initHeader,
    method: apiMethod,
    token: apiToken,
    body: bodyRequest,
    isFormDataRequest,
  } = request;

  const convertHeader = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...initHeader,
      };

  apiMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    apiEndPoint,
  );

  apiMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(convertHeader),
  );

  apiMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    apiMethod,
  );

  bodyRequest &&
    apiMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      bodyRequest,
    );

  runEngine.sendMessage(apiMessage.id, apiMessage);
  
}

export default createRequestMessage;
