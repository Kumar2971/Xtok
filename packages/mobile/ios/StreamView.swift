//
//  StreamView.swift
//  GoLavi
//
//  Created by developer on 08/08/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

import UIKit
import AmazonIVSBroadcast
import AVFoundation
import Foundation
import React
import SDWebImage

class StreamView: UIView , IVSErrorDelegate, IVSMicrophoneDelegate {
  func underlyingInputSourceChanged(for microphone: IVSMicrophone, toInputSource inputSource: IVSDeviceDescriptor?) {
    self.attachedMicrophone = microphone
  }
  
  func source(_ source: IVSErrorSource, didEmitError error: Error) {
    print("ℹ ❌ IVSBroadcastSession did emit error \(error)")
  }
  
  @IBOutlet var contentView: UIView!
  @IBOutlet weak var collectionView: UICollectionView!
  @IBOutlet weak var viewerCount: UILabel!
  @IBOutlet weak var streamEndedView: UIView!
  @IBOutlet weak var versusView: UIView!
  @IBOutlet weak var teamOneView: UIView!
  @IBOutlet weak var teamTwoView: UIView!
  @IBOutlet weak var mainVSView: UIView!
  @IBOutlet weak var teamImg1: UIImageView!
  @IBOutlet weak var teamImg2: UIImageView!
  @IBOutlet weak var teamImg3: UIImageView!
  @IBOutlet weak var teamImg4: UIImageView!
  @IBOutlet weak var teamImg5: UIImageView!
  @IBOutlet weak var teamImg6: UIImageView!
  @IBOutlet weak var endedLabel: UILabel!
  @IBOutlet weak var img1View: UIView!
  @IBOutlet weak var img2View: UIView!
  @IBOutlet weak var img3View: UIView!
  @IBOutlet weak var img4View: UIView!
  @IBOutlet weak var img5View: UIView!
  @IBOutlet weak var img6View: UIView!
  
  var localUserAudioMuted: Bool = false
  private var stage: IVSStage?
  private(set) var videoConfig = IVSLocalStageStreamVideoConfiguration()
  private let broadcastConfig = IVSPresets.configurations().standardPortrait()
  var localStreams: [IVSLocalStageStream] = []
  private var isCurrentUserViewer: Bool = false
  private var currentUserName:String = ""
  private var currentUserId:String=""
  private var currentUserRole:String="guest"
  private var currentUserPhoto:String=""
  var currentParticipantData:ParticipantData?
  var isCurrentUserHost:Bool = false
  var isChallenge:Bool = false
  //local users camera
  var selectedCamera: IVSDeviceDescriptor?
  var teamCombinedId: [Int] = []
  var reallyCoHost:Bool = false
  
  //local users microphone
  private var attachedMicrophone: IVSDevice? {
    didSet {
      if let mic = attachedMicrophone as? IVSMicrophone {
        mic.delegate = self
      }
    }
  }
  
  //saving all participant data
  private var participantsData: [ParticipantData] = [] {
    didSet {
      self.viewerCount.text = "\(self.participantsData.count)"
      if(self.participantsData.count == 0){
        if(self.onStreamEnded != nil){
          self.onStreamEnded!(["isPressed": true])
        }
      }
      self.checkForCoHost()
    }
  }
  
  private var displayData: [ParticipantData] = [] {
    didSet {
      self.collectionView.reloadData()
    }
  }
  
  //on end button pressed
  @objc public var streamEndPressed: NSString? {
    didSet {
      guard let streamEndPressed = self.streamEndPressed else {
        return
      }
      if(streamEndPressed as String == "true"){
        self.stage?.leave()
        self.participantsData = []
        self.collectionView.reloadData()
      }
    }
  }
  
