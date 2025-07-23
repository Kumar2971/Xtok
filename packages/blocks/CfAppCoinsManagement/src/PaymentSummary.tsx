import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import Scale from '../../../components/src/Scale';
import { coin, imgLeftArrow } from "./assets";
import { translate } from '../../../components/src/i18n/translate';
import CustomButton from '../../../components/src/Custombutton';
import { Divider } from 'react-native-elements';
import balanceController from './balanceController';

    export default class PaymentSummary extends balanceController {
        async componentDidMount() {
            super.componentDidMount();
            this.props.navigation.addListener("focus", async () => {
               this.getBillingDetails(this.props.route.params.amount);
            });
        }
    header = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    testID="btnExample"
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Image testID="arrowImg" source={imgLeftArrow}
                        style={[styles.backarrowStyleEn, this.state.language==="ar" && styles.backarrowStyle]} />
                </TouchableOpacity>
                <Text style={styles.headerText}>{translate("paymentsummary")}</Text>
                <View />
            </View>
        );
    };
    invoice = (heading1:string, content1:string, heading2:string, content2:string) =>{
        return <View style={styles.rowView}>
            <View style={styles.invoiceStyle}>
                <Text style={styles.heading}>{heading1}</Text>
                <Text style={styles.content}>{content1}</Text>
            </View>
            <View style={styles.invoiceStyle}>
                <Text style={styles.heading}>{heading2}</Text>
                <Text style={styles.content}>{content2}</Text>
            </View>
        </View>;
    }
render(){
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                {this.header()}
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.coinsCard}>
                        <View style={styles.coinView}>
                            <Image source={coin} style={styles.coinstyle} />
                            <Text style={styles.amountStyle}> {translate("coins")} </Text>
                        </View>
                    <Text style={styles.coinText}>{`X ${this.props.route.params.count}`}</Text>
                    <Text style={styles.thankyouText}>{translate('thank_you_for_purchase')}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.heading}>
                            {translate('amount_due')} (USD)
                        </Text>
                        <View style={styles.imgStyle}>
                            <Image source={coin} style={styles.coinstyle} />
                            <Text style={styles.amountStyle}> {`$${this.props.route.params.amount}`} </Text>
                        </View>
                        <Divider style={styles.separator} />

                        <View style={styles.invoiceView}>
                            {this.invoice(translate('Total_Amount'), `$${this.state.totalAmount}`, translate("taxes"), `${this.state.taxAmount}`)}
                            {this.invoice(translate('issued_on'), `${this.state.issuedDate}`, translate('due_on'), `${this.state.issuedDate}`)}
                            {this.invoice(translate('invoice_for'), `${this.state.fullName}`, "", "")}
                        </View>
                    </View>
                    <Text
                        testID='terms-conditions'
                        style={styles.termsConditionsStyle}
                        onPress={() => this.props.navigation.navigate("TermsandConditions")}
                    >
                        {translate("termsConditions")}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            testID='continue-button'
                            title={translate("continue")}
                            onPress={async () => {
                                this.props.navigation.navigate('StripeIntegration',{amount:this.props.route.params.amount,count:this.props.route.params.count})
                            }}
                            TextStyle={styles.textStyleSummary}
                            style={styles.button}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View >
    );
}
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: 650,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Scale(15),
        height: Scale(40),
        width: "100%",
        borderBottomColor: "#B7BBC0",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 10
    },
    backarrowStyle: {
        transform: [{ rotate: "180deg" }]
    },
    backarrowStyleEn: {
        width: Scale(25),
        height: Scale(25),
        resizeMode: "contain"
    },
    coinstyle: {
        width: Scale(36),
        height: Scale(36),
        resizeMode: "contain",
        marginRight: 2
    },
    headerText: {
        fontSize: Scale(18),
        fontWeight: "bold",
    },
    button: { paddingHorizontal: Scale(110), paddingVertical: 15 },
    textStyleSummary: {
        color: "black"
    },
    buttonContainer: {
        // marginTop: Scale(20),
        padding: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        maxHeight: "85%",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 18,
        padding: 14
    },
    coinsCard: {
        backgroundColor: "#FFE9A4",
        borderRadius: 14,
        maxHeight: "85%",
        margin: 18,
        padding: 18
    },
    separator: {
        color: "#DEDEDE",
        height: 1,
        opacity: 5,
        marginVertical: 16
    },
    heading: { color: 'grey', fontWeight: "600", marginBottom: Scale(4), textAlign:"left" },
    content: { color: 'black', fontWeight: "700", marginBottom: Scale(10), textAlign:"left" },
    amountStyle: { fontWeight: "bold", fontSize: 22, top: 2 },
    coinView:{flexDirection: "row", marginTop: 6, justifyContent: 'center' },
    coinText:{color: 'black', textAlign: 'center', fontWeight: 'bold', marginVertical: 8},
    thankyouText:{ color: 'black', textAlign: 'center', fontWeight: '700', marginVertical: 16 },
    imgStyle:{ flexDirection: "row", marginTop: 6 },
    invoiceStyle:{width:"50%"},
    invoiceView:{width:"100%"},
    rowView:{ flexDirection: "row", marginBottom:8 },
    termsConditionsStyle:{textAlign: 'center',textDecorationLine: 'underline', fontWeight:'bold', marginTop:4}
});

