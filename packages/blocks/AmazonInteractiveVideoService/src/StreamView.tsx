import React from "react";
import { Platform, requireNativeComponent } from "react-native";

const NativeView = requireNativeComponent(
    Platform.OS == "ios" ? "StreamViewRNModule" : "RCTIVSBroadcastCameraView"
);

export const StreamView: React.FC<{ hostId: string | null | undefined, onParticipantLeft: (data: any) => void, onParticipantAdded: (data: any) => void, endbuttonPressed: () => void, flipCamera: string, selectedChallengeUserId: number | null, teamIdForNative: string, isMute: string, handleOnLikePressed: (data: any) => void, onGridTapped: (data: any) => void, isLiveChallenge: boolean, broadcastDetail: string, nativeViewHeight: string, streamViewHeight: string, streamEndPressed: boolean }> = React.memo((props) => {

    const { selectedChallengeUserId, hostId, onParticipantLeft, onParticipantAdded, endbuttonPressed, flipCamera, isMute, teamIdForNative, nativeViewHeight, handleOnLikePressed, onGridTapped, isLiveChallenge, broadcastDetail, streamEndPressed, streamViewHeight } = props;
    console.log("=-=-=-=-=-=-=-=-=-++++=-=-=-3399339-=-=-==-", props.broadcastDetail)
    return <NativeView
        //@ts-ignore
        nativeViewHeight={nativeViewHeight}
        streamViewHeight={streamViewHeight}
        streamEndPressed={`${streamEndPressed}`}
        broadcastDetail={broadcastDetail}
        isLiveChallenge={`${isLiveChallenge}`}
        onGridTapped={onGridTapped}
        onLikePressed={handleOnLikePressed}
        muteUser={isMute}
        teamIdForNative={teamIdForNative}
        selectedChallengeUserId={`${selectedChallengeUserId}`}
        flipCamera={flipCamera}
        style={{ flex: 1 }}
        onStreamEnded={endbuttonPressed}
        onParticipantAdded={onParticipantAdded}
        onParticipantLeft={onParticipantLeft}
        cameraPosition={"front"}
        hostId={hostId}
    />
})