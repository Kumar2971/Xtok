import React from "react";
// Customizable Area Start
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import CustomButton from "../../../components/src/Custombutton";
import FONTS from '../../../components/src/Fonts/Fonts';
import Scale from "../../../components/src/Scale";
import { translate } from "../../../components/src/i18n/translate";
import moment from "moment";
import { Input } from "react-native-elements";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { getStorageData } from "../../../framework/src/Utilities";
import { BestChoice, DollarCoin, LeftArrowIcon, Star, StarCoins, TikTokCoinIcon, backArrow, imgLeftArrow } from "./assets";
import balanceController, { Props } from "./balanceController";
import Inapppurchasing from "../../inapppurchasing/src/Inapppurchasing";
const { width, height } = Dimensions.get("window");
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End

export default class Balance extends balanceController {

    // Customizable Area Start
    constructor(props: Props) {
        super(props);
        // Customizable Area Start
        // Customizable Area End
    }
    async componentDidMount() {
        this.props.navigation.addListener("focus", async () => {
            const authToken = (await getStorageData('authToken', false)) || '';
            const language = await getStorageData("SelectedLng");
            this.setState({ token: authToken, language: language }, () => { console.log("Token", this.state.token) });
            this.setState({ isCustomCoinPurchase: false, isCustomCoinWithdrawal: false, isPackageCoinPurchase: false });
            this.getCurrentUserProfileDetails();
            this.getCoinBalance();
            this.getPreMadePackages();
            if (this.props.route.params.selectedIndex) {
                const index = this.props.route.params.selectedIndex
                this.setState({ selectedIndex: index })
            }
        });
    }
    // Customizable Area End

    toTitleCase = (txt: string) => {
        return txt.replace(/\b(\w)/g, k => k.toUpperCase())
    }

    topHeaderSettings = () => {
        return (
            <View style={[styles.headercontainer, styles.divider]}>
                <TouchableOpacity
                    testID="backButtonID"
                    onPress={() => {
                        if (this.props.route.params.isFromLiveChallenge) {
                            this.props.navigation.goBack();
                        } else {
                            this.props.navigation.navigate('Wallet')
                        }
                    }}>
                    <Image source={imgLeftArrow}
                        style={[styles.backarrow_style_en, this.state.language == 'ar' && styles.backarrow_style]} />
                </TouchableOpacity>
                <Text style={[styles.headerText, { fontFamily: FONTS.MontserratRegular }]}>{translate("Wallet")}</Text>
                <View />
            </View>
        );
    };

    handleIndexChange = (index: any) => {
        this.setState({ selectedIndex: index, coins_worth: null, withdrawCoinValue: null, coins_count: null },
            () => { if (this.state.selectedIndex === 1) { this.getAllCoinTransactions() } });
    }

    toggleModalVisibility = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    currentBalance = () => {
        return (
            <View style={{ display: 'flex', justifyContent: 'flex-start', marginHorizontal: 15, flex: 1 }}>
                <View style={styles.textWrapper}>
                    <Text style={{ fontSize: 14, color: '#A4A4A4', fontFamily: FONTS.MontserratRegular }}>{translate("current_Balance")}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginVertical: 4 }}>
                    <View style={{ marginHorizontal: 10 }}>
                        <Image source={TikTokCoinIcon} style={{ width: 40, height: 40 }} />
                    </View>
                    <View><Text testID="coinsCountTxt" style={{ fontSize: 24, color: '#A4A4A4', fontFamily: FONTS.MontserratRegular }}>{this.getFormattedCoinValue()}</Text></View>
                </View>

                <View style={styles.textWrapper}>
                    <Text><Text style={{ fontFamily: FONTS.MontserratBold }}>${this.state.coinBalance?.coins_worth_value ? this.state.coinBalance?.coins_worth_value.toString().indexOf('.') == -1 ? this.state.coinBalance?.coins_worth_value : Number(this.state.coinBalance?.coins_worth_value).toFixed(2) : '0'}</Text><Text style={{ fontSize: 12, fontFamily: FONTS.MontserratRegular }}> ({translate("estimated")})</Text></Text>
                </View>

