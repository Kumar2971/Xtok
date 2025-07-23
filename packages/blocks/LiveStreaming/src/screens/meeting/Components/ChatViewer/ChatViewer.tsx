import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  Linking,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import TextInputContainer from "./TextInput";
import {getStorageData} from "../../../../../../../framework/src/Utilities";
import {
  useMeeting,
  usePubSub,
  // @ts-ignore
} from "@videosdk.live/react-native-sdk";
import moment from "moment";
import { ROBOTO_FONTS } from "../../../../styles/fonts";
import { ChatViewItem } from "../../../../Types";
import Scale from "../../../../../../../components/src/Scale";
import Lottie from 'lottie-react-native';


interface ChatViewerProps{
  onPressAddMore:()=>void;
  onPressAddMoreGift:()=>void;
  selectedCatalogueID:any;
  sendCoin:()=>void;
  participantMode?: string;
  giftModal:boolean;
  selectedCatalogue:any;
  isCoinSent: boolean;
  setIsCoinSent: (val: boolean) => void;
  setSelectedCatalogueID: (val: any) => void;
  setSelectedCatalogueURL:(val:any)=>void;
  participantLength:any;
  chatTopic: unknown;
  setSelectedCatalogue:(val:any)=>void;
  setLottieAnimation: (show: boolean, url: string, audioUrl: string,json:string,positionTop:number,positionLeft:number) => void,
}
const ChatViewer = ({
  onPressAddMore,
  participantMode,
  onPressAddMoreGift,
  giftModal,
  selectedCatalogue,
  sendCoin,
  isCoinSent,
  setIsCoinSent,
  selectedCatalogueID,
  setSelectedCatalogueID,
  participantLength,
  setSelectedCatalogueURL,
  chatTopic,
  setSelectedCatalogue,
  setLottieAnimation
}:ChatViewerProps) => {
  const mPubSubRef = useRef();
  const mPubSub = usePubSub(chatTopic ?? "CHAT", {
    onMessageReceived: (message: any)=>{
      console.log('received message',message)
      setComments((prevComments: any) => {
        if (message.message && message.message.imageUrl && message.message.type === "application") {
          setLottieAnimation(
            true, 
            message.message.imageUrl, 
            message.message.audioUrl,
            message.message.json,
            Number(message.message?.Message?.positionTop) ?? 0,
            Number(message.message?.Message?.positionLeft) ?? 0
          )
          return prevComments;
        } else {
          return [message, ...prevComments];
        }
      });
    }
  });
 // const [imageUrl, setImageUrl] = useState(selectedCatalogue);
 // console.log("selected image in chat==>",imageUrl)

  useEffect(() => {
    mPubSubRef.current = mPubSub;
    //  setImageUrl(selectedCatalogue)
    setTimeout(() => {
      scrollToBottom();
    }, 100);


  }, [mPubSub]);

  // useEffect(()=>{
  //   console.log('calledddddddd')
  // setImageUrl(selectedCatalogue)
  // },[selectedCatalogue])

  const mMeeting = useMeeting({});
  const localParticipantId = mMeeting?.localParticipant?.id;
  // console.log("local Participant id==>",localParticipantId)
  const [chatMessage, setChatMessage] = useState("");
  const [language,setLanguage] = useState<string>("")
  const [comments, setComments] = useState<Array<any>>([]);

  const flatListRef: React.LegacyRef<FlatList<ChatViewItem>> =
    React.useRef(null);
  const [isSending] = useState(false);

  const fetchLangHelper = async () =>{
    const language = await getStorageData("SelectedLng");
    setLanguage(language)
  }

  useEffect(()  =>{
    fetchLangHelper()
  },[])

  useEffect(() => {
    if (isCoinSent) {
      sendMessage();
      setIsCoinSent(false);
      setSelectedCatalogueID("")
     }
     else {
      setChatMessage("");
     // setImageUrl("");
     }


  }, [isCoinSent]);

  const sendMessage = () => {
    const trimmerChatMessage = chatMessage?.trim();
    const attributes = selectedCatalogue?.attributes;
    if (trimmerChatMessage.length <= 0 && selectedCatalogueID === '') {
      return;
    }
    console.log('selectedCatalogue?.attributes?.imageasdasd', selectedCatalogue)
    const json = {
      imageUrl: attributes?.image.url,
      type: attributes?.image.type,
      audioUrl: attributes?.audio?.url,
      json: attributes?.image.json,
      Message: {
        text: trimmerChatMessage,
        imageUrl: attributes?.image.url,
        type: attributes?.image.type,
        audioUrl: attributes?.audio?.url,
        json: attributes?.image.json,
        positionTop: attributes?.Position_top,
        positionLeft: attributes?.Position_left,
      }
    };
    mPubSub.publish(json)
    setSelectedCatalogueID("")
    setSelectedCatalogue({})
    setSelectedCatalogueURL("")
    setIsCoinSent(false);
    setChatMessage("");
    scrollToBottom();


};


  const scrollToBottom = () => {
    flatListRef.current && flatListRef.current.scrollToEnd({ animated: true });
  };

  return (
    // <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={styles.mainView} onStartShouldSetResponder={() => true}>
        <View style={styles.keyboardAvoiding}>
          {mPubSub.messages ? (
            <View style={{ height: Scale(300), marginBottom: 20 }}>
              <FlatList
                testID="flatlist-test"
                ref={flatListRef}
                data={mPubSub.messages}
                showsVerticalScrollIndicator={false}
                renderItem={({
                  item,
                  index,
                }: {
                  item: ChatViewItem;
                  index: number;
                }) => {
                  // console.log("itemmm==>",item)
                  const { message, senderId, senderName } = item;
                  const localSender = localParticipantId === senderId;
                  const returnText = () => {
                    if (!shouldRender) {
                      return ""
                    } else if (localSender) {
                      return "You"
                    } else {
                      return senderName
                    }
                  }
                  const shouldRender = Boolean(message?.Message?.type !== 'application' || !message?.Message?.type)
                  if(!shouldRender){
                    return null
                  }
                  return (
                    <View
                      key={index}
                      style={[
                        styles.viewText,
                        language == 'ar' && { alignItems: "flex-start" },
                        { alignSelf: "flex-start" },
                      ]}>
                      <Text style={[styles.text1, language == 'ar' && { textAlign: 'right' }]}>
                        {returnText()}
                      </Text>
                      {message?.Message?.text !== "" && <TouchableOpacity
                        testID="openLinkButton"
                        onPress={async (link: GestureResponderEvent) => {
                          await Linking.openURL(String(link));
                        }}>
                        <Text style={[styles.text1, language == 'ar' && { textAlign: 'right' }]}>{message?.Message?.text}</Text>
                      </TouchableOpacity>}
                      {message?.imageUrl && <TouchableOpacity style={styles.commentImgStyle}>
                        <Image source={{ uri: message?.imageUrl }} style={styles.imgStyle} />
                      </TouchableOpacity>}
                    </View>
                  );
                }}
                keyExtractor={(item, index) => `${index}_message_list`}
                style={{
                  //marginVertical:5,
                  marginBottom: Scale(80),
                }}
              />
            </View>
          ) : null}
        <KeyboardAvoidingView
          enabled
          behavior={Platform.OS === "android" ? undefined : "position"}
          style={styles.paddingTextinput}
        >
            <TextInputContainer
              testID="sendMessage"
              message={chatMessage}
              onPressAddMore={onPressAddMore}
              onPressAddMoreGift={onPressAddMoreGift}
              selectedCatalogueID={selectedCatalogueID}
              setMessage={(text: any) => {
                setChatMessage(text)
              }}
              isSending={isSending}
              sendMessage={selectedCatalogueID ? sendCoin : sendMessage}
              participantMode={participantMode}
              language={language}
              giftModal={giftModal}
              selectedCatalogue={selectedCatalogue}
              sendCoin={sendCoin}
              participantLength={participantLength}
            />
          </KeyboardAvoidingView>
      </View>
    </View>
  //  </TouchableWithoutFeedback>
  );
};
export default ChatViewer;

const styles = StyleSheet.create({
  viewText: {
    //backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 12,
  },
  text: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: ROBOTO_FONTS.RobotoBold,
  },
  text1: {
    fontSize: 14,
    color: "white",
    fontFamily: ROBOTO_FONTS.RobotoMedium,
  },
  text2: {
    fontSize: 12,
    fontFamily: ROBOTO_FONTS.Roboto,
    color: "#9A9FA5",
    fontWeight: "bold",
  },
  keyboardAvoiding: {
    flex: 1,
    justifyContent: "flex-end",
  },
  btnText: {
    color: "grey",
    fontSize: 10,
    fontFamily: ROBOTO_FONTS.Roboto,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  chatText: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  paddingTextinput: {
    paddingHorizontal: 12,
  },
  mainView: {
    flex: 1,
    // position:"absolute",
    // bottom: Platform.OS == "ios" ? -10 : 0,
  },
  commentImgStyle:{
    height:50,
    width:50,
    marginTop:5
  },
  imgStyle:{
    height:"100%",
    width:"100%",
    // resizeMode:"contain"
  }
});