  @objc public var muteUser : NSString? {
    didSet {
      guard let muteUser = self.muteUser else {
        return
      }
      if(muteUser as String == "unmute"){
        self.localUserAudioMuted = false
        self.addMicrophone()
      } else {
        self.localUserAudioMuted = true
        self.removeAllAudio()
      }
      self.stage?.refreshStrategy()
    }
  }
  
  func removeAllAudio() {
    let prevMicrophone = self.localStreams.first(where: { $0.device is IVSMicrophone })
    if(prevMicrophone != nil){
      if let index = self.localStreams.firstIndex(of: prevMicrophone!) {
        self.localStreams.remove(at: index)
        let newMic = self.localStreams.first(where: { $0.device is IVSMicrophone })
        if(prevMicrophone != nil){
          self.removeAllAudio()
        }
      }
    }
  }
  
  @objc public var flipCamera : NSString? {
    didSet {
      guard let flipCamera = self.flipCamera else {
        return
      }
      self.swapCamera()
    }
  }
  
  @objc public var nativeViewHeight : NSString? {
    didSet {
      guard let nativeViewHeight = self.nativeViewHeight else {
        return
      }
      self.collectionView.reloadData()
    }
  }
  
  @objc public var selectedChallengeUserId : NSString? {
    didSet {
      guard let selectedChallengeUserId = self.selectedChallengeUserId else {
        return
      }
      if(self.displayData.count == 0 || self.isChallenge){
        return
      }
      var hostIndex:Int? = nil;
      for i in 0...(self.displayData.count-1){
        if(self.displayData[i].id == selectedChallengeUserId as String){
          hostIndex = i;
        }
      }
      if(hostIndex != nil){
        self.rearrange(fromIndex: hostIndex!)
      }
    }
  }
  
  //data coming from react native screen
  @objc public var broadcastDetail:NSString? {
    didSet {
      guard let broadcastDetail = self.broadcastDetail else {
        return
      }
      self.startBroadcast(broadcastDetail:broadcastDetail)
    }
  }
  
  @objc public var isLiveChallenge:NSString? {
    didSet {
      guard let isLiveChallenge = self.isLiveChallenge else {
        return
      }
      self.isChallenge = Bool(isLiveChallenge as String) ?? false
      if(self.isChallenge){
        
        if(self.teamCombinedId.count == 0){
          return
        }
        
        self.relocateAccToTeam()

      }
      self.collectionView.reloadData()
      
    }
  }
  
  @objc public var teamIdForNative:NSString? {
    didSet {
      guard let teamIdForNative = self.teamIdForNative else {
        return
      }
      let numbersString = teamIdForNative.trimmingCharacters(in: CharacterSet(charactersIn: "[]"))
      let numberStrings = numbersString.components(separatedBy: ",")
      let numbers = numberStrings.compactMap({ Int($0) })
      self.teamCombinedId = numbers
    }
  }
  
  //callback function
  @objc var onStreamEnded: RCTDirectEventBlock?
  @objc var onParticipantAdded: RCTDirectEventBlock?
  @objc var onParticipantLeft: RCTDirectEventBlock?
  @objc var onUserGridSelected: RCTDirectEventBlock?
  @objc var onGridTapped: RCTDirectEventBlock?
  @objc var onLikePressed: RCTDirectEventBlock?
  
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
    Bundle.main.loadNibNamed("StreamView", owner: self)
    addSubview(contentView)
    contentView.frame = self.bounds
    contentView.autoresizingMask = [.flexibleHeight,.flexibleWidth]
    self.initCollectionView()
    
