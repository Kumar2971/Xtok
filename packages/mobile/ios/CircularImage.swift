//
//  CircularImage.swift
//  Xtok
//
//  Created by developer on 10/17/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

import UIKit

@IBDesignable
final class CircularImage: UIImageView {

  @IBInspectable
  var cornerRadius: CGFloat {
      set {
        self.layer.cornerRadius = 50
      }
      get {
        return self.layer.cornerRadius
      }
  }
}
