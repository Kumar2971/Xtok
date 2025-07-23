import { IBlock } from "../../../framework/src/IBlock";
// Customizable Area Start
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData ,setStorageData} from "../../../framework/src/Utilities";
import I18n from "../../../components/src/i18n/i18n";
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication'; 
import {AsyncStorage} from "react-native";
export const configJSON = require('./config');
let jwtDecode = require('jwt-decode');
import uuid from 'react-native-uuid';
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export interface S {
  // Customizable Area Start
  dataSource: any[];
  countryCodeSelected: string;
  mobileNo: string;
  token: string;
  loginWith: string;
  isRegistration: boolean;
  loading: boolean;
  language: any;
  name: string;
  email: string;
  // Customizable Area End
}

export interface SS {
  // Customizable Area Start
  id: any;
  // Customizable Area End
}

export default class LoginController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  phoneAuthApiCallId: any;
  createAccountAPICallId: any;
  socialSignInApiCallId: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.CountryCodeMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ]);
    this.state = {
      dataSource: [],
      countryCodeSelected: '',
      mobileNo: '',
      token: '',
      loginWith: '',
      isRegistration: true,
      loading: false,
      language: "",
        name: "",
        email: ""
    };

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.CountryCodeMessage) === message.id) {
      let selectedCode = message.getData(
        getName(MessageEnum.CountyCodeDataMessage)
      );

      if (selectedCode !== undefined) {
        this.setState({
          countryCodeSelected:
            selectedCode.indexOf('+') > 0
              ? selectedCode.split('+')[1]
              : selectedCode,
        });
      }
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.phoneAuthApiCallId) {
         this.phoneAuthApiSuccess(responseJson)
        } else if (apiRequestCallId === this.socialSignInApiCallId) {
          this.socialSignInApiSuccess(responseJson)
        }
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  phoneAuthApiSuccess = (responseJson:any) => {
    if (responseJson?.meta?.token) {
      this.setState({ token: responseJson.meta.token });

      const msg: Message = new Message(
        getName(MessageEnum.NavigationMobilePhoneOTPMessage)
      );

      msg.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        this.state.token
      );

      msg.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
      );

      msg.addData(
        getName(MessageEnum.AuthTokenPhoneNumberMessage),
        this.state.mobileNo
      );

      this.send(msg);
    }
  }
  socialSignInApiSuccess = async(responseJson:any) => {
    if(responseJson?.errors ) {
      if(responseJson?.errors[0].failed_login === "Account not found") {
          this.props.navigation.navigate("CountryCodeSelectorTable", {
              name:  this.state.name,
              email: this.state.email,
          })
      }
  }
    await AsyncStorage.setItem('authToken', responseJson?.meta?.token ?? "")

    await setStorageData('authToken', responseJson.meta.token ?? "");
    await setStorageData('userID', JSON.stringify(responseJson.meta.id));
    await setStorageData('authTokenId', JSON.stringify(responseJson.meta.id));

    this.goToLoginSuccess()
  }
  goToLoginWith(loginWith: any) {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationMobilePhoneLogInMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.MobilePhoneLogInDataMessage), {
      loginWith: loginWith,
    });

    this.send(msg);
  }

  goToLoginSuccess() {
    const msg: Message = new Message(
        getName(MessageEnum.NavigationLoginSuccessMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    msg.addData(getName(MessageEnum.LoginSuccessDataMessage), { isScreenFrom: "Login" });
    this.send(msg);
  }

  socialSignIn = async (emailAddress: string) => {

    const header = {
      "Content-Type": configJSON.loginApiContentType
    };

    const emailAttrs = {
      email: emailAddress
    };

    const data = {
      type: "social_account",
      attributes: emailAttrs
    };

    const httpBody = {
      data: data
    };

    await this.apiCall({
      setApiCallId: "socialSignInApiCallId",
      header,
      method: configJSON.loginAPiMethod,
      endPoint: `bx_block_login/logins`,
      body: JSON.stringify(httpBody)
    });
  };

  apiCall = async (data: any) => {
    const { setApiCallId, header, endPoint, method, body } = data;

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    if (setApiCallId === "socialSignInApiCallId") {
      this.socialSignInApiCallId = requestMessage.messageId;
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );

    body &&
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  startLoading = () => {
    this.setState({ loading: true });
  };

  saveLoggedInUserData(responseJson: any) {
    const msg: Message = new Message(getName(MessageEnum.SessionSaveMessage));
    msg.addData(
      getName(MessageEnum.SessionResponseData),
      JSON.stringify(responseJson)
    );
    msg.addData(
      getName(MessageEnum.SessionResponseToken),
      responseJson.meta.token
    );

    this.send(msg);
  }

  loginWithAppleAndroid = async () => {
    // Generate secure, random values for state and nonce
    const rawNonce = uuid.v4();
    const state = uuid.v4();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'YZ836567RL.com.golavi',

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: 'com.golavi',

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce as string | undefined,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state : state as string | undefined,
    });

    // Open the browser window for user sign in
   await appleAuthAndroid.signIn();
  };

  loginWithApple = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {

      const id_token = appleAuthRequestResponse.identityToken;

      let decoded:{name:string, email:string,email_verified:boolean} = jwtDecode(id_token!);

      const hisEmail = decoded.email;
      this.setState({
        email: hisEmail,
        name: decoded.name ? decoded.name : '',
      },()=>{
        this.socialSignIn(hisEmail);
      })



    }
  };

  navigateToSignup() {
    const msg: Message = new Message(
      getName(MessageEnum.NavigateEmailSignUpMessage)
    );
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  async componentWillMount() {
    const language = await getStorageData('SelectedLng');
    I18n.locale = language;
    this.setState({ language: language });

    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    // return appleAuth.onCredentialRevoked(async () => {
    //   console.warn(
    //     'If this function executes, User Credentials have been Revoked'
    //   );
    // });
  }

  // async componentDidMount(): Promise<void> {
  //   // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
  //   appleAuth.onCredentialRevoked(async () => {
  //     console.warn(
  //       'If this function executes, User Credentials have been Revoked'
  //     );
  //   });
  // }
  // Customizable Area End
}