    self.versusView.layer.cornerRadius = 55
    self.teamOneView.layer.cornerRadius = 35
    self.teamTwoView.layer.cornerRadius = 35
    self.teamOneView.layer.maskedCorners = [.layerMinXMaxYCorner, .layerMinXMinYCorner]
    self.teamTwoView.layer.maskedCorners = [.layerMaxXMinYCorner, .layerMaxXMaxYCorner]
    self.collectionView.isScrollEnabled = false
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
    fatalError("init(coder:) has not been implemented")
  }
  
  func startBroadcast(broadcastDetail:NSString){
    switch AVCaptureDevice.authorizationStatus(for: .video) {
    case .authorized: self.continueData(broadcastDetail:broadcastDetail); break // permission already granted.
    case .notDetermined:
      AVCaptureDevice.requestAccess(for: .video) { granted in
        self.continueData(broadcastDetail:broadcastDetail);
       }
      break
    case .denied, .restricted:
      break// permission denied.
    @unknown default: // permissions unknown.
      break
    }
  }
  
  func continueData(broadcastDetail:NSString){
    let data = (broadcastDetail as String).toJSON() as? [String:AnyObject]
    self.currentUserId = data?["userId"] as! String
    self.currentUserName = data?["userName"] as! String
    self.currentUserRole = data?["userRole"] as! String
    self.currentUserPhoto = data?["photo"] as? String ?? ""
    if(data?["startBroadcast"] as! String == "true"){
      self.isCurrentUserViewer = false
      if(data?["isHost"] as! String == "true"){
        self.isCurrentUserHost = true
        self.joinStage(token: data?["token"] as! String,isViewer:false,name:currentUserName)
      } else if(data?["isViewer"] as! String == "true"){
        self.isCurrentUserViewer = true
        self.joinStage(token: data?["token"] as! String,isViewer:true,name:currentUserName)
      } else {
        self.joinStage(token: data?["token"] as! String,isViewer:false,name:currentUserName)
      }
    }
  }
  
  //mute unmute audio
  func toggleAudio(){
    if(self.localUserAudioMuted){
      self.localUserAudioMuted = false
      self.addMicrophone()
    } else {
      self.localUserAudioMuted = true
      self.removeAllAudio()
    }
    self.stage?.refreshStrategy()
  }
  
  func hasMicrophone(streams:[IVSStageStream])-> Bool {
    let prevMicrophone = streams.first(where: { $0.device is IVSMicrophone })
    if(prevMicrophone != nil){
      if let index = streams.firstIndex(of: prevMicrophone!) {
        return true
      }
    }
    return false
  }
  
  //swap camera functionality
  func swapCamera() {
    let prevCamera = self.localStreams.first(where: { $0.device is IVSImageDevice })
    if(prevCamera != nil){
      if let index = self.localStreams.firstIndex(of: prevCamera!) {
        self.localStreams.remove(at: index)
      }
    }
#if targetEnvironment(simulator)
    let devices: [Any] = []
#else
    let devices = IVSDeviceDiscovery().listLocalDevices()
#endif
    
    if let camera = devices
      .compactMap({ $0 as? IVSCamera })
      .first
    {
      
      if let cameraSource = camera.listAvailableInputSources().first(where: { $0.position == (selectedCamera?.position == .front ? .back : .front) }) {
        camera.setPreferredInputSource(cameraSource) { [weak self] in
          if let error = $0 {
            print("ℹ ❌ Error on setting preferred input source: \(error)")
          } else {
            self?.selectedCamera = cameraSource
          }
        }
      }
      
      self.localStreams.append(IVSLocalStageStream(device: camera))
    }
  }
  
  func rearrange(fromIndex: Int){
    let element = self.displayData.remove(at: fromIndex)
    self.displayData.insert(element, at: 0)
  }
  
  func addMicrophone(){
#if targetEnvironment(simulator)
    let devices: [Any] = []
#else
    let devices = IVSDeviceDiscovery().listLocalDevices()
#endif
    let microphone = devices.compactMap({ $0 as? IVSMicrophone }).first!
    microphone.isEchoCancellationEnabled = true
    self.localUserAudioMuted = false
    self.localStreams.append(IVSLocalStageStream(device: microphone))
  }
  
  //join video call
  func joinStage(token:String,isViewer:Bool,name:String){
    do {
      IVSSession.applicationAudioSessionStrategy = .playAndRecordDefaultToSpeaker
      IVSBroadcastSession.applicationAudioSessionStrategy = .playAndRecordDefaultToSpeaker
      let newStage = try IVSStage(token: token, strategy: self)
      newStage.addRenderer(self)
      newStage.errorDelegate = self
      
      if(!isViewer){
#if targetEnvironment(simulator)
        let devices: [Any] = []
#else
        let devices = IVSDeviceDiscovery().listLocalDevices()
#endif
        
        if let camera = devices
          .compactMap({ $0 as? IVSCamera })
          .first
        {
          
          if let cameraSource = camera.listAvailableInputSources().first(where: { $0.position == .front }) {
            camera.setPreferredInputSource(cameraSource) { [weak self] in
              if let error = $0 {
                print("ℹ ❌ Error on setting preferred input source: \(error)")
              } else {
                self?.selectedCamera = cameraSource
              }
            }
          }
          
          self.localStreams.append(IVSLocalStageStream(device: camera))
          
//          self.addMicrophone()
          
        }
        
        let localParticipant = ParticipantData(isLocal: true, info: nil, participantId: nil)
        localParticipant.username = name
        localParticipant.avatarUrl = ""
        localParticipant.id = self.currentUserId
        localParticipant.isHost = self.isCurrentUserHost
        localParticipant.viewerType = self.currentUserRole
        localParticipant.avatarUrl = self.currentUserPhoto
        self.participantsData.append(localParticipant)
        self.participantsData[0].streams = self.localStreams
      }
      try newStage.join()
      self.stage = newStage
      self.collectionView.reloadData()
    } catch let error as NSError {
      print(error,"setting up session")
    }
  }
  
  //reorder items in collection view
  func reorderItems(coordinator:UICollectionViewDropCoordinator,destinationIndexPath:IndexPath,collectionView:UICollectionView){
    if let item = coordinator.items.first,let sourceIndexPath = item.sourceIndexPath {
      collectionView.performBatchUpdates({
        let jsonData = self.participantsData[sourceIndexPath.item]
        self.participantsData.remove(at: sourceIndexPath.item)
        self.participantsData.insert(jsonData, at: destinationIndexPath.item)
        collectionView.deleteItems(at: [sourceIndexPath])
        collectionView.insertItems(at: [destinationIndexPath])
        
      },completion: nil)
      coordinator.drop(item.dragItem, toItemAt: destinationIndexPath)
    }
  }
  
  func mutatingParticipant(_ participantId: String?, modifier: (inout ParticipantData) -> Void) {
    guard let index = participantsData.firstIndex(where: { $0.participantId == participantId }) else {
//      fatalError("Something is out of sync, investigate")
      return
    }
    
    var participant = participantsData[index]
    modifier(&participant)
    participantsData[index] = participant
  }
  
  func relocateAccToTeam(){
    var newArray:[ParticipantData] = []
    for id in self.teamCombinedId {
      for item in self.displayData {
        if(item.id == "\(id)"){
          newArray.append(item)
        }
      }
    }
    if(newArray.count == self.displayData.count){
      self.displayData = newArray
      self.collectionView.reloadData()
    }
    
    self.teamImg1.layer.cornerRadius = 15
    self.teamImg2.layer.cornerRadius = 15
    self.teamImg3.layer.cornerRadius = 15
    self.teamImg4.layer.cornerRadius = 15
    self.teamImg5.layer.cornerRadius = 15
    self.teamImg6.layer.cornerRadius = 15
    if(self.displayData.count == 0){
      return
    }
    self.mainVSView.fadeIn()
    
  }
  
  func checkForCoHost(){
    var cohostArr:[ParticipantData] = []
    for index in 0..<self.participantsData.count {
      let item = self.participantsData[index]
      
      if(item.viewerType == "cohost"){
        reallyCoHost = true
        cohostArr.append(item)
      } else if(item.viewerType == "host"){
        cohostArr.append(item)
      }
    }
    if(reallyCoHost){
      self.displayData = cohostArr
    } else {
      self.displayData = self.participantsData
    }
  }
  
  func initCollectionView(){
    let nib = UINib(nibName: "CustomCell", bundle: nil)
    self.collectionView.register(nib, forCellWithReuseIdentifier: "CustomCell")
    self.collectionView.dataSource = self
    self.collectionView.delegate = self
  }
  
}