                <View style={{ marginVertical: 10, backgroundColor: '#FFE9A4', borderRadius: 10 }}>
                    <SegmentedControlTab
                        testIDs={['testID1', 'testID2', 'testID3']}
                        values={[translate("deposit"), translate("history")]}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleIndexChange}
                        tabStyle={{ borderColor: '#FFE9A4', backgroundColor: '#FFE9A4', borderRadius: 8, margin: 5 }}
                        activeTabTextStyle={{ color: 'black' }}
                        activeTabStyle={{ backgroundColor: '#FFC925', borderRadius: 8, margin: 5 }}
                        tabTextStyle={{ color: 'black', fontFamily: FONTS.MontserratRegular, fontWeight: "bold" }}
                    />
                </View>

                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: "flex-end", marginTop: 4 }}>
                    <Text style={{ fontSize: 10, fontFamily: FONTS.MontserratSemiBold }}>{translate("user_GoLavi_Coins_to_support")}{'\n'}{translate("your_favourite_creators")}</Text>
                    {/* <Text style={{ textDecorationLine: 'underline', fontSize: 10, fontFamily: FONTS.MontserratSemiBold,fontWeight:"bold" }}>{translate("learn_More")}</Text> */}
                </View>

                {this.renderSelectedIndex()}
            </View>
        );
    };

    // Customizable Area Start
    renderSelectedIndex = () => {
        return (
            <>
            {
                this.state.selectedIndex == 0 ?
                <View style={{ flex: 1 }}>
                    <View style={[{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: "flex-start", marginTop: 10 }]}>
                        <Text style={{ fontSize: 15, fontFamily: FONTS.MontserratSemiBold }}>{translate("recharge")}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', marginVertical: 5 }}>
                            <Input
                                testID="textInputId"
                                inputStyle={[styles.input, this.state.language == "ar" && { textAlign: "right" }]}
                                placeholder={translate("enter_number_of_coins")}
                                multiline={true}
                                maxLength={10}
                                placeholderTextColor={'#ddd'}
                                value={this.state.coins_count}
                                leftIcon={
                                    <Image source={TikTokCoinIcon} style={{ width: 25, height: 25, marginRight: 5 }} />
                                }
                                leftIconContainerStyle={{
                                    marginLeft: 0
                                }}
                                containerStyle={{
                                    padding: 0,
                                    paddingHorizontal: 0
                                }}
                                inputContainerStyle={{
                                    padding: 0,
                                    paddingHorizontal: 0,
                                }}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    if (!text.replace(/[^0-9]/g, '')) {
                                        this.setState({ coins_worth: null })
                                    }
                                    this.setState({ coins_count: text.replace(/[^0-9]/g, '') })
                                    setTimeout(() => {
                                        this.getCoinsWorth(text, 'purchase');
                                    }, 1000)
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ alignSelf: 'baseline', marginVertical: 10 }}>
                        <CustomButton testID="buyButton" title={`${this.getBuyButtonTitle()}`}
                            onPress={() => {
                                this.setState({ isCustomCoinPurchase: true });
                                this.props.navigation.navigate('PaymentSummary', { amount: this.state.coins_worth, count: this.state.coins_count })
                            }}
                            style={this.state.coins_worth ? {} : { backgroundColor: '#ccc' }}
                            TextStyle={{ color: "black" }}
                            disabled={!this.state.coins_count || !this.state.coins_worth}
                        />
                    </View>

                    {Platform.OS === "ios" && this.state.ListPreMadePackages?.length > 0 ? 
                    <Inapppurchasing preMadePackages={this.state.ListPreMadePackages} onCompleteTransection={this.onCompleteInAppPurchase}/> :
                    <View style={{ flex: 1 }}>
                        <FlatList
                            testID="flist1"
                            contentContainerStyle={{ paddingBottom: 5, paddingEnd: 10 }}
                            data={this.state.ListPreMadePackages}
                            renderItem={({ item }: { item: any }) =>
                                <View style={[styles.flatListParent]}>
                                    <View style={{ width: '25%' }}>
                                        <Image source={StarCoins} style={{ width: 80, height: 80, marginRight: 5 }} />
                                        {item?.bestOffer && <Image source={BestChoice} style={{ width: 50, height: 50, marginRight: 5, position: 'absolute', top: 50, left: 30 }} />}
                                    </View>
                                    <View style={{ width: '75%' }}>
                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignContent: 'center', marginVertical: 5 }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', marginVertical: 5 }}>
                                                <Image source={TikTokCoinIcon} style={{ width: 30, height: 30, marginRight: 5 }} />
                                                <Text style={{ fontSize: 24, fontFamily: FONTS.MontserratSemiBold }}>{item?.total_coins}</Text>
                                            </View>
                                            {!item?.bestOffer &&
                                                <View style={{ backgroundColor: '#FFC925', paddingVertical: 4, paddingHorizontal: 20, borderRadius: 6, marginRight: 5 }}>
                                                    <TouchableOpacity testID="testButton2" onPress={() => {
                                                        this.setState({ isPackageCoinPurchase: true });
                                                        // this.props.navigation.navigate('StripeIntegration', { amount: item.coins_worth_value, count: item?.total_coins, packageId: item?.id})
                                                        this.props.navigation.navigate('PaymentSummary', { amount: item.coins_worth_value, count: item?.total_coins, packageId: item?.id })
                                                    }}
                                                    >
                                                        <Text style={{ fontFamily: FONTS.MontserratBold }}>${item.coins_worth_value}</Text>
                                                    </TouchableOpacity>
                                                </View>}
                                        </View>
                                        <View style={styles.textWrapper}>
                                            <Text style={{ display: 'flex', fontSize: 10, flexWrap: 'wrap', marginVertical: 5, marginBottom: 10, fontFamily: FONTS.MontserratRegular }}>
                                                {`${translate("give")} ${item?.diamond_awards} ${translate("diamond")}, ${translate("or")} ${item?.gold_awards} ${translate("gold")}, ${translate("or")} ${item?.silver_awards} ${translate("silvers_awards")}`}
                                            </Text>
                                        </View>
                                        {item?.bestOffer &&
                                            <View style={{ width: '70%' }}>
                                                <CustomButton testID="testButton3" title={'$ ' + item.coins_worth_value}
                                                    onPress={() => {
                                                        this.setState({ isPackageCoinPurchase: true });
                                                        this.props.navigation.navigate('StripeIntegration', { amount: item.coins_worth_value, count: item?.total_coins })
                                                    }}
                                                />
                                            </View>}
                                    </View>
                                </View>
                            }
                            keyExtractor={item => item?.id}
                        />
                    </View>
    }
                </View>
                : this.selectedIndexFn()
            }
            </>
        )
    }
    selectedIndexFn = () => {
        return this.state.selectedIndex == 2 ?
            <View style={{ flex: 1 }}>
                <View style={[{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', alignItems: "flex-start", marginTop: 10 }]}>
                    <Text style={{ fontSize: 15, fontFamily: FONTS.MontserratSemiBold }}>{translate("customer")}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', marginVertical: 5 }}>
                        <Input
                            testID="customTextInput"
                            inputStyle={[styles.input, this.state.language == "ar" && { textAlign: "right" }]}
                            placeholder={translate("enter_your_custom_amount")}
                            multiline={true}
                            placeholderTextColor={'#ddd'}
                            value={this.state.withdrawCoinValue}
                            leftIcon={
                                <Image source={DollarCoin} style={{ width: 25, height: 25, marginRight: 5 }} />
                            }
                            leftIconContainerStyle={{
                                marginLeft: 0
                            }}
                            containerStyle={{
                                padding: 0,
                                paddingHorizontal: 0
                            }}
                            inputContainerStyle={{
                                padding: 0,
                                paddingHorizontal: 0,
                            }}
                            keyboardType="numeric"
                            maxLength={10}
                            onChangeText={(text) => {
                                if (text.charAt(0) != '0') {
                                    this.setState({ withdrawCoinValue: text.replace(/[^0-9]/g, '') })
                                    setTimeout(() => {
                                        this.getCoinsWithdrawalCriteria(text);
                                    }, 1000)
                                }
                            }}
                        />
                    </View>
                </View>

                <View style={{ width: '50%', marginVertical: 10 }}>
                    <CustomButton
                        testID="withdrawBtn"
                        title={`${this.state.withdrawCoinValue ? '$' + this.state.withdrawCoinValue : translate("withdraw")}`}
                        onPress={() => {
                            this.props.navigation.navigate('withdrawMoney', { withdrawCoinValue: this.state.withdrawCoinValue, coins_worth: this.state.coins_worth })
                        }}
                        style={this.state.withdrawCoinValue ? {} : { backgroundColor: '#ccc' }}
                        disabled={!this.state.withdrawCoinValue}
                    />
                </View>

                <View style={{ display: 'flex', flex: 1, paddingBottom: 15 }}>
                    <View style={{ borderColor: '#C9C9C9', borderRadius: 5, padding: 10, borderWidth: 1, marginBottom: 10 }}>
                        <View style={styles.textWrapper}>
                            <Text style={{ fontSize: 17, marginBottom: 15, fontFamily: FONTS.MontserratSemiBold, color: '#ABABAB' }}>{translate("about_the_password")}</Text>
                        </View>
                        <View>
                            <FlatList
                                testID="aboutFlatlist"
                                data={this.state.aboutThePassword}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={[styles.textWrapper, { marginBottom: 5 }]}>
                                            <Text style={{ fontSize: 12, color: '#C9C9C9' }}>{index + 1}. {item}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ borderColor: '#C9C9C9', borderRadius: 5, padding: 10, borderWidth: 1, flex: 1 }}>
                        <View style={styles.textWrapper}>
                            <Text style={{ fontSize: 17, marginBottom: 15, fontFamily: FONTS.MontserratSemiBold, color: '#ABABAB' }}>{translate("withdraw_Rules")}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                testID="withdrawRulesList"
                                data={this.state.withdrawRules}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={[styles.textWrapper, { marginBottom: 5 }]}>
                                            <Text style={{ fontSize: 12, color: '#C9C9C9' }}>{index + 1}. {item}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </View>
                </View>

            </View>
            :
            <View style={{ marginTop: 10 }}>
                <View style={styles.textWrapper}>
                    <Text style={{ fontSize: 16, fontFamily: FONTS.MontserratSemiBold, marginBottom: 15 }}>{translate("Recent_Activity")}</Text>
                </View>
                <View style={{ height: height * 0.55 }}>
                    <FlatList
                        testID="flatList2"
                        data={this.state.ListTransactionsOfAnAccount}
                        ListEmptyComponent={this._listEmptyComponent}
                        renderItem={({ item }: { item: any }) =>
                            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, paddingEnd: 15 }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Image source={Star} style={{ width: 40, height: 40 }} />
                                    </View>
                                    <View style={{ paddingLeft: 5 }}>
                                        <Text style={styles.transactionType}>{this.toTitleCase(item?.transaction_type)}</Text>
                                        <Text style={styles.reasonTxt}>{this.toTitleCase(item?.reason || translate("Account"))}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 5 }}>
                                        <Text style={{ fontSize: 12, color: '#858585', fontFamily: FONTS.MontserratRegular }}>{moment(item?.created_at).format('YYYY-MM-DD hh:mm:ss')}</Text>
                                        <Image source={this.state.language == "ar" ? backArrow : LeftArrowIcon} style={{ width: 5, height: 10, marginLeft: 5 }} />
                                    </View>
                                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                        <Image source={TikTokCoinIcon} style={[{ width: 20, height: 20 }, this.state.language == "ar" && { marginRight: 10 }]} />
                                        <Text style={{ fontSize: 12, paddingLeft: 10, color: '#858585', fontFamily: FONTS.MontserratRegular }}><Text style={{ color: '#64d7aa' }}>{item?.coins_count}</Text>/$<Text>{item?.amount}</Text></Text>
                                    </View>
                                </View>
                            </View>
                        }
                        keyExtractor={(item) => item?.id}
                    />
                </View>
            </View>
    }
    _listEmptyComponent = () => {
        return (
            <View>
                <Text style={styles.emptyList}>{translate("No_Recent_Activities")}</Text>
            </View>
        )
    }
    withDrawalModal = () => {
        return (
            <Modal animationType="slide"
                transparent visible={this.state.isModalVisible}
                presentationStyle="overFullScreen"
            >
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Input
                            testID="coinTextInput"
                            inputStyle={[styles.input, this.state.language == "ar" && { textAlign: "right" }]}
                            placeholder={translate("enter_number_of_coins")}
                            multiline={true}
                            placeholderTextColor={'#ddd'}
                            value={this.state.withdrawCoinValue}
                            leftIconContainerStyle={{
                                marginLeft: 0
                            }}
                            containerStyle={{ padding: 0, paddingHorizontal: 0 }}
                            inputContainerStyle={{
                                padding: 0,
                                paddingHorizontal: 15,
                                marginHorizontal: 10
                            }}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                this.setState({ withdrawCoinValue: text.replace(/[^0-9]/g, '') })
                                setTimeout(() => {
                                    this.getCoinsWithdrawalCriteria(text);
                                    this.getCoinsWorth(text, 'withdrawal');
                                }, 1000)
                            }}
                        />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginVertical: Scale(10) }}>
                            <CustomButton testID="closeBtn" title="Close" style={{ marginRight: Scale(10) }} onPress={() => {
                                this.setState({ coins_worth: null, withdrawCoinValue: null })
                                this.toggleModalVisibility()
                            }} />
                            <CustomButton testID="withdrawBtn1" title={`${this.state.coins_worth ? '$' + this.state.coins_worth : translate('withdraw')}`}
                                onPress={() => {
                                    this.setState({ isCustomCoinWithdrawal: true });
                                    this.state.withdrawCoinValue && this.state.isValidWithDrawal && this.customCoinWithdrawal(this.state.withdrawCoinValue, this.state.coins_worth)
                                }}
                                disabled={this.state.isCustomCoinWithdrawal || !this.state.isValidWithDrawal}
                            />
                        </View>
                    </View>
                </View>
            </Modal>);
    };
    // Customizable Area End
    render() {
        // Customizable Area Start
        // Customizable Area End
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    {/* Customizable Area Start */}
                    {this.topHeaderSettings()}
                    {this.currentBalance()}
                    {this.withDrawalModal()}
                    {/* Customizable Area End */}
                </SafeAreaView>
            </View>
        );
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: 650,
    },
    headercontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Scale(5),
        height: Scale(40),
        width: "100%",
        borderBottomColor: "#B7BBC0",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 10
    },
    headerText: {
        fontSize: Scale(18),
        fontFamily: FONTS.MontserratBold,
        marginRight: 35,
        fontWeight: "bold",
    },
    backarrow_style: {
        transform: [{ rotate: "180deg" }]
    },
    backarrow_style_en: {
        width: Scale(25),
        height: Scale(25),
        resizeMode: "contain",
    },
    icon: {
        width: Scale(35),
        height: Scale(35),
        resizeMode: "contain"
    },
    divider: {
        borderBottomColor: "#B7BBC0",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 5,
        marginHorizontal: 15
    },
    item: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: Scale(5)
    },
    title: {
        fontSize: Scale(16),
        fontStyle: 'normal',
        fontFamily: FONTS.MontserratRegular,
        textAlign: "left",
        marginVertical: 8,
        marginHorizontal: 14
    },
    input: {
        width: '90%',
        fontSize: 16,
        paddingTop: 10,
    },
    flatListParent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        // paddingHorizontal: 5,
        marginBottom: 10,
        borderColor: '#FFC925',
        borderRadius: 10,
        borderWidth: 1
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 160,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderColor: '#FFC925',
        borderWidth: .5
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginVertical: Scale(15),
    },
    emptyList: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center'
    },
    textWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    transactionType: {
        fontSize: 12,
        marginBottom: 10,
        fontFamily: FONTS.MontserratSemiBold,
        textAlign: "left"
    },
    reasonTxt: {
        fontSize: 12,
        color: '#858585',
        fontFamily: FONTS.MontserratRegular,
        textAlign: "left"
    },
});
// Customizable Area End