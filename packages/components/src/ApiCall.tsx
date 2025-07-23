import { Message } from "../../framework/src/Message";
import MessageEnum, { getName } from "../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../framework/src/RunEngine";
import { getStorageData } from "../../framework/src/Utilities";

export const apiCall = async (data: any) => {
    const { header, endPoint, method, body } = data;
    let language = await getStorageData('SelectedLng');
    header.language = "en";
    console.log("header==>",header);

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );  

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