@available(iOS 14, *)
extension StreamView : IVSStageRenderer {
  @available(iOS 14, *)
  func stage(_ stage: IVSStage, didChange connectionState: IVSStageConnectionState, withError error: Error?) {
    if(connectionState == .disconnected){
      if(self.isChallenge){
        self.endedLabel.text = "Live challenge has ended! \n Redirecting..."
      } else {
        self.endedLabel.text = "Live stream has ended! \n Redirecting..."
      }
      self.streamEndedView.isHidden = false
    } else {
      self.streamEndedView.isHidden = true
    }
    print("ℹ didChangeConnectionStateWithError state '\(connectionState.rawValue)', error: \(String(describing: error))")
  }
  
  @available(iOS 14, *)
  func stage(_ stage: IVSStage, participantDidJoin participant: IVSParticipantInfo) {
    print("ℹ participant \(participant.participantId) did join")
    if participant.isLocal {
      if(participantsData.count == 0){
        return
      }
      if(self.onParticipantAdded != nil){
        self.onParticipantAdded!(["userId":self.currentUserId,"userName":self.currentUserName,"userRole":self.currentUserRole,"userPhoto":self.currentUserPhoto])
      }
      participantsData[0].participantId = participant.participantId
      participantsData[0].info = participant
    } else {
      participantsData.append(ParticipantData(isLocal: false, info: participant, participantId: participant.participantId))
      let role = participant.attributes["userRole"] ?? "guest"
      self.onParticipantAdded!(["userId":participant.attributes["userId"] ?? "","userName":participant.attributes["userName"] ?? "","userRole":role,"userPhoto":participant.attributes["photo"] ?? ""])
    }
  }
  
