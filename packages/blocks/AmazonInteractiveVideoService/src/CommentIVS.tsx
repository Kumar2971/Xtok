import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FlatList, Image, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fonts } from './styles/fonts';
import { avatar, gift, imgRightArrow, left, messanger, share } from './assets';
import { ChatMessage, ChatRoom, SendMessageRequest } from 'amazon-ivs-chat-messaging';
import { CurrentUser, configJSON } from './LiveStreamingController';
import { screenWidth } from './helpers/DynamicDimension';
import { SenderId } from 'aws-sdk/clients/pinpointsmsvoicev2';
import { translate } from "../../../components/src/i18n/translate";
import { getStorageData } from 'framework/src/Utilities';
import AlertModal from "../../../components/src/AlertModal";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import createRequestMessage from './helpers/create-request-message';

interface ChatData {
  id: string;
  senderName: string;
  senderId: string;
  message: { Message: { text: string, type: string }, imageUrl: string | null },
  selectedHostId: string | null;
}

interface ChatToken {
  token: string;
  sessionExpirationTime?: Date;
  tokenExpirationTime?: Date;
}

interface ChatIvsProps {
  userData: CurrentUser | null;
  isViewer: string;
  isChallenge: boolean;
  previousChatData: any;
  selectedChallengeUserId: number | null;
  blockuserid: number | null;
  setParentChatRoom: (chatRoom: ChatRoom) => void;
  onReceiveGifts: (gift: ChatMessage) => void;
  onRedirectAfterChallenge: (stage: any) => void;
  showHostComment?: boolean;
  userRole: string;
  allParticipants: any;
  inviteModal: () => void;
  giftModel: () => void;
  shareLink: () => void;
  onLeaveStream: () => void;
  redirectAsCohost: () => void;
  handleCancelledMatch: (isLeave: boolean) => void;
  handelUserBlocked: () => void;
  onLiveChanged: (teams: string, teamId: string, duration: string, seconds: string) => void;
  onCommentBack: () => void;
  onDataReceived: (gift: SenderId, moderator: any,) => void;
  userLeftName: string | null;
  duration: any;
  minutes: number;
  seconds: number;
  teamCombinedIds: number[];
  redirectStageArn: any;
  redirectStageId: any;
  powerButtonWithoutChallenge: boolean;
  redirectChatArn: any;
  notificationData: any;
  cancelMatch: boolean;
  coHostLeave: boolean;
  startNewLive: boolean;
  likedUserId: string | null;
  onLiked: (count: number) => void;
  sendLikeCount: number;
  onSendLikeCount: () => void;
  chatTokenData: {
    token: string;
    sessionTime: string;
    tokenTime: string;
  },
  challengeTeams: { teamA: string[], teamB: string[] },
  handleParticipantJoining: (userData: any) => void;
  slow_mode: boolean;
  stageId: string;
  ReportedDeleteMessageList: Array<{
    messege_id: string,
    stage_id: number,
    messege_text: string,
    reason: string,
  }>;
  initializetHostSideMute: ({ id, duration }: { id: number, duration: number }) => void;
}

