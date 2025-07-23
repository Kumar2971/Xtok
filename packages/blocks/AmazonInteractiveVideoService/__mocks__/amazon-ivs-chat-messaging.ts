

export class ChatMessage {
  constructor() {
    
  }
}
let index = 0;

export class ChatRoom {
  constructor() {
    this.sendMessage = jest.fn();
  }

  connect() {
  }

  addListener(key:string,callback:(par?:any)=>void){
    const item : {attributes:{message_type:string,senderName:string,senderId:string,imageUrl:string},content:string} = {attributes:{message_type:'TIMER',senderName:'string',senderId:'string',imageUrl:'string'},content:'string'}   
    const cancelMatch = {attributes:{message_type:'CANCELMATCH',senderName:'string',senderId:'string',imageUrl:'string'},content:'string'}   
    const coHostLeave = {attributes:{message_type:'COHOSTLEAVE',senderName:'string',senderId:'string',imageUrl:'string'},content:'string'}   
    const challengeStop = {attributes:{message_type:'CHALLENGESTOPPED',hostId:'1',senderName:'string',senderId:'string',imageUrl:'string'},content:'string'}   
    const liveChanged = {attributes:{message_type:'LIVECHANGED',challengeTeams:['1'],teamIdData:['1'],duration:'5',seconds:'3',hostId:'1',senderName:'string',senderId:'string',imageUrl:'string'},content:'string'}   
   const leaveRelatedPeople = {attributes:{message_type:'LEAVERELATEDPEOPLE',userId:1}}
   const liked = {attributes:{message_type:'LIKED',likedUserId:1,likeCount:2}}
   const blockUser = {attributes:{message_type:'BLOCKUSER',blockId:1}}
   const Allowcomments = {attributes:{message_type:'Allowcomments',Allowcommnets:'false'}}
   const handelModerator = {attributes:{message_type:'handelModerator',Moderatorid:1,ModeratorType:'Remove'}}
   const handelModeratorAdd = {attributes:{message_type:'handelModerator',Moderatorid:1,ModeratorType:'Add'}}
   const handelHostToken = {attributes:{message_type:'handelHostToken'}}
   const handelMuteUmute = {attributes:{message_type:'handelMuteUmute',MuteUnmuteType:'true',Muteid:1,isModerator:"true",duration:"5"}}
   const handelMuteUmute1 = {attributes:{message_type:'handelMuteUmute',MuteUnmuteType:'true',Muteid:5,}}
   const handelMuteUmuteFalse = {attributes:{message_type:'handelMuteUmute',MuteUnmuteType:'false',Muteid:2,}}
   const handelMuteUmutetrue = {attributes:{message_type:'handelMuteUmute',MuteUnmuteType:'false',Muteid:1,}}
   const handelBlock =  {attributes:{message_type:'handelBlock',Blockid:1}}
   const handleUserJoiningMessage = {attributes:{message_type: "PARTICIPATING_MSG",user_name:"user_name",isJoining:"true",id:"string"}};
   const invalidJoiningMessage = {attributes:{message_type: "PARTICIPATING_MSG",updateViewerCount: "false",id:null,photo:null}};
   const gift =  {attributes:{message_type:'GIFT',type:"image",senderName:"sa",senderId:"1",giftName:"name",giftedTo:"as",imageUrl:"as",selectedHostId:"1"}}
   const gift2 =  {attributes:{message_type:'GIFT',type:"image",senderName:"sa",senderId:"2",giftName:"name",giftedTo:"as",imageUrl:"as",selectedHostId:"1"}}
   const gift3 =  {attributes:{message_type:'GIFT',type:"image",senderName:"sa",senderId:"1",giftName:"name",giftedTo:"as",imageUrl:"as",selectedHostId:"7"}}
   const normalMessage = {attributes:{ "id":"asd", "message_type": "MESSAGE", "senderName": `name`, "senderId": `string`, "imageUrl": `photo` , "selectedHostId": `1`}}
   const normalMessage2 = {attributes:{ "id":"", "message_type": "MESSAGE", "senderName": `name`, "senderId": `string`, "imageUrl": `photo` , "selectedHostId": `1`}}
   const deletMessage = {attributes:{ "id":"", "message_type": "DELETECOMMENT", "senderName": `name`, "senderId": `string`, "imageUrl": `photo` , "selectedHostId": `1`}}
   const deletMessage2 = {attributes:{ "id":"asd", "message_type": "DELETECOMMENT", "senderName": `name`, "senderId": `string`, "imageUrl": `photo` , "selectedHostId": `1`}}


   if(key == 'connect'){
      callback({item});
      return jest.fn();
  } else if(key == 'message') {
    index += 1;
    
     callback(item);
     callback(cancelMatch);
     callback(coHostLeave);
     callback(liveChanged);
     callback(challengeStop);
     callback(leaveRelatedPeople);
     callback(liked);
     callback(blockUser);
     callback(Allowcomments);
     callback(handelModerator);
     callback(handelModeratorAdd);
     callback(handelHostToken);
     callback(handelMuteUmute);
     callback(handelMuteUmuteFalse);
     callback(handelMuteUmutetrue);
     callback(handelMuteUmute1);
     callback(handelBlock);
     callback(handleUserJoiningMessage);
     callback(invalidJoiningMessage);
     callback(gift);
     callback(gift2);
     callback(gift3);
     callback(normalMessage);
     callback(normalMessage2);
     callback(deletMessage);
     callback(deletMessage2);
     return jest.fn();
  }
  }

  removeListener(key:string,callback:(par?:any)=>void){callback()}
  

  tokenProvider() {

  }

  sendMessage(req:any) {
  }
}

export class SendMessageRequest {
  message:string;
  attributes:string;
  constructor() {
    this.message='';
    this.attributes=''
  }
}
