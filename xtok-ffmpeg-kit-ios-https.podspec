require "json"

Pod::Spec.new do |s|
  s.name         = "xtok-ffmpeg-kit-ios-https"
  s.version      = "6.0.2"
  s.summary      = "FFmpeg Kit iOS Https Shared Framework"
  s.description  = "Includes FFmpeg with gmp and gnutls libraries enabled."
  s.homepage     = "https://github.com/Kumar2971/Xtok"
  s.license      = { :type => "LGPL-3.0", :file => "ffmpegkit.xcframework/ios-arm64/ffmpegkit.framework/LICENSE" }
  s.authors      = "xtok"

  s.platform          = :ios
  s.ios.deployment_target = "12.1"
  s.requires_arc      = true
  s.static_framework  = true

  s.source        = { :git => 'https://github.com/Kumar2971/Xtok.git', :tag => s.version.to_s }

  s.libraries = [
    "z",
    "bz2",
    "c++",
    "iconv"
  ]

  s.frameworks = [
    "AudioToolbox",
    "AVFoundation",
    "CoreMedia",
    "VideoToolbox"
  ]
  s.vendored_frameworks = [
    "xtok-ffmpeg-kit-ios-https/ffmpegkit.xcframework",
    "xtok-ffmpeg-kit-ios-https/libavcodec.xcframework",
    "xtok-ffmpeg-kit-ios-https/libavdevice.xcframework",
    "xtok-ffmpeg-kit-ios-https/libavfilter.xcframework",
    "xtok-ffmpeg-kit-ios-https/libavformat.xcframework",
    "xtok-ffmpeg-kit-ios-https/libavutil.xcframework",
    "xtok-ffmpeg-kit-ios-https/libswresample.xcframework",
    "xtok-ffmpeg-kit-ios-https/libswscale.xcframework",
  ]
end