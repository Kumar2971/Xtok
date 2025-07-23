import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet,Image,Dimensions, KeyboardAvoidingView, Keyboard } from "react-native";
import { Send } from "../../../../components/icons/Icons";
import { bool } from "aws-sdk/clients/signer";
import { gift } from "../../../../assets";
import { background } from "../../../../../../VideoTrimming/src/assets";
const dimension = Dimensions.get('window');
interface TextInputContainerProps {
  sendMessage: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  isSending?: boolean;
  testID?: string;
  onPressAddMore?:()=>void ;
  onPressAddMoreGift?:()=>void;
  selectedCatalogueID:void;
  participantMode?: string;
  giftModal?:boolean;
  selectedCatalogue?:any;
  sendCoin:()=>void;
  participantLength:any;
  language:string;
}
interface TextInputContainerState {}
const vertical_40 = 40;
class TextInputContainer extends React.PureComponent<
  TextInputContainerProps,
  TextInputContainerState
> {
  textInput = () => {
    const { message, sendMessage, setMessage, testID,onPressAddMore,participantMode,onPressAddMoreGift,participantLength,language} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerView}>
          <TextInput
            testID={testID}
            multiline
            value={message}
            placeholder={"Write your message"}
            style={[styles.containerStyle,language =='ar'&& {
              textAlign: 'right',
            }]}
            numberOfLines={2}
            onChangeText={setMessage}
            selectionColor={"white"}
            placeholderTextColor={"#9FA0A7"}
            maxLength={200}
          />
        </View>

        <View
          style={[
            {
              // backgroundColor:
              //   message.length > 0 ? "#5568FE" : "transparent",
                flexDirection:"row",
            },
            styles.btnView,
          ]}>
          { participantMode == "VIEWER" && participantLength.length <=1 ?
       <TouchableOpacity onPress={onPressAddMoreGift? () => {
            onPressAddMoreGift(),Keyboard.dismiss()
              } :undefined}>
                <Image source={gift} style={styles.giftIcon}/>
              </TouchableOpacity>  :null
         }
          <TouchableOpacity onPress={sendMessage} style={styles.btn}>
          <Image source={require('../../../../../assets/Messanger.png')} style={styles.sendIcon} />
          </TouchableOpacity>

          {participantMode == "CONFERENCE" ?
          <TouchableOpacity onPress={onPressAddMore? () => {
            onPressAddMore()
              } :undefined}>
                <Image source={require('../../../../../assets/person.png')} style={styles.sendIcon} />
              </TouchableOpacity> : null
          }
        </View>
      </View>
    );
  };

  render() {
    return <>{this.textInput()}</>;
  }
}

const styles = StyleSheet.create({
  container: {
    height: vertical_40,
    flexDirection: "row",
    alignSelf:'center',
   // backgroundColor:"red",
    //  position:"absolute",
    width: (dimension.width)-20 ,
   bottom:0,
  },
  containerView: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
  },
  containerStyle: {
    flex: 1,
    color: "white",
    marginLeft: 12,
    margin: 4,
    padding: 4,
  },
  btn: {
    height: 30,
    aspectRatio: 1,
    paddingHorizontal:20,
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 0,
  },
  btnView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    padding: 4,
    borderRadius: 8,
  },
  sendIcon: {
    height: 21,
    width: 25
  },
  giftIcon: {
    height: 28,
    width: 25,
    tintColor:"#fff"
  },
});
export default TextInputContainer;