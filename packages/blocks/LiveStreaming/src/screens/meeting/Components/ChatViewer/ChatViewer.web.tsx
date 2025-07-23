import React, { useState, useRef, useEffect } from "react";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import moment from "moment";
import { Box, IconButton, InputBase, Typography } from "@material-ui/core";
import Send from "@material-ui/icons/SendSharp";

type IPubSub = {
  publish: (
    message: string,
    {
      persist,
    }: {
      persist: boolean;
    },
  ) => void;
  messages: Array<{
    id: string;
    message: string;
    senderId: string;
    senderName: string;
    timestamp: string;
    topic: string;
  }>;
};

interface IMessage {
  id: string;
  message: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  topic: string;
}

const ChatViewer = () => {
  const mPubSubRef = useRef<IPubSub | null>();

  const mPubSub = usePubSub("CHAT", {});

  useEffect(() => {
    mPubSubRef.current = mPubSub;
  }, [mPubSub]);

  const mMeeting = useMeeting({});
  const localParticipantId = mMeeting?.localParticipant?.id;

  const [chatMessage, setChatMessage] = useState("");

  const boxRef = React.useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    mPubSub.publish(chatMessage, { persist: true });
    setChatMessage("");
    await scrollToBottom();
  };

  const scrollToBottom = async () => {
    boxRef.current && boxRef.current.scrollIntoView();
  };

  return (
    <Box sx={webStyle.dialogContainer}>
      <Typography align="center" style={webStyle.dialogTitle} component="h1">
        Chat
      </Typography>
      <Box sx={webStyle.chatContainer}>
        <div ref={boxRef} style={webStyle.chatBody}>
          {mPubSub.messages &&
            mPubSub.messages.map((item: IMessage) => {
              const { message, senderId, timestamp, senderName } = item;
              const localSender = localParticipantId === senderId;

              const time = moment(timestamp).format("hh:mm:ss");
              return (
                <Box
                  key={item.id}
                  style={{ alignSelf: localSender ? "flex-end" : "flex-start" }}
                  sx={webStyle.commentContainer}>
                  <Typography style={webStyle.commentOwner}>
                    {localSender ? "You" : senderName}
                  </Typography>
                  <Typography style={webStyle.comment}>{message}</Typography>
                  <Typography style={webStyle.commentTime}>{time}</Typography>
                </Box>
              );
            })}
        </div>
        <Box>
          <InputBase
            data-test-id="sendMessageInput"
            value={chatMessage}
            onChange={(event) => setChatMessage(event.target.value)}
            className="comment-input"
            placeholder="Write your message"
            endAdornment={
              <IconButton onClick={sendMessage}>
                <Send width={25} height={25} htmlColor="#fff" />
              </IconButton>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ChatViewer;

const webStyle = {
  dialogContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#fff",
    marginBottom: 20,
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  chatBody: {
    flex: 1,
    maxHeight: "100%",
  },
  commentContainer: {
    backgroundColor: "#404B53",
    padding: "8px 10px",
    margin: "6px 12px",
    borderRadius: 10,
  },
  commentOwner: {
    fontSize: 12,
    color: "#9A9FA5",
    fontWeight: 600,
  },
  comment: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  commentTime: {
    fontSize: 14,
    color: "white",
    marginTop: 8,
  },
};
