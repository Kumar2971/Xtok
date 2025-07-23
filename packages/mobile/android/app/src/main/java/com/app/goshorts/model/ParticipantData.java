package com.app.goshorts.model;

import com.amazonaws.ivs.broadcast.StageStream;

public class ParticipantData {
    String id = "";
    Boolean isLocal = false;
    String participantId = "";
    String username = "";
    String avatarUrl = "";
    Boolean isHost = false;
    String viewerType = "guest";

    int viewCount=0;

    StageStream stageStream = null;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean getLocal() {
        return isLocal;
    }

    public void setLocal(Boolean local) {
        isLocal = local;
    }

    public String getParticipantId() {
        return participantId;
    }

    public void setParticipantId(String participantId) {
        this.participantId = participantId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Boolean getHost() {
        return isHost;
    }

    public void setHost(Boolean host) {
        isHost = host;
    }

    public String getViewerType() {
        return viewerType;
    }

    public void setViewerType(String viewerType) {
        this.viewerType = viewerType;
    }

    public StageStream getStageStream() {
        return stageStream;
    }

    public void setStageStream(StageStream stageStream) {
        this.stageStream = stageStream;
    }

    public int getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }
}
