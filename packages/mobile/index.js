// index.js - MOBILE
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import { register } from '@videosdk.live/react-native-sdk';
import {App} from './App';

const snapshots = false;
register()
if(snapshots){
  require('./indexSnapshot');
}
else {
  AppRegistry.registerComponent(appName, () => App);
}
