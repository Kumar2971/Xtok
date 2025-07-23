import React, { useEffect, useState } from 'react';
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fonts } from './styles/fonts';
import { messanger, person } from './assets';
import { ChatMessage, ChatRoom, SendMessageRequest } from 'amazon-ivs-chat-messaging';
import { CurrentUser } from './AmazonInteractiveVideoServiceController';
import { screenWidth } from './helpers/DynamicDimension';

interface ChatData {
  senderName: string;
  senderId: string;
  message: { Message: { text: string, type: string }, imageUrl: string | null }
}

interface ChatToken {
  token: string;
  sessionExpirationTime?: Date;
  tokenExpirationTime?: Date;
}

interface ChatIvsProps {
  userData: CurrentUser | null;
  isViewer:string;
  inviteModal: () => void;
  chatTokenData: {
    token: string;
    sessionTime: string;
    tokenTime: string;
  }
}

export const ChatIvs = (props: ChatIvsProps) => {

  const { chatTokenData, userData,isViewer } = props;

  const [room, setRoom] = useState<ChatRoom | undefined>(undefined);

  const [message, setMessage] = useState<string>('');

  const [chatData, setChatData] = useState<ChatData[]>([]);

  const [chatEnabled, setChatEnabled] = useState<boolean>(false);

  const flatListRef: React.LegacyRef<FlatList<ChatData>> =
  React.useRef(null);

  function tokenProvider(): Promise<ChatToken> {
    return new Promise((resolve, reject) => {
      const chatToken = {
        token: chatTokenData.token,
        sessionExpirationTime: new Date(chatTokenData.sessionTime),
        tokenExpirationTime: new Date(chatTokenData.tokenTime)
      };
      resolve(chatToken);
    });
  }

  useEffect(() => {
    if (chatTokenData.token != '' && chatTokenData.sessionTime != '') {
      setRoom(new ChatRoom({
        regionOrUrl: 'ap-south-1',
        tokenProvider,
      }))
    }
  }, [chatTokenData])


  useEffect(() => {
    if (room == undefined) {
      return
    }

    room.connect();

   let unsubscribeConnect = room.addListener('connect', () => {
      setChatEnabled(true)
    });

   let unsubscribeMessage = room.addListener('message', (message: ChatMessage) => {
      let newData = { senderName: message.attributes?.senderName ?? '', senderId: message.attributes?.senderId ?? '', message: { Message: { text: message.content, type: '' }, imageUrl: ''} }
      setChatData((msgs) => [...msgs, newData])
      flatListRef.current?.scrollToEnd({ animated: true });
    })
    return(()=> {
      unsubscribeConnect()
      unsubscribeMessage()
    })
  }, [room])

  const sendMessage = async () => {
    if (message === "" || chatEnabled == false || room == undefined || userData == null) {
      return
    }

    let attributes = { "message_type": "MESSAGE", "senderName": `${userData.full_name}`, "senderId": `${userData.id}`, "imageUrl": `${userData.photo}` }
    const request = new SendMessageRequest(message, attributes);
    await room.sendMessage(request);
    setMessage('')
    Keyboard.dismiss()
  }

  const calcScale = (units: number) => {
    return (screenWidth / 414) * units;
  }

  if (chatTokenData.token == '') {
    return <></>
  }

  return (
    <View testID="responderView" style={[styles.chatMainView, { height: calcScale(300) }]} onStartShouldSetResponder={() => true}>
      <View style={styles.keyboardAvoiding}>

        <View style={{ height: calcScale(300), marginBottom: 10 }}>
          <FlatList
          ref={flatListRef}
            testID="flatlistTest"
            data={chatData}
            showsVerticalScrollIndicator={false}
            renderItem={({
              item,
              index,
            }: {
              item: ChatData
              index: number;
            }) => {
              const { message, senderId, senderName } = item;
              const localSender = `${userData?.id}` == senderId;
              const shouldRender = Boolean(message.Message.type !== 'application' || !message.Message.type)
              const returnText = () => {
                if (localSender) {
                  return "You"
                } else {
                  return senderName
                }
              }
              if (!shouldRender) {
                return null
              }
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.viewText,
                    { alignSelf: "flex-start" },
                  ]}>
                  <Text style={[styles.text1]}>
                    {returnText()}
                  </Text>
                  {message.Message.text !== "" && 
                    <Text style={[styles.text1]}>{message.Message.text}</Text>
                  }
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => `${index}_message_list`}
            style={{
              marginBottom: calcScale(80),
            }}
          />
        </View>
        <KeyboardAvoidingView
          style={styles.paddingTextinput}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 40}
        >

          <View style={styles.textInputView}>
            <View style={styles.containerView}>
              <TextInput
                testID={"message"}
                value={message}
                defaultValue={message}
                placeholder={"Write your message"}
                style={[styles.containerStyle]}
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={setMessage}
                selectionColor={"white"}
                placeholderTextColor={"#fff"}
                maxLength={200}
              />
            </View>

            <View
              style={[
                {
                  flexDirection: "row",
                },
                styles.btnView,
              ]}>

              <TouchableOpacity testID={"sendMessage"} onPress={sendMessage} style={styles.btn}>
                <Image source={messanger} style={styles.sendIcon} />
              </TouchableOpacity>


            {isViewer == 'false' ?  <TouchableOpacity onPress={props.inviteModal}>
                <Image source={person} style={styles.sendIcon} />
              </TouchableOpacity> : null}
            </View>
          </View>


        </KeyboardAvoidingView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    justifyContent: "flex-end",
  },
  viewText: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 12,
  },
  paddingTextinput: {
    paddingHorizontal: 12,
  },
  text1: {
    fontSize: 14,
    color: "black",
    fontFamily: fonts.RobotoMedium,
  },
  commentImgStyle: {
    height: 50,
    width: 50,
    marginTop: 5
  },
  containerStyle: {
    flex: 1,
    color: "#fff",
    marginLeft: 12,
    margin: 4,
    padding: 4,
  },
  btnView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    padding: 4,
    borderRadius: 8,
  },
  imgStyle: {
    height: "100%",
    width: "100%",
  },
  sendIcon: {
    height: 21,
    width: 25,
    tintColor: "#fff"
  },
  containerView: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
  },
  btn: {
    height: 30,
    aspectRatio: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
  },
  chatMainView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 70,
    right: 0,
    left: 0
  },
  textInputView: {
    height: 40,
    flexDirection: "row",
    alignSelf: 'center',
    width: screenWidth - 20,
    bottom: 0,
  }
});