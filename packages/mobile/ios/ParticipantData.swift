//
//  ParticipantData.swift
//  Xtok
//
//  Created by developer on 08/08/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

import Foundation
import AmazonIVSBroadcast

@available(iOS 14, *)
class ParticipantData: Identifiable, ObservableObject {
    var id: String = ""
    let isLocal: Bool
    var participantId: String?
    var username: String = ""
    var avatarUrl: String = ""
    var isHost: Bool = false
    var viewerType:String="guest"

    @Published var info: IVSParticipantInfo?
    @Published var publishState: IVSParticipantPublishState = .notPublished
    @Published var streams: [IVSStageStream] = [] {
        didSet {
            videoMuted = streams.first(where: { $0.device is IVSImageDevice })?.isMuted ?? false
            audioMuted = streams.first(where: { $0.device is IVSAudioDevice })?.isMuted ?? false
        }
    }
  
    @Published var wantsAudioOnly = false
    @Published var requiresAudioOnly = false
    var isAudioOnly: Bool {
        return wantsAudioOnly || requiresAudioOnly
    }

    @Published var wantsSubscribed = true
    @Published var wantsBroadcast = true
    @Published var videoMuted = false
    @Published var audioMuted = false

    var broadcastSlotName: String {
        if isLocal {
            return "localUser"
        } else {
            guard let participantId = participantId else {
                fatalError("non-local participants must have a participantId")
            }
            return "participant-\(participantId)"
        }
    }

    private var imageDevice: IVSImageDevice? {
        return streams.lazy.compactMap { $0.device as? IVSImageDevice }.first
    }

  init(isLocal: Bool, info: IVSParticipantInfo?, participantId: String?) {
        self.isLocal = isLocal
        self.participantId = participantId
        self.info = info
        if !isLocal {
            self.username = info?.attributes["userName"] as? String ?? UUID().uuidString
            self.id = info?.attributes["userId"] as? String ?? ""
            self.isHost = Bool(info?.attributes["isHost"] as? String ?? "false") ?? false
            self.viewerType = info?.attributes["userRole"] as? String ?? "guest"
            self.avatarUrl = info?.attributes["photo"] as? String ?? ""
        }
    }

    func toggleAudioMute() {
        audioMuted = !audioMuted
        streams
            .compactMap({ $0.device as? IVSAudioDevice })
            .first?
            .setGain(audioMuted ? 0 : 1)
    }

    func toggleVideoMute() {
        videoMuted = !videoMuted
        wantsBroadcast = !videoMuted
    }

    func mutatingStreams(_ stream: IVSStageStream?, modifier: (inout IVSStageStream) -> Void) {
        guard let index = streams.firstIndex(where: { $0.device.descriptor().urn == stream?.device.descriptor().urn }) else {
            fatalError("Something is out of sync, investigate")
        }

        var stream = streams[index]
        modifier(&stream)
        streams[index] = stream
    }
}