const CommentIVS = (props: ChatIvsProps) => {

  const { chatTokenData, startNewLive, onLeaveStream, powerButtonWithoutChallenge, userLeftName, onLiked, sendLikeCount, onSendLikeCount, likedUserId, notificationData, coHostLeave, handleCancelledMatch, cancelMatch, redirectAsCohost, duration, allParticipants, minutes, seconds, teamCombinedIds, userData, previousChatData, showHostComment, selectedChallengeUserId, isChallenge, onLiveChanged, onCommentBack, redirectStageArn, redirectStageId, onRedirectAfterChallenge, redirectChatArn, userRole, challengeTeams, blockuserid, handelUserBlocked, slow_mode, stageId, ReportedDeleteMessageList } = props;
  const latestParticipantsRef = useRef(allParticipants);
  const [room, setRoom] = useState<ChatRoom | undefined>(undefined);

  const [isCohost, setIsCohost] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');

  const [chatData, setChatData] = useState<{ userChatData: ChatData[], wholeChatData: ChatData[] }>({ userChatData: [], wholeChatData: [] });

  const [chatEnabled, setChatEnabled] = useState<boolean>(false);
  const [userJoinLeaveCount, setuserJoinLeaveCount] = useState<number>(0);

  const [endInitiated, setEndInitiated] = useState<boolean>(false);
  const [Allowcomments, setAllowcomments] = useState<string>('true');
  const [deleteCommentModal, setDeleteCommentModal] = useState<{ openAlertModal: boolean; alertMsg: string }>({ openAlertModal: false, alertMsg: '' });
  const [reportCommentModal, setreportCommentModal] = useState<{ openAlertModal: boolean; alertMsg: string }>({ openAlertModal: false, alertMsg: '' });



  const [inputDisble, setinputDisble] = useState<boolean>(false);
  const [isModerator, setModerator] = useState<boolean>(false)
  const [isMute, setMute] = useState<boolean>(false);
  const [Mutedid, setMutedid] = useState<string>('');
  const [Blockid, setBlockid] = useState<string>('');
  const [language, setLanguage] = useState<string>('');

  const deleteAttributes = useRef<{ message_type: string, commentId: string }>({ message_type: "", commentId: "" });
  const reportAttributes = useRef<{ message_text: string, messageId: string }>({ message_text: "", messageId: "" });


  const selectedChallengerId = useRef<string>('');

  const leave = useRef<boolean>(false);

  const isLocallyChanged = useRef<boolean>(false);

  const timerInitiated = useRef<boolean>(false);

  const isCancelled = useRef<boolean>(false);

  const isChallengeStarted = useRef<boolean>(false);

  const startNewLiveRef = useRef<boolean>(false);

  const notificationDataRef = useRef<boolean>(false);

  const flatListRef: React.LegacyRef<FlatList<ChatData>> =
    React.useRef(null);

  const textInputRef = useRef<TextInput | null>(null);

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

  const handleChallengeStopped = (message: any) => {
    setEndInitiated(true);
    if (notificationDataRef.current) {
      return
    }
    if (`${selectedChallengerId.current}` == message?.attributes?.hostId || startNewLiveRef.current) {
      onRedirectAfterChallenge({ redirectStageArn: message?.attributes?.redirectStageArn, redirectStageId: message?.attributes?.redirectStageId, hostId: message?.attributes?.hostId, redirectChatArn: message?.attributes?.redirectChatArn, chatData: chatData.userChatData })
      room?.removeListener('message', () => { })
      room?.removeListener('connect', () => { })
    }
  }
  const onprofileview = async (id: any, isModerator: any,) => {

    props.onDataReceived(id, isModerator,);
  }

  const callhandleblocked = (message: any) => {
    if (userData?.id == message?.attributes?.blockId) {
      handelUserBlocked()

    }
  }

  const callhandleModerator = (message: any) => {


    if (userData?.id == message?.attributes?.Moderatorid && message?.attributes?.ModeratorType == "Remove") {

      setModerator(true)


    }
    else if (userData?.id == message?.attributes?.Moderatorid && message?.attributes?.ModeratorType == "Add") {
      setModerator(false)


    }


  }

  const handleMuteCommnets = (message: any) => {
    if (message.attributes.isModerator == "true") {
      props.initializetHostSideMute({ id: Number(message.attributes.Muteid), duration: Number(message.attributes.duration) })
    }
    if (message.attributes.MuteUnmuteType == "true") {
      setMutedid(message.attributes.Muteid)
    } else {
      setMutedid('')
    }
  }

  const callhandleMute = (message: any) => {

    if ((userData?.id == message?.attributes?.Muteid && message?.attributes?.MuteUnmuteType == "true")) {
      setMute(true)
      setMutedid(message.attributes.Muteid)
    }
    else if ((userData?.id == message?.attributes?.Muteid && message?.attributes?.MuteUnmuteType == "false")) {
      setMute(false)
      setMutedid('')
    }
  }
  const handleBlockLeave = async () => {
    if (room == undefined) {
      return
    }

    let attributes = { "message_type": "BLOCKUSER", "blockId": `${blockuserid}` }
    const request = new SendMessageRequest("hola", attributes);

    await room.sendMessage(request);

  }

  useEffect(() => {
    latestParticipantsRef.current = allParticipants;
  }, [allParticipants]);

  const leaveLiveStream = (userId: string) => {
    let host = latestParticipantsRef.current.filter((item: any) => item.role == 'host')

    if ((host[0] && (host[0].id == userId)) || userData?.id === userId) {
      onLeaveStream()
    }
  }

  const handleUserJoiningMessage = (userDetails: any) => {
    if (userDetails.updateViewerCount !== "true") {
      setuserJoinLeaveCount(userJoinLeaveCount + 1)
      let name = userDetails.user_name ?? '';
      let newData = {
        id: "",
        senderName: name,
        senderId: userDetails.id ?? '', message:
        {
          Message:
          {
            text: `${userDetails.id == userData?.id ? translate("you") : name} ${userDetails.isJoining == "true" ? translate("joined") : translate("left")} ${translate("theStream")}`,
            type: ''
          },
          imageUrl: userDetails.photo ?? ''
        },
        selectedHostId: `${selectedChallengeUserId ?? ''}`
      };
      setChatData((msgs) => ({
        wholeChatData: [...msgs.wholeChatData, newData],
        userChatData: [...msgs.userChatData, newData]
      }));
    }
    props.handleParticipantJoining(userDetails);
  }

  const handleLeaveRelatedPeople = async () => {
    if (room == undefined) {
      return
    }
    let attributes = { "message_type": "LEAVERELATEDPEOPLE", "userId": `${userData?.id}` }
    const request = new SendMessageRequest("hola", attributes);
    await room.sendMessage(request);
  }

  const changeLiveToChallenge = async () => {
    let attributes = { "message_type": "LIVECHANGED", "challengeTeams": `${JSON.stringify(challengeTeams)}`, "teamIdData": JSON.stringify(teamCombinedIds), "duration": `${duration}`, "seconds": '0' }
    const request = new SendMessageRequest("hola", attributes);
    await room?.sendMessage(request);
  }

  const redirectToLiveStream = async () => {
    let attributes = { "message_type": "CHALLENGESTOPPED", redirectCohost: "false", redirectStageArn, redirectStageId: `${redirectStageId}`, hostId: `${userData?.id ?? '0'}`, redirectChatArn }
    if (notificationData != null) {
      attributes = { ...attributes, redirectCohost: "true" }
    }
    const request = new SendMessageRequest("hola", attributes);
    // if(userRole === 'cohost'){
    //   onRedirectAfterChallenge({...attributes,chatData:chatData})
    // }
    await room?.sendMessage(request);
  }

  const checkLanguage = async () => {
    const language = await getStorageData("SelectedLng");
    setLanguage(language)
  }

  const updateTimer = async () => {
    let attributes = { "message_type": "TIMER", "challengeTeams": JSON.stringify(challengeTeams), teamIdData: JSON.stringify(teamCombinedIds), "minutes": `${minutes}`, "seconds": `${seconds}` }
    const request = new SendMessageRequest("hola", attributes);
    await room?.sendMessage(request);
  }

  const handleTimer = (message: any) => {
    if ((userRole == "viewer" || userRole == 'guest') && !timerInitiated.current) {
      timerInitiated.current = true;
      onLiveChanged(message?.attributes?.challengeTeams, message?.attributes?.teamIdData ?? "[]", message?.attributes?.minutes ?? '0', message?.attributes?.seconds ?? '0');
    }
  }

  const handleCancelMatch = async () => {
    let attributes = { "message_type": "CANCELMATCH" }
    const request = new SendMessageRequest("hola", attributes);
    await room?.sendMessage(request);
  }

  const callCohostLeave = (userId: string) => {
    if (leave.current || userId == `${selectedChallengerId.current}`) {
      handleCancelledMatch(true)
    } else {
      handleCancelledMatch(false)
    }
  }

  const handleLiked = (message: any) => {
    if (message?.attributes?.likedUserId == userData?.id) {
      onLiked(parseInt(message?.attributes?.likeCount ?? '0'))
    }
  }

  const handleCoHostLeave = async () => {
    leave.current = true;
    let attributes = { "message_type": "COHOSTLEAVE", userId: `${userData?.id}` }
    const request = new SendMessageRequest("hola", attributes);
    await room?.sendMessage(request);
  }

  const handleDeleteComment = (message: any) => {
    setChatData((messageList) => ({
      wholeChatData: messageList.userChatData.filter((item) => item.id !== message.attributes.commentId),
      userChatData: messageList.wholeChatData.filter((item) => item.id !== message.attributes.commentId)
    }));
  }

  const sendLikedPig = async (likedId: any) => {
    if (likedUserId == null) return
    let attributes = { "message_type": "LIKED", "likedUserId": likedId, "likeCount": `${sendLikeCount}` }
    const request = new SendMessageRequest("hola", attributes);
    await room?.sendMessage(request);
    onSendLikeCount();
  }

  const handleGift = (message: any) => {
    if (message?.attributes?.type === "image") {
      let name = message.attributes?.senderName ?? '';
      let newData = { id: "", senderName: name, senderId: message.attributes.senderId, message: { Message: { text: `${name} gifted ${message.attributes.giftName} to ${message.attributes.giftedTo}`, type: '' }, imageUrl: message.attributes.imageUrl }, selectedHostId: `${message.attributes.selectedHostId}` };
      setChatData((msgs) => ({ ...msgs, wholeChatData: [...msgs.wholeChatData, newData] }))
      if (isChallengeStarted.current) {
        if ((userData?.id === message.attributes?.senderId) || (selectedChallengerId.current && selectedChallengerId.current === message.attributes?.senderId) || (selectedChallengerId.current && message.attributes?.selectedHostId && selectedChallengerId.current == message.attributes?.selectedHostId)) {
          setChatData((msgs) => ({ ...msgs, userChatData: [...msgs.userChatData, newData] }))
          flatListRef.current?.scrollToEnd({ animated: true });
        }
      } else {
        setChatData((msgs) => ({ ...msgs, userChatData: [...msgs.userChatData, newData] }))
        flatListRef.current?.scrollToEnd({ animated: true });
      }
    }
    props.onReceiveGifts(message)
  }

  const defaultActionOnMessage = (message: any) => {
    if (message.content === "hola") return
    let newData = { id: message.id, senderName: message.attributes.senderName, senderId: message.attributes.senderId, message: { Message: { text: message.content, type: '' }, imageUrl: message.attributes.imageUrl }, selectedHostId: `${message.attributes.selectedHostId}` };
    setChatData((msg) => ({ ...msg, wholeChatData: [...msg.wholeChatData, newData] }));
    if (isChallengeStarted.current) {
      if (selectedChallengerId.current && message.attributes?.selectedHostId && selectedChallengerId.current == message.attributes?.selectedHostId) {
        setChatData((msg) => ({ ...msg, userChatData: [...msg.userChatData, newData] }))
        flatListRef.current?.scrollToEnd({ animated: true });
      }
    } else {
      setChatData((msg) => ({ ...msg, userChatData: [...msg.userChatData, newData] }))
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }

  useEffect(() => {
    if (userLeftName) {
      setuserJoinLeaveCount(userJoinLeaveCount + 1)
      let newData = { id: "", senderName: userLeftName, senderId: '0', message: { Message: { text: `${userLeftName} ${translate("has_left")}`, type: '' }, imageUrl: '' }, selectedHostId: '' };
      setChatData((msgs) => ({
        wholeChatData: [...msgs.wholeChatData, newData],
        userChatData: [...msgs.userChatData, newData]
      }));
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [userLeftName])

  useEffect(() => {
    if (likedUserId != null) {
      sendLikedPig(likedUserId)
    }
  }, [likedUserId])

  useEffect(() => {
    if (coHostLeave) {
      handleCoHostLeave()
    }
  }, [coHostLeave])

  useEffect(() => {
    if (chatTokenData.token != '' && chatTokenData.sessionTime != '') {
      setRoom(new ChatRoom({
        regionOrUrl: 'ap-south-1',
        tokenProvider,
      }))
    }
  }, [chatTokenData])

  useEffect(() => {
    if (previousChatData != null && previousChatData.length != 0) {
      setChatData({
        wholeChatData: previousChatData,
        userChatData: previousChatData
      });
    }
  }, [previousChatData])

  useEffect(() => {
    if (ReportedDeleteMessageList) {
      setChatData({
        wholeChatData: chatData.wholeChatData.filter((item) => !ReportedDeleteMessageList.some((value) => value.messege_id === item.id)),
        userChatData: chatData.userChatData.filter((item) => !ReportedDeleteMessageList.some((value) => value.messege_id === item.id))
      });
    }
  }, [ReportedDeleteMessageList])

  setInterval(async () => {
    const token = await getStorageData("authToken", false)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    const headers = {
      "Content-Type": configJSON.apiContentType, token,
    };

    const body = {
      count: chatData.userChatData.length - userJoinLeaveCount
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: "/bx_block_ivslivestreams/livestreams/live_comments/" + stageId,
      method: "PATCH",
      header: headers,
      body: JSON.stringify(body)
    });
  }, 30000);

  const reportMessageApiCall = async () => {
    const token = await getStorageData("authToken", false)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token,
    };

    const body = {
      report: {
        stage_id: stageId,
        reason: "",
        messege_id: reportAttributes.current.messageId,
        messege_text: reportAttributes.current.message_text,
      }
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: "/bx_block_ivslivestreams/reported_messages",
      method: "POST",
      header: headers,
      body: JSON.stringify(body)
    });
  }
  const action_getComments = async () => {
    const token = await getStorageData("authToken", false)
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage),
    );
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token,
    };

    const body = {
      "commentable_type": "Stage",
      "account_id": userData?.id,
      "comment": message,
      "stage_id": stageId
    };

    createRequestMessage({
      requestMessage: requestMessage,
      endPoint: "/bx_block_comments/comments",
      method: "POST",
      header: headers,
      body: JSON.stringify(body)
    });
  }
  useEffect(() => {
    isChallengeStarted.current = isChallenge
    if (isChallenge && !isLocallyChanged.current) {
      changeLiveToChallenge();
    }
  }, [isChallenge])

  useEffect(() => {
    if (userRole == "host" && isChallenge) {
      if (seconds % 5 == 0) {
        updateTimer();
      }
    }
  }, [minutes, seconds])

  useEffect(() => {
    checkLanguage()
  }, [language])


  useEffect(() => {
    if (cancelMatch) {
      handleCancelMatch()
    }
  }, [cancelMatch])

  useEffect(() => {
    handleLeaveRelatedPeople()
  }, [powerButtonWithoutChallenge])


  useEffect(() => {
    if (blockuserid) {

      handleBlockLeave()
    }
  }, [blockuserid])

  useEffect(() => {
    startNewLiveRef.current = startNewLive
  }, [startNewLive])

  useEffect(() => {
    let participant = latestParticipantsRef.current.filter((item: any) => item.role == 'cohost' || item.role == 'host')
    if (isChallenge && ((participant.length % 2) != 0) && userRole != "viewer") {
      handleCancelMatch()
    }
  }, [latestParticipantsRef.current])

  useEffect(() => {
    if (redirectChatArn != "" && userRole == "host" && notificationData != null && latestParticipantsRef.current.length > 1) {
      isCancelled.current = true;
      redirectToLiveStream()
    }
  }, [notificationData, redirectChatArn, userRole, latestParticipantsRef.current])

  useEffect(() => {
    if (notificationData != null) {
      notificationDataRef.current = true
    }
  }, [notificationData])

  useEffect(() => {
    let participant = latestParticipantsRef.current.filter((item: any) => item.role == 'cohost' || item.role == 'host')
    if (participant.length == 1 && endInitiated && userRole == "host") {
      if (notificationData != null) {
        redirectAsCohost()
        return
      }
    }
  }, [latestParticipantsRef.current, endInitiated, userRole])

  useEffect(() => {
    if (redirectChatArn != "" && isCancelled.current == false && userRole != "viewer" && userRole != "guest") {
      isCancelled.current = true;
      redirectToLiveStream()
    }
  }, [redirectChatArn])

  useEffect(() => {
    if (userRole == "host" || userRole == "cohost") {
      setIsCohost(true)
    }
  }, [userRole])

  useEffect(() => {
    if (selectedChallengeUserId && isChallengeStarted.current) {
      selectedChallengerId.current = selectedChallengeUserId?.toString();
      const filteredChatData = chatData.wholeChatData.filter((item: ChatData) => item.selectedHostId == selectedChallengeUserId?.toString());
      setChatData((msgs) => ({ ...msgs, userChatData: filteredChatData }));
    }
  }, [selectedChallengeUserId, isChallengeStarted.current])

  useEffect(() => {
    if (
      (!isCohost && ((Allowcomments == 'true') && (isMute == false)))) {
      setinputDisble(true)
    }
    else {
      setinputDisble(false)


    }
  }, [Allowcomments, isMute])


  useEffect(() => {
    if (Blockid) {
      const filteredChatData = chatData.wholeChatData.filter((item: ChatData) => item.senderId !== Blockid.toString());
      const filteredChatData1 = chatData.userChatData.filter((item: ChatData) => item.senderId !== Blockid.toString());
      setChatData({ userChatData: filteredChatData, wholeChatData: filteredChatData1 });
      // setWholeChatData(filteredChatData1)
    }
  }, [Blockid])
  useEffect(() => {
    if (Mutedid) {
      const filteredChatData = chatData.wholeChatData.filter((item: ChatData) => item.senderId !== Mutedid.toString());
      const filteredChatData1 = chatData.userChatData.filter((item: ChatData) => item.senderId !== Mutedid.toString());
      setChatData({ userChatData: filteredChatData, wholeChatData: filteredChatData1 });
      // setWholeChatData(filteredChatData1)
    }
  }, [Mutedid])


  useEffect(() => {
    if (room == undefined) return

    room.connect();

    let unsubscribeOnConnected = room.addListener('connect', () => {
      props.setParentChatRoom(room);
      setChatEnabled(true)
    });

    let unsubscribeOnMessageReceived = room.addListener('message', (message: ChatMessage) => {

      switch (message?.attributes?.message_type) {
        case "TIMER":
          handleTimer(message);
          break;

        case "LEAVERELATEDPEOPLE":
          leaveLiveStream(message.attributes?.userId)
          break;

        case "PARTICIPATING_MSG":
          handleUserJoiningMessage(message.attributes)
          break;

        case "LIKED":
          handleLiked(message)
          break;

        case "CANCELMATCH":
          isLocallyChanged.current = false
          timerInitiated.current = false;
          handleCancelledMatch(false)
          break;

        case "COHOSTLEAVE":
          callCohostLeave(message?.attributes?.userId)
          break;

        case "BLOCKUSER":
          callhandleblocked(message)
          break;

        case "Allowcomments":
          setAllowcomments(message?.attributes?.Allowcommnets)
          break;

        case "handelModerator":
          callhandleModerator(message)
          break;

        case "handelMuteUmute":
          callhandleMute(message)
          handleMuteCommnets(message)
          break;

        case "handelBlock":
          setBlockid(message?.attributes?.Blockid)
          break;

        case "CHALLENGESTOPPED":
          handleChallengeStopped(message)
          break;

        case "LIVECHANGED":
          isLocallyChanged.current = true
          timerInitiated.current = true
          onLiveChanged(message?.attributes?.challengeTeams, message?.attributes?.teamIdData ?? "[]", message?.attributes?.duration ?? '0', message?.attributes?.seconds ?? '0');
          break;

        case "DELETECOMMENT":
          handleDeleteComment(message)
          break;

        case "GIFT":
          handleGift(message)
          break;

        default:
          defaultActionOnMessage(message)
          break;
      }
    })


    return () => {
      unsubscribeOnConnected();
      unsubscribeOnMessageReceived();
    };
  }, [room])

  const sendMessage = async () => {
    if (message === "" || chatEnabled == false || userData == null) {
      return
    }

    let attributes = { "message_type": "MESSAGE", "senderName": `${userData.full_name}`, "senderId": `${userData.id}`, "imageUrl": `${userData.photo}`, "selectedHostId": `${selectedChallengeUserId ?? ''}` }
    const request = new SendMessageRequest(message, attributes);
    await room?.sendMessage(request);
    setMessage('');
    Keyboard.dismiss();

    action_getComments()
  }

  const arrowImg = () => {
    if (language == "ar") {
      return imgRightArrow;
    } else {
      return left;
    }
  }


  if (chatTokenData.token == '') {
    return <View style={[styles.chatMainView, { height: showHostComment ? 250 : 200 }]} />
  }

  const showTextInput = (!isCohost || (isCohost && showHostComment));


  return (
    <View testID="responderView" style={[styles.chatMainView, { height: 250, bottom: 5 }, styles.singleLiveView]} onStartShouldSetResponder={() => true}>
      <View style={[styles.keyboardAvoiding, { paddingBottom: 0 }]}>
        <FlatList
          ref={flatListRef}
          testID="flatlistTest"
          data={chatData.userChatData}
          showsVerticalScrollIndicator={false}
          renderItem={({
            item,
            index,
          }: {
            item: ChatData
            index: number;
          }) => {
            const { id, message, senderId, senderName } = item;
            const localSender = `${userData?.id}` == senderId;

            const returnText = () => {
              if (localSender) {
                return translate("you")
              } else {
                return senderName
              }
            }
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.viewText, styles.commentBgnd,
                ]}
                testID={'profileView0'}
                onPress={() => {
                  if (isCohost || isModerator) {
                    onprofileview(senderId, isModerator)
                  }
                }}

              >
                <Image source={(message?.imageUrl && message?.imageUrl != "null") ? { uri: message?.imageUrl } : avatar} style={[styles.avatarIcon, Platform.OS == "android" && styles.borderRadius]} />
                <View style={styles.messageContainer}>
                  <Text style={[styles.text1, styles.messangerName, language == "ar" && { textAlign: "left" }]}>
                    {returnText()}
                  </Text>
                  {message?.Message.text !== "" &&
                    <Text style={[styles.text1, language == "ar" && { textAlign: "left" }]}>{message?.Message.text}</Text>
                  }
                </View>
                {(localSender) ? id != "" && <TouchableOpacity testID='deleteCommentButton' onPress={async () => {
                  deleteAttributes.current = { "message_type": "DELETECOMMENT", "commentId": id }
                  setDeleteCommentModal({ openAlertModal: true, alertMsg: translate("deleteMsg") })
                }}>
                  <Text style={{ color: 'red' }}>{translate("Remove")}</Text>
                </TouchableOpacity> : id != "" &&
                <TouchableOpacity testID='reportCommentButton' onPress={async () => {
                  reportAttributes.current = { "message_text": item.message.Message.text, "messageId": item.id }
                  setreportCommentModal({ openAlertModal: true, alertMsg: translate("reportMsg") })
                }}>
                  <Text style={{ color: 'red' }}>{translate("report")}</Text>
                </TouchableOpacity>
                }
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => `${index}_message_list`}
          style={[styles.flatlistStyle, showTextInput && { marginBottom: 5 }]}
          contentContainerStyle={styles.contentContainer}
          onContentSizeChange={() => flatListRef?.current?.scrollToEnd()}
          bounces={false}
        />
      </View>
      {showTextInput &&
        <View style={styles.textInputView}>
          {isCohost ? <TouchableOpacity style={{ height: 25, width: 25, marginRight: 10 }} onPress={onCommentBack}>
            <Image style={{ height: 25, width: 25, tintColor: 'white' }} source={arrowImg()} />
          </TouchableOpacity> : null}

          <View style={[styles.containerView]}>
            <TextInput

              ref={textInputRef}
              testID={"message"}
              value={message}
              defaultValue={message}
              placeholder={translate("add_comment")}
              style={[styles.containerStyle, language == "ar" && styles.textRight]}
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={setMessage}
              editable={(!isCohost) ? inputDisble : true}
              selectionColor={"white"}
              placeholderTextColor={"#fff"}
              maxLength={200}
            />
            <TouchableOpacity disabled={slow_mode} testID={"sendMessage"} onPress={sendMessage} style={styles.btn}>
              <Image source={messanger} style={[styles.sendIcon, language == "ar" && { transform: [{ rotate: "250deg" }] }]} />
            </TouchableOpacity>
          </View>
          {(!showHostComment)
            &&
            <>
              <TouchableOpacity style={styles.giftIconBgnd} onPress={props.giftModel}>
                <Image source={gift} style={styles.giftIcon} />
                <Text style={styles.shareCount}>{translate("Gifts")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.shareLink} style={styles.giftIconBgnd}>
                <Image source={share} style={styles.giftIcon} />
                <Text style={styles.shareCount}>{translate("share")}</Text>
              </TouchableOpacity>
            </>}
        </View>}
      <AlertModal
        alertModal={deleteCommentModal}
        onPress1={() => setDeleteCommentModal({ openAlertModal: false, alertMsg: "" })}
        onPress2={async () => {
          setDeleteCommentModal({ openAlertModal: false, alertMsg: "" })
          const request = new SendMessageRequest("hola", deleteAttributes.current);
          await room?.sendMessage(request);
          deleteAttributes.current = { message_type: "", commentId: "" }
        }}
        btnTitle1={translate("cancel")}
        btnTitle2={translate("confirm")}
      />
      <AlertModal
        testID='reportMessageTestID'
        alertModal={reportCommentModal}
        onPress1={() => setreportCommentModal({ openAlertModal: false, alertMsg: "" })}
        onPress2={async () => {
          setreportCommentModal({ openAlertModal: false, alertMsg: "" })
          reportMessageApiCall()
        }}
        btnTitle1={translate("cancel")}
        btnTitle2={translate("confirm")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    // justifyContent: "flex-end",
    width: screenWidth - 20,
    alignSelf: 'center'
  },
  viewText: {
    paddingVertical: 8,
    borderRadius: 10,
  },
  paddingTextinput: {
    paddingHorizontal: 12,
  },
  text1: {
    fontSize: 14,
    color: "white",
    fontFamily: fonts.RobotoMedium,
  },
  commentImgStyle: {
    height: 50,
    width: 50,
    marginTop: 5
  },
  flatlistStyle: {
    marginTop: Platform.select({ ios: 10, android: 5 }),
    marginBottom: 5
  },
  containerStyle: {
    flex: 1,
    color: "#fff",
    marginLeft: 12,
    margin: 4,
    padding: 4,
    height: 30,
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
    tintColor: "#fff",
  },
  containerView: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
    marginRight: 20
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
    marginTop: Platform.select({ ios: 5, android: 0 })
  },
  textInputView: {
    height: 30,
    flexDirection: "row",
    alignSelf: 'center',
    width: screenWidth - 20,
    marginVertical: 20,
    alignItems: "center",
  },
  giftIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    tintColor: "white"
  },
  shareCount: { color: "white", textAlign: "center" },
  giftIconBgnd: {
    padding: 5,
    alignItems: "center"
  },
  messangerName: {
    fontSize: 16,
  },
  avatarIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 15,
  },
  borderRadius: {
    borderRadius: 100,
  },
  commentBgnd: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center"
  },
  messageContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    width: '100%'
  },
  singleLiveView: {
    zIndex: 1000,
  },
  textRight: {
    textAlign: "right"
  }
});

export default CommentIVS;