  func stage(_ stage: IVSStage, participantDidLeave participant: IVSParticipantInfo) {
    print("ℹ participant \(participant.participantId) did leave")
    self.onParticipantLeft!(["userId":participant.attributes["userId"] ?? "","userName":participant.attributes["userName"] ?? "","userRole":participant.attributes["userRole"] ?? "guest","userPhoto":participant.attributes["photo"] ?? ""])
    if let index = participantsData.firstIndex(where: { $0.participantId == participant.participantId }) {
      participantsData.remove(at: index)
    }
  }
  
  func stage(_ stage: IVSStage, participant: IVSParticipantInfo, didChange publishState: IVSParticipantPublishState) {
    
  }
  
  func stage(_ stage: IVSStage, participant: IVSParticipantInfo, didChange subscribeState: IVSParticipantSubscribeState) {
    
  }
  
  func stage(_ stage: IVSStage, participant: IVSParticipantInfo, didAdd streams: [IVSStageStream]) {
    print("ℹ participant \(participant.participantId) didAdd \(streams.count) streams")
    mutatingParticipant(participant.participantId) { data in
      data.streams.append(contentsOf: streams)
    }
  }
  
  func stage(_ stage: IVSStage, participant: IVSParticipantInfo, didRemove streams: [IVSStageStream]) {
    print("ℹ participant \(participant.participantId) didRemove \(streams.count) streams")
  }
  
  func stage(_ stage: IVSStage, participant: IVSParticipantInfo, didChangeMutedStreams streams: [IVSStageStream]) {
    print("ℹ participant \(participant.participantId) didChangeMutedStreams")
    
    for stream in streams {
      print("ℹ is muted: \(stream.isMuted)")
      mutatingParticipant(participant.participantId) { data in
        if let index = data.streams.firstIndex(of: stream) {
          data.streams[index] = stream
        }
      }
    }
  }
  
  
}

