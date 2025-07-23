package com.app.goshorts.model;

public class UserInfo {
    String userId = "";
    String userName = "";
    String isHost = "";
    String photo = "";
    String isViewer = "";
    String userRole = "";

    public UserInfo() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getIsHost() {
        return isHost;
    }

    public void setIsHost(String isHost) {
        this.isHost = isHost;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getIsViewer() {
        return isViewer;
    }

    public void setIsViewer(String isViewer) {
        this.isViewer = isViewer;
    }
}
