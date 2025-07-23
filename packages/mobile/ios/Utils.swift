//
//  Utils.swift
//  Xtok
//
//  Created by developer on 08/08/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

import AVFoundation
import Foundation
import UIKit

func checkAVPermissions(_ result: @escaping (Bool) -> Void) {
    checkOrGetPermission(for: .video) { granted in
        guard granted else {
            result(false)
            return
        }
        checkOrGetPermission(for: .audio) { granted in
            guard granted else {
                result(false)
                return
            }
            result(true)
        }
    }
}

func checkOrGetPermission(for mediaType: AVMediaType, _ result: @escaping (Bool) -> Void) {
    func mainThreadResult(_ success: Bool) {
        DispatchQueue.main.async { result(success) }
    }
    switch AVCaptureDevice.authorizationStatus(for: mediaType) {
    case .authorized: mainThreadResult(true)
    case .notDetermined: AVCaptureDevice.requestAccess(for: mediaType) { mainThreadResult($0) }
    case .denied, .restricted: mainThreadResult(false)
    @unknown default: mainThreadResult(false)
    }
}

func attachCameraPreview(container: UIView, preview: UIView) {
    container.subviews.forEach { $0.removeFromSuperview() }
    preview.translatesAutoresizingMaskIntoConstraints = false
    container.addSubview(preview)
    NSLayoutConstraint.activate([
        preview.topAnchor.constraint(equalTo: container.topAnchor, constant: 0),
        preview.bottomAnchor.constraint(equalTo: container.bottomAnchor, constant: 0),
        preview.leadingAnchor.constraint(equalTo: container.leadingAnchor, constant: 0),
        preview.trailingAnchor.constraint(equalTo: container.trailingAnchor, constant: 0),
    ])
}

extension String {
    func toJSON() -> Any? {
        guard let data = self.data(using: .utf8, allowLossyConversion: false) else { return nil }
        return try? JSONSerialization.jsonObject(with: data, options: .mutableContainers)
    }
}


