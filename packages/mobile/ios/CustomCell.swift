//
//  CustomCell.swift
//  Xtok
//
//  Created by developer on 08/08/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

import UIKit
import AmazonIVSBroadcast

class CustomCell: UICollectionViewCell {
  @IBOutlet weak var previewView: IVSImagePreviewView!
  @IBOutlet weak var micImage: UIImageView!
  @IBOutlet weak var micView: UIView!
  @IBOutlet weak var swapView: UIView!
  @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
  @IBOutlet weak var userName: UILabel!
  @IBOutlet weak var userImage: UIImageView!
  @IBOutlet weak var hostLabel: UILabel!
  
  var swapCamera: (() -> Void)?
  var toggleMic: (() -> Void)?
  var selectGrid: (() -> Void)?
  var likedFunc: (() -> Void)?
  
    override func awakeFromNib() {
        super.awakeFromNib()
      // Initialization code
      let tap = UITapGestureRecognizer(target: self, action: #selector(singleTapped))
      tap.numberOfTapsRequired = 1
      self.previewView.addGestureRecognizer(tap)
      
      let doubletap = UITapGestureRecognizer(target: self, action: #selector(doubleTapped))
      doubletap.numberOfTapsRequired = 2
      self.previewView.addGestureRecognizer(doubletap)
      
      tap.require(toFail: doubletap)
      tap.delaysTouchesBegan = true
      doubletap.delaysTouchesBegan = true
    }
  
  @IBAction func toggleMicAction(_ sender: Any) {
    if let toggleMic = self.toggleMic {
      self.toggleMic?()
    }
  }
  
  @IBAction func swapAction(_ sender: Any) {
    if let swapCamera = self.swapCamera {
      self.swapCamera?()
    }
  }
  
  @objc func doubleTapped() {
    if let likedFunc = self.likedFunc {
      self.likedFunc?()
    }
  }
  
  @objc func singleTapped() {
    if let selectGrid = self.selectGrid {
      self.selectGrid?()
    }
  }
}

