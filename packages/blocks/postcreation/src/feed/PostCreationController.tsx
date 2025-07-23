import PostCreationCommonController from './PostCreationCommonController'

// Customizable Area Start
import ImagePicker from "react-native-image-crop-picker";
import { getStorageData } from "../../../../framework/src/Utilities";
import { Alert } from 'react-native';
// Customizable Area End

export const configJSON = require("./config");

export default class PostCreationController extends PostCreationCommonController {
  // Customizable Area Start
  // Customizable Area End

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    const language = await getStorageData("SelectedLng");

    this.setState({
       mediadetails:this.props.route?.params?.mediadetails,
       language:language
    })

if(this.props.route?.params?.description){
  this.setState({caption:this.props.route?.params?.description ?? ''})
}

   if(this.props.route?.params?.poster ?? ''){
  this.setState({resultPoster:this.props.route?.params?.poster ?? ''})
   }

   if(this.props.route?.params?.bucketdetails){
    this.setState({bucketDetails:this.props.route?.params?.bucketdetails})
   }

   if(this.props.route?.params?.audioData){
    this.setState({audioData:this.props.route?.params?.audioData});
   }

    // Customizable Area End
  }
  // Customizable Area Start

  chooseImage = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "photo",
      compressImageQuality: 0.3,
      includeBase64: true,
      cropping: true,
    }).then(async (image:any) => {
      let filename = image.path.substring(
        image.path.lastIndexOf("/") + 1,
        image.path.length
      );
      this.setState({
        image: image.sourceURL,
        profileImageData: {
          data: image.data,
          filename: filename,
          content_type: image.mime
        }
      });
    });
  };
  // Customizable Area End
}