@available(iOS 14, *)
extension StreamView : IVSStageStrategy {
  func stage(_ stage: IVSStage, streamsToPublishForParticipant participant: IVSParticipantInfo) -> [IVSLocalStageStream] {
    return localStreams
  }
  
  func stage(_ stage: IVSStage, shouldPublishParticipant participant: IVSParticipantInfo) -> Bool {
    return true
  }
  
  func stage(_ stage: IVSStage, shouldSubscribeToParticipant participant: IVSParticipantInfo) -> IVSStageSubscribeType {
    return .audioVideo
  }
  
  
}

@available(iOS 14, *)
extension StreamView : UICollectionViewDragDelegate,UICollectionViewDropDelegate {
  func collectionView(_ collectionView: UICollectionView, performDropWith coordinator: UICollectionViewDropCoordinator) {
    
    var destinationIndexPath:IndexPath
    if let indexPath = coordinator.destinationIndexPath {
      destinationIndexPath = indexPath
    } else {
      let row = collectionView.numberOfItems(inSection: 0)
      destinationIndexPath = IndexPath(item: row - 1, section: 0)
    }
    
    if(coordinator.proposal.operation == .move){
      self.reorderItems(coordinator:coordinator,destinationIndexPath:destinationIndexPath,collectionView:collectionView)
    }
    
  }
  
  func collectionView(_ collectionView: UICollectionView, dropSessionDidUpdate session: UIDropSession, withDestinationIndexPath destinationIndexPath: IndexPath?) -> UICollectionViewDropProposal {
    if(collectionView.hasActiveDrag){
      return UICollectionViewDropProposal(operation: .move, intent: .insertAtDestinationIndexPath)
    }
    return UICollectionViewDropProposal(operation: .forbidden)
  }
  
  
  func collectionView(_ collectionView: UICollectionView, itemsForBeginning session: UIDragSession, at indexPath: IndexPath) -> [UIDragItem] {
    let item = "\(self.participantsData[indexPath.item])"
    let itemProvider = NSItemProvider.init(object: item as NSString)
    let dragItem = UIDragItem(itemProvider: itemProvider)
    dragItem.localObject = item
    return [dragItem]
  }
  
}


