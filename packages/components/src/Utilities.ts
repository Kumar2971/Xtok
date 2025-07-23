/* App/Lib/GeneralHelpers.js */
import { Alert, Dimensions, Platform, PixelRatio } from 'react-native';
//@ts-ignore
import _ from 'lodash';

import StorageProvider from '../../framework/src/StorageProvider';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { removeStorageData, customAlert } from "../../framework/src/Utilities";
export function getOS(): string {
  return Platform.OS;
}

/**
 * SCALING - SAME VIEW FOR TABLET AND IPHONE ADDED THIS SCALE IN HEIGHT, WIDTH, MARGIN, PADDING
 */
const { width, height, scale: deviceScale, fontScale } = Dimensions.get(
  "window"
);
const baseWidth = 360;
const baseHeight = 700;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

let config = require('../../framework/src/config');

// const storageProvider = require('./StorageProvider');

export const scaleRatio = deviceScale;
export const deviceWidth = width;
export const deviceHeight = height;
export const deviceAspectRatio = width / height;
export const scaledSize = (size: any) => Math.ceil(size * scale);
export const widthFromPercentage = (per: number) => (width * per) / 100;
export const heightFromPercentage = (per: number) => (height * per) / 100;

function calcZoom(longitudeDelta: any) {
  // Omit rounding intentionally for the example
  return Math.log(360 / longitudeDelta) / Math.LN2;
}

function calcLongitudeDelta(zoom: any) {
  var power = Math.log2(360) - zoom;
  return Math.pow(2, power);
}

export const calculateDelta = () => {
  // Initial values
  var latitudeDelta = 0.004757;
  var longitudeDelta = 0.006866;

  var coef = latitudeDelta / longitudeDelta; // always the same no matter your zoom

  // Find zoom level
  var zoomLvlCalculated = calcZoom(longitudeDelta);
  //console.log(zoomLvlCalculated); // 15.678167523696594

  // Find longitudeDelta based on the found zoom
  var longitudeDeltaCalculated = calcLongitudeDelta(zoomLvlCalculated); // 0.006865999999999988 which is the same like the initial longitudeDelta, if we omit the floating point calc difference
  //console.log('longitudeDeltaCalculated', longitudeDeltaCalculated);

  // Find the latitudeDelta with the coefficient
  var latitudeDeltaCalculated = longitudeDeltaCalculated * coef; //0.004756999999999992 which is the same like the initial latitudeDelta, if we omit the floating point calc difference
  //console.log('latitudeDeltaCalculated', latitudeDeltaCalculated);
  return {
    latitudeDelta: latitudeDeltaCalculated,
    longitudeDelta: longitudeDeltaCalculated,
  };
};

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;
//Artboard Dimension
let artBoardHeightOrg = 844;
let artBoardWidthOrg = 390;
//Re calculated Artboard Dimension
let artBoardWidth = isSameRatio() ? artBoardWidthOrg : screenWidth;
let artBoardHeight = isSameRatio() ? artBoardHeightOrg : screenHeight;
// To check if Artboard and Device screen has same ratio
function isSameRatio(): boolean {
  return (
    artBoardWidthOrg / artBoardHeightOrg < 1 && screenWidth / screenHeight < 1
  );
}

//Top or Bottom nav spaces or any extra space occupied by os e.g Status bar, Notch
let extraSpace = 0;

export function deviceBasedDynamicDimension(
  originalDimen: number,
  compareWithWidth: boolean,
  resizeFactor: number
): number | undefined {
  if (originalDimen != null) {
    if (resizeFactor != null) {
      originalDimen *= resizeFactor;
    }
    const compareArtBoardDimenValue = compareWithWidth
      ? artBoardWidth
      : artBoardHeight;
    const artBoardScreenDimenRatio =
      (originalDimen * 100) / compareArtBoardDimenValue;
    let compareCurrentScreenDimenValue = compareWithWidth
      ? screenWidth
      : screenHeight - extraSpace;
    if (Platform.OS === "web") {
      return (
        responsiveWidth(originalDimen / compareCurrentScreenDimenValue) * 100
      );
    }
    return PixelRatio.roundToNearestPixel(
      (artBoardScreenDimenRatio * compareCurrentScreenDimenValue) / 100
    );
  }
  return;
}
/**
 * CHECKS IF THE PASSED VALUE IS EMPTY STRING OR NOT
 * RETURN `true` IF STRING IS EMPTY ELSE RETURN `false`
 */
export function isEmpty(val: any): boolean {
  let isValEmpty = true;
  if (!_.isNil(val) && _.trim(String(val)).length > 0) {
    isValEmpty = false;
  }
  return isValEmpty;
}

/**
 * CHECKS IF THE PASSED VALUE IS VALID EMAIL
 * RETURN `true` IF VALID ELSE RETURN `false`
 */
export function isEmail(fieldName: string, val: string) {
  //const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (isEmpty(val)) {
    return { status: false, message: `Email field cannot be left blank` };
  } else if (!emailReg.test(val)) {
    return { status: false, message: `Invalid email address` };
  }
  return { status: true, message: "" };
}

