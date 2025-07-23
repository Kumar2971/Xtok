import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Modal } from "react-native";
import { BlockComponent } from "../../framework/src/BlockComponent";
import FONTS from "./Fonts/Fonts";
interface Props {  
    alertModal:any;
    onPress1?:Function;
    onPress2?:Function;
    onPress3?:Function; 
   btnTitle1?:string,
   btnTitle2?:string;
   btnTitle3?:string; 
   testID?:string;
}

interface S {
}

interface SS {
}

export default class AlertModal extends Component<Props, S> {
  constructor(props: Props) {
      super(props);
      this.state = {
          // Customizable Area Start
          
          // Customizable Area End
      };
  }
   
    alertModal = () => { 
      const { 
        alertModal,
        onPress1,
        onPress2,
        onPress3,
       btnTitle1,
       btnTitle2,
       btnTitle3,
       testID
      }=this.props;
        return ( 
          <View style={{}}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={alertModal.openAlertModal}
              onRequestClose={() => {
               alertModal.openAlertModal
              }}
              
            >
              <View style={styles.modalView}>
                <View style={styles.modalSubView}> 
                {alertModal.headerText? 
                <View style={{alignItems:"center",justifyContent: "center"}}>
                  <Text style={styles.headerText}>{alertModal.headerText}</Text>
                </View> : null}
                  <View style={{marginTop:alertModal.headerText?20:0,alignItems:"center"}}>
                    <Text style={styles.feedbackText}>{alertModal.alertMsg}</Text>
                  </View>  
                  <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                  {btnTitle1 ? 
                  <TouchableOpacity
                      onPress={()=>{onPress1?onPress1():null}}
                      style={styles.okBtn}
                    >
                      <Text style={styles.btnTitleStyle}>{btnTitle1}</Text>
                      </TouchableOpacity> :null} 
                    {btnTitle2? 
                   
                    <TouchableOpacity
                      onPress={()=>{onPress2?onPress2(alertModal?.id):null}}
                      style={styles.okBtn}
                    >
                      <Text style={styles.btnTitleStyle}>{btnTitle2}</Text>
                    </TouchableOpacity>:null } 
                    {btnTitle3? 
                   
                   <TouchableOpacity
                     onPress={()=>{()=>{onPress3?onPress3():null}}}
                     style={styles.okBtn}
                   >
                     <Text style={styles.btnTitleStyle}>{btnTitle3}</Text>
                   </TouchableOpacity>:null}
                  </View> 
                 
                </View>
              </View>
            </Modal>
          </View>
        )
      }

  render() {
    return (
       this.alertModal()
    );
  }
}
const styles = StyleSheet.create({ 
  headerText:{
    fontFamily:FONTS.MontserratSemiBold,
    fontSize: 18,
    
  },
    btnTitleStyle: {
        fontFamily: FONTS.MontserratSemiBold,
        color: "#000"
      },
      okBtn: {
        height: 50, 
        width:85,
        borderRadius: 50,
        backgroundColor: "#FFC925",
        justifyContent: "center",
       alignItems: "center",
        marginTop: 20,
        marginHorizontal:10
      },
      feedbackText: {
        fontFamily: FONTS.MontserratRegular,
        fontSize: 14,
      },
      modalSubView: {
        backgroundColor: "white",
        borderRadius: 20,
        marginHorizontal: "5%",
        padding: 30,
        borderWidth: 1,
        borderColor: "#FFC925"
      },
      modalView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      },
  })