@available(iOS 14, *)
extension StreamView : UICollectionViewDataSource, UICollectionViewDelegate , UICollectionViewDelegateFlowLayout {
  func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
    if(displayData.count == 2){
      self.teamImg1.sd_setImage(with: URL(string: self.displayData[0].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg4.sd_setImage(with: URL(string: self.displayData[1].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg1.isHidden = false
      self.teamImg4.isHidden = false
      self.teamImg2.isHidden = true
      self.teamImg3.isHidden = true
      self.teamImg5.isHidden = true
      self.teamImg6.isHidden = true
      self.img1View.isHidden = false
      self.img4View.isHidden = false
      self.img2View.isHidden = true
      self.img3View.isHidden = true
      self.img5View.isHidden = true
      self.img6View.isHidden = true
    } else if(displayData.count == 4){
      self.teamImg1.sd_setImage(with: URL(string: self.displayData[0].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg2.sd_setImage(with: URL(string: self.displayData[1].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg4.sd_setImage(with: URL(string: self.displayData[2].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg5.sd_setImage(with: URL(string: self.displayData[3].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg1.isHidden = false
      self.teamImg4.isHidden = false
      self.teamImg2.isHidden = false
      self.teamImg5.isHidden = false
      self.teamImg3.isHidden = true
      self.teamImg6.isHidden = true
      
      self.img1View.isHidden = false
      self.img4View.isHidden = false
      self.img2View.isHidden = false
      self.img5View.isHidden = false
      self.img3View.isHidden = true
      self.img6View.isHidden = true
    } else if(displayData.count == 6){
      self.teamImg1.sd_setImage(with: URL(string: self.displayData[0].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg2.sd_setImage(with: URL(string: self.displayData[1].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg3.sd_setImage(with: URL(string: self.displayData[2].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg4.sd_setImage(with: URL(string: self.displayData[3].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg5.sd_setImage(with: URL(string: self.displayData[4].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg6.sd_setImage(with: URL(string: self.displayData[5].avatarUrl), placeholderImage: UIImage(named: "avatar"))
      self.teamImg1.isHidden = false
      self.teamImg4.isHidden = false
      self.teamImg2.isHidden = false
      self.teamImg5.isHidden = false
      self.teamImg3.isHidden = false
      self.teamImg6.isHidden = false
      
      self.img1View.isHidden = false
      self.img4View.isHidden = false
      self.img2View.isHidden = false
      self.img5View.isHidden = false
      self.img3View.isHidden = false
      self.img6View.isHidden = false
    }
    
    
    if(self.displayData.count > 1 && !self.isChallenge){
      if(self.displayData[0].isHost == false){
        var hostIndex:Int? = nil;
        for i in 0...(self.displayData.count-1){
          if(self.displayData[i].isHost){
            hostIndex = i;
          }
        }
        if(hostIndex != nil){
          self.rearrange(fromIndex: hostIndex!)
        }
      }
    }
    return displayData.count
  }
  
  func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
    let screenWidth = self.collectionView.bounds.width
    let screenHeight = self.collectionView.bounds.height
    let count = ceil(Double(Double(displayData.count)/2))
    if(self.displayData.count == 1){
      return CGSizeMake(screenWidth, screenHeight)
    } else if(self.displayData.count == 2){
      return CGSizeMake(screenWidth/2, screenHeight)
    }
    
    if(self.reallyCoHost){
      if((self.displayData.count%2) == 0){
      return CGSizeMake(screenWidth/2, screenHeight/count)
      } else {
        if(indexPath.item == (self.displayData.count - 1)){
          return CGSizeMake(screenWidth/2, (screenHeight/count)*2)
        } else {
          return CGSizeMake(screenWidth/2, screenHeight/count)
        }
      }
    } else {
      if(indexPath.item == 0){
        return CGSizeMake(screenWidth/2, screenHeight)
      } else {
        if(self.displayData.count == 3){
          return CGSizeMake(screenWidth/2, screenHeight/count)
        } else {
          let participantCount = displayData.count
          let newCount =  ceil(Double(Double(participantCount-1)/2))
          return CGSizeMake(screenWidth/4, ((screenHeight-5)/newCount))
        }
      }
    }
  }
//   func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
//     let screenWidth = self.collectionView.bounds.width
//     let screenHeight = self.collectionView.bounds.height
//     let totalUsers = self.displayData.count

//     if totalUsers == 1 {
//         return CGSize(width: screenWidth, height: screenHeight)
//     }

//     if totalUsers % 2 == 0 {
//         // For 2, 4, 6 users — evenly spaced grid
//         let rows = CGFloat(totalUsers / 2)
//         return CGSize(width: screenWidth / 2, height: screenHeight / rows)
//     } else {
//         // Odd count ≥ 3: last user takes full height in right column
//         let rows = CGFloat(totalUsers / 2)
//         if indexPath.item == totalUsers - 1 {
//             // Last item
//             return CGSize(width: screenWidth / 2, height: screenHeight)
//         } else {
//             // Left column stack
//             return CGSize(width: screenWidth / 2, height: screenHeight / rows)
//         }
//     }
// }

  
  func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
    guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CustomCell", for: indexPath) as? CustomCell else {
      fatalError("can't dequeue CustomCell")
    }
    
    cell.activityIndicator.color = .white
    cell.activityIndicator.startAnimating()
    let userName = displayData[indexPath.item].username
    cell.userName.text = userName
    cell.userName.isHidden = userName == "" ? true : false
    
    cell.userImage.layer.cornerRadius = 10
    cell.userImage.sd_setImage(with: URL(string: self.displayData[indexPath.item].avatarUrl), placeholderImage: UIImage(named: "avatar"))
    
    if(self.localUserAudioMuted){
      cell.micImage.image = UIImage(named: "icon_mic_off")
    } else {
      cell.micImage.image = UIImage(named: "icon_mic_on")
    }
    
    if(self.displayData[indexPath.item].isLocal){
      cell.activityIndicator.isHidden = true
    }
    
    if(self.displayData[indexPath.item].isLocal && self.displayData.count != 1 && self.isCurrentUserViewer == false){
      cell.micView.isHidden = false
      cell.swapView.isHidden = false
    } else {
      cell.micView.isHidden = true
      cell.swapView.isHidden = true
    }
    
    if(self.displayData[indexPath.item].isLocal && (self.currentUserRole == "cohost" || self.currentUserRole == "host")){
      cell.micView.isHidden = true
      cell.swapView.isHidden = true
    }
    
    if(indexPath.item == 0 && !self.isChallenge && !self.reallyCoHost){
      cell.micView.isHidden = true
      cell.swapView.isHidden = true
      cell.userImage.isHidden = true
      cell.userName.isHidden = true
      cell.hostLabel.isHidden = false
    } else {
      cell.userImage.isHidden = false
      cell.userName.isHidden = false
      cell.hostLabel.isHidden = true
    }
    
    if(self.displayData.count == 1){
      cell.userName.isHidden = true
      cell.userImage.isHidden = true
      cell.hostLabel.isHidden = true
    }
    
    let imageDevice = displayData[indexPath.item].streams.lazy.compactMap { $0.device as? IVSImageDevice }.first
    if let preview = try? (imageDevice)?.previewView(with: .fill) {
      attachCameraPreview(container: cell.previewView, preview: preview)
      cell.activityIndicator.stopAnimating()
      cell.activityIndicator.isHidden = true
    } else {
      cell.previewView.subviews.forEach { $0.removeFromSuperview() }
    }
    
    cell.swapCamera = {
      self.swapCamera()
    }
    
    cell.toggleMic = {
      if(cell.micImage.image == UIImage(named: "icon_mic_on")){
        cell.micImage.image = UIImage(named: "icon_mic_off")
      } else {
        cell.micImage.image = UIImage(named: "icon_mic_on")
      }
      self.toggleAudio()
    }
    
    cell.selectGrid = {
      if(self.isCurrentUserViewer && (self.displayData[indexPath.item].viewerType == "cohost" || self.displayData[indexPath.item].viewerType == "host") && self.displayData.count != 1){
        self.onGridTapped!(["userId":self.displayData[indexPath.item].id])
      }
    }
    
    cell.likedFunc = {
      if(!self.displayData[indexPath.item].isLocal){
        self.onLikePressed!(["userId":self.displayData[indexPath.item].id])
      }
    }
    
    return cell
  }
  
}


extension UIView {
  
  func fadeIn(_ duration: TimeInterval = 2, delay: TimeInterval = 0.0, completion: @escaping ((Bool) -> Void) = {(finished: Bool) -> Void in}) {
    UIView.animate(withDuration: duration, delay: delay, options: UIView.AnimationOptions.curveEaseIn, animations: {
      self.alpha = 1.0
    }, completion: {_ in
      self.fadeOut()
    })  }
  
  func fadeOut(_ duration: TimeInterval = 2, delay: TimeInterval = 1.0, completion: @escaping (Bool) -> Void = {(finished: Bool) -> Void in}) {
    UIView.animate(withDuration: duration, delay: delay, options: UIView.AnimationOptions.curveEaseIn, animations: {
      self.alpha = 0.0
    }, completion: completion)
  }
}
