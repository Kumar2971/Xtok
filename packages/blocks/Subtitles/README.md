## Building Blocks React Native Mobile -  Subtitles

Building Blocks - React Native Master App - Subtitles

## Getting Started

:warning: In order to add this block to your project, some extra changes might be needed if your project's intial build before October 2022. These are outlined in the installing section of this README. :warning:
### Prerequisites

### Git Structure

### Installing

Some native changes are required when using this block. Please ensure your project have the following code to enable this block to work properly. Inside the `src` folder:

In `packages/mobile/android/app/build.gradle`, inside the `dependencies` block, add:
```
implementation project(':@react-native-voice_voice')
```

In `packages/mobile/android/settings.gradle`, at the bottom of the file, add:

```
include ':@react-native-voice_voice'
project(':@react-native-voice_voice').projectDir = new File(rootProject.projectDir, '../../../node_modules/@react-native-voice/voice/android')
```

In `packages/mobile/ios/Podfile`, follow the pattern of how other pods are added and add:

```
pod 'react-native-voice', :path => '../../../node_modules/@react-native-voice/voice'
```

In `packages/mobile/package.json`, in the `dependencies` block, add:

```
"@react-native-voice/voice": "file:../blocks/core/node_modules/@react-native-voice/voice",
"react-native-live-audio-stream": "file:../blocks/core/node_modules/react-native-live-audio-stream",
```

In `package.json`, in the `dependencies` block:
```

"socket.io-client": "file:./packages/blocks/core/node_modules/socket.io-client",
"socket.io": "file:./packages/blocks/core/node_modules/socket.io",
```

## Running the tests

## CI/CD Details

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).