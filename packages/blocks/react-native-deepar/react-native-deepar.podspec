require "json"

Pod::Spec.new do |s|
  s.name = "react-native-deepar"
  s.version =  "0.11.0"
  s.summary = "DeepAR wrapper for React-Native"
  s.homepage ="https://github.com/ridvanaltun/react-native-deepar#readme"
  s.license = "MIT"
  s.authors = "Rıdvan Altun <ridvanaltun@outlook.com> (https://github.com/ridvanaltun)"

  s.platforms = { :ios => "11.0" }
  s.source = { :git => "https://github.com/ridvanaltun/react-native-deepar.git", :tag => "#{s.version}" }

  # s.pod_target_xcconfig = { 'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'i386 arm64' }

  s.source_files = "ios/**/*.{h,m,mm}"
  s.vendored_frameworks = "ios/Frameworks/*.xcframework"

  s.dependency "React-Core"
end
