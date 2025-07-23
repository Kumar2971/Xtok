/* App/Lib/GeneralHelpers.js */
import { Platform } from 'react-native';
let config = require('./config')
export function getOS(): string {
  return Platform.OS;
}

export function returnS3URL():string{
  if(config.baseURL ==='https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe'){
    return "https://minio.b255799.dev.eastus.az.svc.builder.cafe"
  }
  else {
    return "https://minio.b255799.stage.eastus.az.svc.builder.ai"
  }

}