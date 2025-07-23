import { Platform } from "react-native";
import Strings from "./Strings";

class VideoFonts {
  static getFontByOS = (fontStyle: string) => {
    switch (fontStyle) {
      case Strings.poppinsItalic:
        return "Poppins-Italic";
      case Strings.poppinsExtraLight:
        return "Poppins-ExtraLight";
      case Strings.poppinsLight:
        return "Poppins-Light";
      case Strings.poppinsBoldItalic:
        return "Poppins-BoldItalic";
      case Strings.poppinsExtraBold:
        return "Poppins-ExtraBold";
      case Strings.poppinsExtraBoldItalic:
        return "Poppins-ExtraBoldItalic";
      case Strings.poppinsSemiBold:
        return "Poppins-SemiBold";
      case Strings.poppinsMedium:
        return "Poppins-Medium";
      case Strings.poppinsBold:
        if (Platform.OS == "android") {
          return "Poppins-Bold";
        } else {
          return "Poppins-SemiBold";
        }
      case Strings.poppinsRegular:
        return "Poppins-Regular";
      case Strings.poppinsExtraLightItalic:
        return "Poppins";
      case Strings.poppinsBlack:
        return "Poppins-Black";
      case Strings.RampageMonolineRounded:
        if (Platform.OS == "android") {
          return "RampageMonoline-Rounded";
        } else {
          return "RampageMonolineRounded";
        }
      case Strings.SnellRoundhandScript:
        if (Platform.OS == "android") {
          return "Snell Roundhand Script";
        } else {
          return "SnellRoundhand-Script";
        }
      case Strings.LunaBold:
        return "Luna-Bold";
      case Strings.LunaBoldItalic:
        return "Luna-BoldItalic";
      case Strings.LunaExtraBoldItalic:
        return "Luna-ExtraBoldItalic";
      case Strings.LunaItalic:
        return "Luna-Italic";
      case Strings.LunaMedium:
        return "NunitoSans-SemiBold";
      case Strings.LunaRegular:
        return "NunitoSans-Regular";
      case Strings.FlamanteRomaMedium:
        return "FlamanteRomaMedium";
      case Strings.GofiendaRegular:
        return "Gofienda-Regular";
      case Strings.knewave:
        return "knewave";
      case Strings.BebasNeueRegular:
        return "BebasNeue-Regular";
      case Strings.BebasNeueBook:
        return "BebasNeue Book";
      case Strings.OpenSansBold:
        return "OpenSans-Bold";
      case Strings.AbrilFatfaceRegular:
        return "AbrilFatface-Regular";
      case Strings.OpenSansRegular:
        if (Platform.OS == "android") {
          return "OpenSans-Regular";
        } else {
          return "OpenSans";
        }
      case Strings.Brusher:
        return "Brusher";
      case Strings.BirdsOfParadise:
        if (Platform.OS == "android") {
          return "Birds-of-Paradise";
        } else {
          return "BirdsofParadise-PersonaluseOnly";
        }
      case Strings.MontserratBold:
        return "Montserrat-Bold";
      case Strings.MontserratRegular:
        return "Montserrat-Regular";
      case Strings.MontserratBlack:
        return "Montserrat-Black";

      case Strings.MontserratExtraBold:
        return "Montserrat-ExtraBold";
      case Strings.MontserratMedium:
        return "Montserrat-Medium";
      case Strings.MontserratSemiBold:
        return "Montserrat-SemiBold";
      case Strings.MontserratItalic:
        return "Montserrat-MediumItalic";

      case Strings.AntonRegular:
        return "Anton-Regular";
      case Strings.ForumRegular:
        if (Platform.OS == "android") {
          return "Forum-Regular";
        } else {
          return "Forum";
        }
      case Strings.CinzelRegular:
        return "Cinzel-Regular";
      case Strings.CourierPrimeBold:
        return "CourierPrime-Bold";
      case Strings.MerriweatherRegular:
        return "Merriweather-Regular";
      case Strings.RubikLight:
        return "Rubik-Light";
      case Strings.RubikRegular:
        return "Rubik-Regular";
      case Strings.RubikMedium:
        return "Rubik-Medium";
      case Strings.LatoMedium:
        return "Lato-Medium";
      case Strings.LatoSemiBold:
        return "Lato-Semibold";
      case Strings.RubikBold:
        return "Rubik-Bold";
      case Strings.MyriadProRegular:
        if (Platform.OS == "android") {
          return "Myriad Pro Regular";
        } else {
          return "MyriadPro-Regular";
        }
      case Strings.MyriadProBlack:
        if (Platform.OS == "android") {
          return "Myriad Pro Black";
        } else {
          return "MyriadPro-Black";
        }
      case Strings.MyriadProLight:
        if (Platform.OS == "android") {
          return "Myriad Pro Light";
        } else {
          return "MyriadPro-Light";
        }
      case Strings.MyriadProBold:
        if (Platform.OS == "android") {
          return "Myriad Pro Bold";
        } else {
          return "MyriadPro-Bold";
        }
      case Strings.OpenSansBoldItalic:
        return "OpenSans-BoldItalic";
      case Strings.RobotoThin:
        return "Roboto-Thin";
      case Strings.RobotoBold:
        return "Roboto-Bold";
      case Strings.RobotoLight:
        return "Roboto-Light";
      case Strings.RobotoMedium:
        return "Roboto-Medium";
      case Strings.RobotoBlackItalic:
        return "Roboto-BlackItalic";
      case Strings.RobotoLightItalic:
        return "Roboto-LightItalic";
      case Strings.RobotoBoldItalic:
        return "Roboto-BoldItalic";
      case Strings.LatoBold:
        return "Lato-Bold";
      case Strings.LatoHeavy:
        return "Lato-Heavy";
      case Strings.LatoBlack:
        return "Lato-Black";
      case Strings.LatoReglar:
        return "Lato-Regular";
      case Strings.LexendBold:
        return "Lexend-Bold";
      case Strings.LexendLight:
        return "Lexend-Light";
      case Strings.PlayfairDisplayBoldItalic:
        return "PlayfairDisplay-BoldItalic";
      case Strings.HelveticaBold:
        return "Helvetica-Bold";
      case Strings.HelveticaRegular:
        return "Helvetica";
      case Strings.SeravekRegular:
        return "Seravek";
      case Strings.SeravekBold:
        return "Seravek-Bold";
      case Strings.SeravekMedium:
        return "Seravek-Medium";
      case Strings.SeravekLight:
        return "Seravek-Light";
      case Strings.GreatVibesRegular:
        return "GreatVibes-Regular";
      case Strings.MerriweatherLight:
        return "Merriweather-Light";

      case Strings.MerriweatherRegular:
        return "Merriweather-Regular";
      default:
        break;
    }
  };
}
export default VideoFonts;
