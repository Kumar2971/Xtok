import React from "react";
import {
    getStorageData,
} from "../../../framework/src/Utilities";
//@ts-ignore //can't assign type in config.js
import { baseURL } from "../../../framework/src/config";
// Customizable Area Start
import { translate } from "../../../components/src/i18n/translate";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { Alert } from "react-native";
// Customizable Area End
export interface Props {
    navigation: any;
    route: any;
    id: string;
}
interface S {
    mobileNo: string;
    email: string;
    errorMsg: string;
    isEmailSel: boolean;
    errorShown: any;
    isCoinValue: number;
    isLoader: boolean;
    alertModal: any;
    language: any;
}
interface SS {
    id: any;
}
let payoutID: string;

export default class WithdrawMoneyController extends BlockComponent<
    Props,
    S,
    SS
> {
    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        this.state = {
            mobileNo: "",
            email: "",
            errorMsg: "",
            errorShown: false,
            isEmailSel: true,
            isCoinValue: this.props.route?.params?.withdrawCoinValue,
            isLoader: false,
            alertModal: { openAlertModal: false, alertMsg: "" },
            language: ''
        };
    }

    getAccountDetails = async () => {
        const authToken = await getStorageData("authToken", false) || "";
        let isBody = {
            items: {
                recipient_type: this.state.isEmailSel ? "EMAIL" : "PHONE",
                amount: {
                    value: this.state.isCoinValue,
                    currency: "USD"
                },
                receiver: this.state.isEmailSel ? "ok-we-are-not-using-your-account@test.com" : this.state.mobileNo
            }
        }
        console.log('isBody', isBody)
        const res = await fetch(`${baseURL}/withdraw_funds`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: authToken
            },
            body: JSON.stringify({ ...isBody })
        })
        const response = await res.json();
        console.log('response', response)
        if (response?.message) {
            const { batch_header } = response.message;
            payoutID = batch_header?.payout_batch_id ? batch_header.payout_batch_id : 0
            if (!batch_header?.payout_batch_id) {
                this.setState({ alertModal: { openAlertModal: true, alertMsg: translate("insufficient_coin_bal") } })
            }
            return payoutID;
        }
        this.setState({ isLoader: false })
        return null
    };

    confirmWithdraw = async (isId: any) => {
        let isStatus = await this.getStatus(isId);
        switch (isStatus) {
            case 'PROCESSING':
            case 'PENDING':
                await this.confirmWithdraw(isId);
                break;

            case 'SUCCESS':
                await this.onUpdateCoinPurchaseAfterSuccess(isStatus, isId);
                break;

            case 'DENIED':
                await this.props.navigation.replace('paymentsuccess', { result: "" });
                break;

            default:
                if (isId !== 0) {
                    Alert.alert(isStatus);
                }
                this.setState({ isLoader: false })
                break;
        }
    };

    getStatus = async (isId: any) => {
        const authToken = await getStorageData("authToken", false) || "";
        const res = await fetch(`${baseURL}/payout_batch?payout_batch_id=${isId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: authToken
            },
        })
        const response = await res.json();
        console.log('response payout_batch>>>>', response)
        if (response && response.data) {
            const { batch_header } = response?.data;
            const status = batch_header?.batch_status;
            return status ? status : 'Please try again after sometime'
        }
        this.setState({ isLoader: false })
        return 'Please try again after sometime'
    };

    onUpdateCoinPurchaseAfterSuccess = async (status: any, isId: any) => {
        const authToken = await getStorageData("authToken", false) || "";
        let isBody = {
            transaction_type: "withdrawal",
            amount: this.state.isCoinValue,
            status: status.toLowerCase(),
            payment_id: isId,
        }
        const res = await fetch(
            `${baseURL}/bx_block_cfappcoinsmanagement/coin_transactions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: authToken,
                },
                body: JSON.stringify({ ...isBody }),
            }
        );
        const response = await res.json();
        if (!response) {
            this.setState({ isLoader: false })
        }
        console.log('response coin_transaction>>>', response)
        if (response?.errors) {
            this.setState({ isLoader: false })
            return;
        }
        await this.props.navigation.replace("withdrawsuccess");
        //this.setState({isLoader :false})
    };

    isEmailMobileCheck = (value: any, text: any) => {
        if (value === 'email') {
            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if (text.length === 0) {
                this.setState({ errorMsg: "Email field required" })
                return false
            }
            else if (!regex.test(text)) {
                this.setState({ errorMsg: "Invalid email address" })
                return false
            } else {
                this.setState({ errorMsg: "" })
                return true
            }
        } else if (value === 'mobile') {
            let regex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
            if (text.length === 0) {
                this.setState({ errorMsg: "Phone field required" })
                return false
            }
            else if (!regex.test(text)) {
                this.setState({ errorMsg: "Invalid phone" })
                return false
            } else {
                this.setState({ errorMsg: "" })
                return true
            }
        }

        return false
    };

    _handleInputChange = (value: any, text: any) => {
        if (value === 'email') {
            this.setState({ email: text })
            this.isEmailMobileCheck("email", text);
        } else if (value === 'mobileNo') {
            this.setState({ mobileNo: text })
            this.isEmailMobileCheck("mobile", text);
        }
    };

    toggleChange = (value: any) => {
        if (value === 'email' && !this.state.isEmailSel) {
            this.setState({ errorShown: false, isEmailSel: true, errorMsg: "", email: "" })
        } else if (value === 'mobile' && this.state.isEmailSel) {
            this.setState({ errorShown: false, isEmailSel: false, errorMsg: "", mobileNo: "" })
        }
    };

    onClickButton = async () => {
        this.setState({ errorShown: true })
        let validationCheck: boolean = false
        if (this.state.isEmailSel) {
            validationCheck = this.isEmailMobileCheck("email", this.state.email);
        } else {
            validationCheck = this.isEmailMobileCheck("mobile", this.state.mobileNo);
        }
        if (validationCheck && !this.state.isLoader) {
            this.onWithdraw()
        }
    };

    onWithdraw = async () => {
        this.setState({ isLoader: true })
        const isId = await this.getAccountDetails()
        console.log('isId', isId)
        if (!isId) {
            this.setState({ isLoader: false })
        }
        await this.confirmWithdraw(isId)
    };

    onClickBackIcon = () => {
        this.props.navigation.goBack()
    };
}