/* To handle phone validation */
export function phoneValidate(fieldName: string, value: any) {
  console.log("phoneValidate");
  //const phoneRegex = /^962[0-9]{8,9}$/;
  //const phoneRegex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
  const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  if (value === "" || value === undefined || value === null) {
    return { status: false, message: `Field cannot be left blank` };
  } else if (!phoneRegex.test(value)) {
    return {
      status: false,
      message: `Please enter valid ${fieldName.toLocaleLowerCase()}`,
    };
  }

  return { status: true, message: "" };
}

export function confirmPasswordValidate(
  fieldName: string,
  confirmPassword: string,
  fieldName2: string = "password",
  password: string = ""
) {
  //const phoneRegex = /^962[0-9]{8,9}$/;
  if (
    confirmPassword === "" ||
    confirmPassword === undefined ||
    confirmPassword === null
  ) {
    return { status: false, message: `Field cannot be left blank` };
  } else if (password && password !== confirmPassword) {
    return {
      status: false,
      message: `${fieldName} should be same as ${fieldName2}`,
    };
  }

  return { status: true, message: "" };
}

export function passwordValidate(fieldName: string, password: string = "") {
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
  // const passwordRegex=/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&\u0600-\u06FF])[A-Za-z\d@$!%?&\u0600-\u06FF]{8,}$/
  if (password === "" || password === undefined || password === null) {
    return {
      status: false,
      message: `The ${fieldName.toLocaleLowerCase()} field cannot be left blank`,
    };
  } else if (!passwordRegex.test(password)) {
    return {
      status: false,
      message: `${fieldName} should contain at least 8 letters, one uppercase, one lowercase, one number and one special character`,
    };
  }

  return { status: true, message: "" };
}

/* To handle required validation */
export function requireValidate(
  fieldName: string,
  value: any,
  isBool: boolean = false
) {
  if (isBool) {
    if (value) {
      return { status: true, message: "" };
    }
    return { status: false, message: "" };
  }
  if (value === "" || value === undefined || value === null) {
    if (fieldName === "lmsUrl") {
      return { status: false, message: `Please select ${fieldName}` };
    } else {
      return {
        status: false,
        message: `${fieldName} field cannot be left blank`,
      };
    }
  }
  return { status: true, message: "" };
}

/**check validation username and fullname*/
export function isFullname(fieldName: string, val: string) {
  const nameRegex = /^[a-zA-Z ]*$/;

  if (isEmpty(val)) {
    return { status: false, message: `Name field cannot be left blank` };
  } else if (!nameRegex.test(val)) {
    return {
      status: false,
      message: `${fieldName} should contain only alphabets`,
    };
  } else if (val.length < 3) {
    return {
      status: false,
      message: `${fieldName} should contain at least 3 character`,
    };
  }
  return { status: true, message: "" };
}
export function isUserName(fieldName: string, val: string) {
  const nameRegex = /^$|^[A-Za-z0-9_,.]+$/;

  if (isEmpty(val)) {
    return { status: false, message: `Username field cannot be left blank` };
  } else if (!nameRegex.test(val)) {
    return {
      status: false,
      message: `${fieldName} should not contain space. Only number, alphabets, underscore and periods are allowed.`,
    };
  }
  return { status: true, message: "" };
}

let _navigator: any;

export function setNavigator(nav: any) {
  _navigator = nav;
}

export async function logoutUser(logoutType: string = "", props: any) {
  console.log("logoutUser", _navigator);
  if (StorageProvider && _navigator) {
    await removeStorageData("authToken");
    await removeStorageData("profileData");
    await removeStorageData("deviceToken");
    await removeStorageData("role");
    await removeStorageData("catalogListData");
  } else {
    await removeStorageData("authToken");
    props.route.params.logoutScreen();
  }
  //NavigationService.resetTo('primaryStack', { screen: 'Login' });
  if (logoutType == "force") {
    customAlert(
      "Session expired",
      "Your session has expired. Please login again to continue."
    );
    setTimeout(() => {
      // resetTo("primaryStack", { screen: "EmailAccountLoginBlock" });
      _navigator.push("Login");
    }, 2000);
  } else {
    // resetTo("primaryStack", { screen: "EmailAccountLoginBlock" });
    _navigator.push("Login");
  }
}

export function returnS3URL(): string {
  if (config.baseURL === 'https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe') {
    return "https://minio.b255799.dev.eastus.az.svc.builder.cafe"
  }
  else {
    return "https://minio.b255799.stage.eastus.az.svc.builder.ai"
  }
}

export function formatNumber(inputNumber: number) {
  const strNumber = String(inputNumber);
  const length = strNumber.length;

  if (length <= 3) {
    return strNumber;
  }

  const remainder = length % 3;
  let formattedNumber = strNumber.slice(0, remainder);

  for (let i = remainder; i < length; i += 3) {
    if (formattedNumber.length !== 0) {
      formattedNumber += '.';
    }
    formattedNumber += strNumber.slice(i, i + 3);
  }

  return formattedNumber;
}
