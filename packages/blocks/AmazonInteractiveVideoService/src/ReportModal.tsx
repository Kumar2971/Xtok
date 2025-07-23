import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import {
    RadioButton,
    RadioButtonInput,
} from "react-native-simple-radio-button";
import ReportModalController, { Props } from "./ReportModalController";
import { MemoizedAlertModal } from "./LiveStreaming";
import { screenWidth } from "./helpers/DynamicDimension";
import scale from "../../../components/src/Scale";
import { translate } from "../../../components/src/i18n/translate";

interface IReasonType {
    value: string;
    translationPlaceHolder?: string;
}

const REASONS: IReasonType[] = [
    {
        value: "Sexual Content",
        translationPlaceHolder: 'sexual_content'
    },
    {
        value: "Violent or Repulsive Content",
        translationPlaceHolder: "violent_or_Repulsive_Content",
    },
    {
        value: "Hateful or Abusive Content",
        translationPlaceHolder: "hateful_or_Abusive_Content"
    },
    {
        value: "Harmful or Dangerous Acts",
        translationPlaceHolder: "harmful_or_dangerous_Act"
    },
    {
        value: "Spam or Misleading",
        translationPlaceHolder: "spam_or_Misleading"
    },
    {
        value: "Child Abuse",
        translationPlaceHolder: "child_Abuse"
    },
    {
        value: "Other",
        translationPlaceHolder: "other"
    },
];
// Customizable Area End
export default class ReportModal extends ReportModalController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
    renderReportReasons = ({ item, index }: any) => {
        return (
            <View
                style={[
                    styles.report_item,
                    index === 0 && {
                        marginTop: 10,
                    },
                ]}
            >
                <RadioButton labelHorizontal={true}>
                    <RadioButtonInput
                        testID={`radioBtnId${index}`}
                        index={item.value}
                        buttonOuterColor={"#ffc831"}
                        obj={item}
                        isSelected={this.state.selectedReportReason === item.value}
                        buttonInnerColor={"#ffc831"}
                        buttonOuterSize={25}
                        buttonSize={16}
                        onPress={() => this.selectReportReason(item.value)}
                        buttonWrapStyle={{
                            marginLeft: 20,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => this.selectReportReason(item.value)}
                        testID="radioBtnValueId"
                        style={styles.ad5d464f0f49e11ed9a0b8bf868ff0a22}
                    >
                        <Text style={[styles.ad5d464f1f49e11ed9a0b8bf868ff0a22, this.props.language == "ar" && { textAlign: "left" }]}>
                            {translate(item?.translationPlaceHolder)}
                        </Text>
                    </TouchableOpacity>
                </RadioButton>
            </View>
        );
    };
  // Customizable Area End

  render() {

      const { isVisible, language, onClose } = this.props;

    return (
      //  Customizable Area Start
        <Modal
            visible={isVisible}
            transparent={true}
            animationType={"slide"}
        >
            <KeyboardAvoidingView
                behavior={Platform.select({ ios: 'padding', android: undefined })}
                style={styles.transpernetModalContainer}>
                <TouchableOpacity
                    testID="addParticipant"
                    onPress={onClose} style={{ flex: 1 }}>
                </TouchableOpacity>
                <View style={styles.modalContainer}>
                    <View style={styles.modalListContainer5}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.report_header_title}>
                                <Text style={styles.report_title}>{translate("report")}</Text>
                            </View>

                            <FlatList
                                data={REASONS}
                                testID="reasonFlatList"
                                onEndReachedThreshold={0}
                                keyExtractor={(item: IReasonType, index) => `${index}`}
                                renderItem={this.renderReportReasons}
                                scrollEnabled={true}
                            />
                            {this.state.selectedReportReason == "Other" ? (
                                <View style={styles.ad5d43de9f49e11ed9a0b8bf868ff0a22}>
                                    <TextInput
                                        testID="descriptionTextId"
                                        placeholder={translate("enter_description")}
                                        value={this.state.report_desc}
                                        onChangeText={(text:any) => this.enterdescription(text)}
                                        editable={
                                            this.state.selectedReportReason == "Other" ? true : false
                                        }
                                        placeholderTextColor="black"
                                        style={[styles.ad5d43deaf49e11ed9a0b8bf868ff0a22, language == "ar" ? { textAlign: "right" } : { textAlign: "left" }]}
                                    />
                                </View>
                            ) : null}

                            <View style={styles.report_footer_container}>
                                <View style={styles.report_footer_buttons_container}>
                                    <TouchableOpacity
                                        testID="cancleBtnId"
                                        style={styles.cancel_button}
                                        onPress={() =>
                                            this.setState({ selectedReportReason: -1 }, () => {
                                                onClose();
                                            })
                                        }>
                                        <Text style={styles.cancel_button_text}>{translate("cancel")}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity testID="onpressReport"
                                        disabled={this.state.inProcess}
                                        style={styles.button}
                                        onPress={() => this.onpressReport()}
                                    >
                                        <View>
                                            <Text style={styles.report_button_text}>{translate("report")}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <MemoizedAlertModal
                    testID={"AlertModal"}
                    alertModal={this.state.reportAlertPopupReason}
                    onPress2={this.closeReportalertPopupReason}
                    btnTitle2={"ok"}
                />
                <MemoizedAlertModal
                    alertModal={this.state.reportAlertPopupDescription}
                    onPress2={this.closeReportalertPopupDescription}
                    btnTitle2={translate("ok")}
                />
            </KeyboardAvoidingView>
        </Modal>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    transpernetModalContainer: {
        position: 'relative',
        width: screenWidth,
        flex: 1
      },
      report_title: {
        fontSize: scale(20),
      },
      report_item: {
        paddingTop: scale(10),
      },
      ad5d43de9f49e11ed9a0b8bf868ff0a22: {
        marginLeft: 53,
      },
      report_footer_container: {
        padding: 10,
        marginTop: 10,
        borderTopColor: "#c4c0c0",
        borderTopWidth: 1,
        marginBottom:5
      },
      button: {
        width: scale(180),
        height: scale(45),
        backgroundColor: "#FACC1E",
        borderRadius: scale(50),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      },
      report_button_text: {
        fontSize: scale(20),
        fontWeight: "bold",
        color: "#fff4d4",
      },
      report_footer_buttons_container: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      },
      cancel_button_text: {
        fontSize: scale(20),
        fontWeight: "bold",
        color: "#FACC1E",
      },
      ad5d43deaf49e11ed9a0b8bf868ff0a22: {
        height: 40,
        color: "black",
        fontSize: 15.5,
      },
      cancel_button: {
        width: scale(180),
        height: scale(45),
        backgroundColor: "#fff4d4",
        borderRadius: scale(50),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      },
      report_header_title: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#c4c0c0",
        fontWeight: "bold",
        padding: 10,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      },
      modalListContainer5: {
        position: "absolute",
        bottom: 0,
        width: screenWidth,
        backgroundColor: "rgb(255, 255, 255)",
        maxHeight: scale(800)
      },
      ad5d464f0f49e11ed9a0b8bf868ff0a22: {
        width: "100%",
        marginLeft: 10,
      },
      ad5d464f1f49e11ed9a0b8bf868ff0a22: {
        fontSize: 16,
      },
      modalContainer: {
        flex: 1,
        top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      },
});
// Customizable Area End