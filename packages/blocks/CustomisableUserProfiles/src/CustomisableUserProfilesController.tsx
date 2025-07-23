import { BlockComponent } from '../../../framework/src/BlockComponent';
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import MessageEnum, {
  getName,
} from '../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../framework/src/RunEngine';

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from './assets';
import ImagePicker from 'react-native-image-crop-picker';
import { Linking } from 'react-native';
import { getStorageData } from '../../../framework/src/Utilities';
import AWS from "aws-sdk";
import RNFS from 'react-native-fs';
import { decode } from "base64-arraybuffer";
// Customizable Area End

export const configJSON = require('./config');

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  address: string;
  country: ICountry | null;

  countryOpen: boolean;
  postalCode: string;
  photo: string;
  profileRole: string;
  aboutMe: string;
  gender: string;
  username: string;
  dob: string;
  currentPassword: string;
  newPassword: string;
  reNewPassword: string;
  instagram: string;
  facebook: string;
  qrCode: string;
  profileId: string;
  imageModalVisible: boolean;

  data: any[];
  passwordHelperText: String;
  enablePasswordField: boolean;
  enableReTypePasswordField: boolean;
  enableNewPasswordField: boolean;

  edtEmailEnabled: boolean;
  llDoChangePwdContainerVisible: boolean;
  llChangePwdDummyShowContainerVisible: boolean;
  isDatePickerVisible: boolean;

  currentPasswordText: any;
  newPasswordText: any;
  reTypePasswordText: any;

  edtMobileNoEnabled: boolean;
  countryCodeEnabled: boolean;

  saveButtonDisable: boolean;
  attributes: any;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
interface IGender {
  label: string;
  value: string;
}


interface ICountry {
  country_ISO_code: string;
  country_code: string;
  country_flag: string;
  country_name: string;
}
// Customizable Area End

export default class CustomisableUserProfilesController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  labelFirstName: string;
  lastName: string;
  labelCountry: string;
  labelCity: string;
  labelAddress: string;
  labelPostalCode: string;
  labelProfilePhoto: string;
  labelProfileRole: string;
  labelFullName: string;
  labelAboutMe: string;
  labelGender: string;
  labelUsername: string;
  labelDob: string;
  labelCurrentPassword: string;
  labelNewPassword: string;
  labelRePassword: string;
  labelInstagram: string;
  labelFacebook: string;
  labelQrCode: string;

  labelMobile: string;
  labelEmail: string;

  btnTextCancelPasswordChange: string;
  btnTextSaveChanges: string;
  labelHeader: any;
  btnTextChangePassword: string;

  arrayholder: any[];
  passwordReg: RegExp;
  emailReg: RegExp;
  apiCallMessageUpdateProfileRequestId: any;
  validationApiCallId: string = '';
  apiChangePhoneValidation: any;
  registrationAndLoginType: string = '';
  authToken: any;
  uniqueSessionRequesterId: any;
  userProfileGetApiCallId: any;
  getAttributesID: any;
  userAttr: any;

  genderList: IGender[];

  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: '',
      txtSavedValue: 'A',
      enableField: false,
      // Customizable Area Start
      firstName: '',
      lastName: '',
      fullName: '',
      email: '',
      country: null,
      city: '',
      address: '',
      postalCode: '',
      photo: '',
      profileRole: 'jobseeker',
      aboutMe: '',
      gender: '',
      username: '',
      dob: '',
      currentPassword: '',
      newPassword: '',
      reNewPassword: '',
      instagram: '',
      facebook: '',
      qrCode: '',
      profileId: '',
      countryOpen: false,
      imageModalVisible: false,
      phoneNumber: '',
      data: [],
      passwordHelperText: '',
      enablePasswordField: true,
      enableReTypePasswordField: true,
      enableNewPasswordField: true,

      edtEmailEnabled: true,
      llDoChangePwdContainerVisible: false,
      llChangePwdDummyShowContainerVisible: false,
      isDatePickerVisible: false,

      currentPasswordText: '',
      newPasswordText: '',
      reTypePasswordText: '',

      edtMobileNoEnabled: true,
      countryCodeEnabled: true,
      saveButtonDisable: false,
      attributes: []
      // Customizable Area End
    };

    this.arrayholder = [];

    this.passwordReg = new RegExp('\\w+');
    this.emailReg = new RegExp('\\w+');

    this.labelFirstName = configJSON.labelFirstName;
    this.lastName = configJSON.lastName;
    this.labelFullName = configJSON.labelFullName;
    this.labelCountry = configJSON.labelCountry;
    this.labelCity = configJSON.labelCity;
    this.labelAddress = configJSON.labelAddress;
    this.labelMobile = configJSON.labelMobile;
    this.labelPostalCode = configJSON.labelPostalCode;
    this.labelProfilePhoto = configJSON.labelProfilePhoto;
    this.labelProfileRole = configJSON.labelProfileRole;
    this.labelAboutMe = configJSON.labelAboutMe;
    this.labelGender = configJSON.labelGender;
    this.labelUsername = configJSON.labelUsername;
    this.labelDob = configJSON.labelDob;
    this.labelCurrentPassword = configJSON.labelCurrentPassword;
    this.labelNewPassword = configJSON.labelNewPassword;
    this.labelRePassword = configJSON.labelRePassword;
    this.labelInstagram = configJSON.labelInstagram;
    this.labelFacebook = configJSON.labelFacebook;
    this.labelQrCode = configJSON.labelQrCode;

    this.labelEmail = configJSON.labelEmail;
    this.btnTextCancelPasswordChange = configJSON.btnTextCancelPasswordChange;
    this.btnTextSaveChanges = configJSON.btnTextSaveChanges;
    this.labelHeader = configJSON.labelHeader;
    this.btnTextChangePassword = configJSON.btnTextChangePassword;
    this.genderList = [
      {
        label: configJSON.labelMale,
        value: configJSON.maleValue,
      },
      {
        label: configJSON.labelFemale,
        value: configJSON.femaleValue,
      },
    ];

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  updateProfileAccountID: string = '';
  updateProfileDetailsID: string = '';
  getProfileAccountID: string = '';

  async receive(from: string, message: Message) {
    runEngine.debugLog('Message Recived', message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        'Change Value',
        'From: ' + this.state.txtSavedValue + ' To: ' + value
      );

      this.setState({ txtSavedValue: value });
    }


    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      if (apiRequestCallId === this.updateProfileAccountID) {
        this.updateProfileAccountApiCall(responseJson, errorResponse)
      }

      if (apiRequestCallId === this.getAttributesID) {
        this.getAttributesApiCall(responseJson, errorResponse)
      }

      if (apiRequestCallId === this.getProfileAccountID) {
        this.getProfileAccountApiCall(responseJson, errorResponse)
      }
    }
  }

  async getLocalUserData() {
    const storageData = (await getStorageData('profileData', true)) || '';
    return storageData;
  }

  handleOpenCountryPicker = () => {
    this.setState({ countryOpen: true });
  };

  handleOpenCountryPickerClose = () => {
    this.setState({ countryOpen: false });
  };

  handleCountryChange = (country: any) => {
    this.setState({ country: country });
  };

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: 'email',
    keyboardType: 'email-address',
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  toggleDateVisibility = (value: boolean) => {
    this.setState({ isDatePickerVisible: value });
  };

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  handleOpenImageModal = () => {
    this.setState({ imageModalVisible: true });
  }
  handleCloseImageModal = () => {
    this.setState({ imageModalVisible: false });
  }

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  handleChangeGender = (value: string) => {
    this.setState((prevState) => ({
      ...prevState,
      gender: value,
    }));
  };

  chooseImage = (property: 'photo' | 'qrcode') => {
    const options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      compressImageQuality: 0.3,
      includeBase64: true,
      cropping: true,
    }).then(async (image: any) => {
      this.uploadPost([image])
        .then((res) => {
          switch (property) {
            case 'photo':
              this.setState({
                photo: res.Location,
              });
              break;
            case 'qrcode':
              this.setState({
                qrCode: res.Location,
              });
              break;

            default:
              break;
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    });
  };

  uploadPost = async (mediadetails: any) => {
    let s3 = new AWS.S3({
      accessKeyId: 'hello',
      secretAccessKey: 'builderai',
      endpoint: 'https://minio.b255799.stage.eastus.az.svc.builder.ai/minio/',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });

    let contentType = mediadetails[0].mime;
    let contentDeposition = 'inline;filename="' + mediadetails[0].path + '"';
    const base64 = await RNFS.readFile(mediadetails[0].path, 'base64');
    const arrayBuffer = decode(base64);
    let randrom_str = '',
      i = 0,
      min = 0,
      max = 62;
    for (; i++ < 12;) {
      let r = (Math.random() * (max - min) + min) << 0;
      randrom_str += String.fromCharCode(
        (r += r > 9 ? (r < 36 ? 55 : 61) : 48)
      );
    }

    let filename =
      randrom_str +
      mediadetails[0].path
        .split('/')
        .pop()
        .split('?')[0]
        .split('#')[0];

    const params = {
      Bucket: 'sbucket',
      Key: filename,
      Body: arrayBuffer,
      ContentDisposition: contentDeposition,
      ContentType: contentType,
    };

    return s3.upload(params).promise();

    //pass data to uploadmediacontroller for uploading image/video.
  };

  captureImage = (property: 'photo' | 'qrcode') => {


    ImagePicker.openCamera({
      multiple: false,
      mediaType: 'photo',
      compressImageQuality: 0.3,
      includeBase64: true,
      cropping: true,
    }).then(async (image: any) => {
      let filename = image.path.substring(
        image.path.lastIndexOf('/') + 1,
        image.path.length
      );
      this.uploadPost([image])
        .then((res) => {
          switch (property) {
            case 'photo':
              this.setState({
                photo: res.Location,
              });
              break;
            case 'qrcode':
              this.setState({
                qrCode: res.Location,
              });
              break;

            default:
              break;
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    });
  };

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.fetchProfileData()
  }

  getProfileAccountApiCall = (responseJson:any,errorResponse:any) => {
    if (responseJson !== null) {
      if (!responseJson.errors) {
        const dataResponse = responseJson
        const {address,username,profile_bio,qr_code,instagram,city,postal_code,name,photo,country} = dataResponse?.data?.attributes
        console.log(responseJson);
        // @ts-ignore
        this.setState((prevState) => ({
          ...prevState,
          country: {
            ...prevState.country,
            country_code: country,
          },
          address: address,
          username: username,
          aboutMe: profile_bio.about_me,
          qrCode: qr_code.qr_code,
          instagram: instagram,
          city: city,
          postalCode: postal_code,
          fullName: name,
          photo: photo,
        }))
      }
    } else {
      this.parseApiErrorResponse(errorResponse);
    }
  }
  
  updateProfileAccountApiCall = (responseJson:any,errorResponse:any) => {
    if (responseJson !== null) {
      if (!responseJson.errors) {
        console.log(responseJson);
      }

    } else {
      this.parseApiErrorResponse(errorResponse);
    }
  }

  getAttributesApiCall =  (responseJson:any,errorResponse:any) => {
    if (responseJson !== null) {
      if (!responseJson.errors) {
        this.fetchProfileData()
        this.setState({
          attributes: responseJson.data.map((item: object) => {
            return {
              ...item,
              value: ""
            }
          })
        });
      }

    } else {
      this.parseApiErrorResponse(errorResponse);
    }
  }

  handleOpenLink = (url: string) => {

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  // fetch profile data from by passing token
  fetchProfileData = async () => {

    const header = {
      'Content-Type': 'application/json',
      token: configJSON.temporaryToken,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getProfileAccountID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.baseURLGetProfileAccount
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  updateProfileDetails = async () => {
    // update profile data
    const token = (await getStorageData('authToken', false)) || '';
    const header = {
      'Content-Type': 'application/json',
      token: configJSON.temporaryToken,
    };

    const data = {
      profile: {
        country: this.state.country?.country_code,
        city: this.state.city,
        address: this.state.address,
        postal_code: this.state.postalCode,
        profile_role: this.state.profileRole,
        photo: this.state.photo,
        profile_bio_attributes: {
          id: this.state.profileId,
          about_me: this.state.aboutMe,
          custom_attributes: {
            social_links: {
              facebook: this.state.facebook,
              instagram: this.state.instagram,
            },
          },
        },
        qr_code_attributes: {
          qrCode: this.state.qrCode,
        },
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateProfileDetailsID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.baseURLProfileDetails
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  updateProfileAccount = async () => {
    const authToken = (await getStorageData('authToken', false)) || '';
    const header = {
      'Content-Type': 'application/json',
      token: configJSON.temporaryToken,
    };

    const data = {
      data: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        full_name: this.state.fullName,
        current_password: this.state.currentPassword,
        new_password: this.state.newPassword,
        new_email: this.state.email,
        date_of_birth: this.state.dob,
        gender: this.state.gender,
        user_name: this.state.username,
      },
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateProfileAccountID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.baseURLProfileAccount
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  // Customizable Area End
}
