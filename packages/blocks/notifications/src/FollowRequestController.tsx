import { BlockComponent } from '../../../framework/src/BlockComponent';
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import MessageEnum, {
	getName,
} from '../../../framework/src/Messages/MessageEnum';
import { getStorageData } from '../../../framework/src/Utilities';
import { runEngine } from '../../../framework/src/RunEngine';
import { RNToasty } from 'react-native-toasty';

export const configJSON = require('./config');

export interface Props {
	navigation: any;
	id: string;
	// Customizable Area Start
	// Customizable Area End
}

interface S {
	// Customizable Area Start
	isLoading: boolean;
	listOfFollowRequests: any;
	selectedItem: any,
	showConfirmModal: boolean,
	language:string
	// Customizable Area End
}

interface SS {
	id: any;
	// Customizable Area Start
	// Customizable Area End
}

export default class FollowRequestController extends BlockComponent<
	Props,
	S,
	SS
> {
	getFollowListId: string = '';
	patchRequestAccount: string = '';

	constructor(props: Props) {
		super(props);
		this.receive = this.receive.bind(this);

		// Customizable Area Start
		this.subScribedMessages = [
			// Customizable Area Start
			getName(MessageEnum.RestAPIResponceMessage),
			getName(MessageEnum.SessionResponseMessage),
			// Customizable Area End
		];

		this.state = {
			// Customizable Area Start
			isLoading: false,
			listOfFollowRequests: [],
			selectedItem: null,
			showConfirmModal: false,
			language:''
			// Customizable Area End
		};
		runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

		// Customizable Area Start
		// Customizable Area End
	}

	fetchFollowings = async () => {
	};

	async componentDidMount() {
		 const language = await getStorageData("SelectedLng");
		 this.setState({language:language})
		this.getFollowRequest();
	}

	async receive(from: string, message: Message) {
		// Customizable Area Start
		runEngine.debugLog('Message Recived', message);
		if (getName(MessageEnum.SessionResponseMessage) === message.id) {
			let token = message.getData(
				getName(MessageEnum.SessionResponseToken)
			);
			runEngine.debugLog('TOKEN', token);
		} else if (
			this.getFollowListId ===
			message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
		) {
			const apiResponse = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage)
			);
			this.setState({ listOfFollowRequests: apiResponse.data });
		} else if (
			this.patchRequestAccount ===
			message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
		) {
			const apiResponse = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage)
			);
			const id = apiResponse?.data?.id;
			const listFollow = this.state.listOfFollowRequests
			const index = listFollow.findIndex((prod: any) => prod.id === id); //use id instead of index
			if (index > -1) { //make sure you found it
				listFollow.splice(index, 1);
				this.setState({ listOfFollowRequests: listFollow });
			}
			RNToasty.Show({
				title: apiResponse.message,
			});
			this.setState({ showConfirmModal: false });
		}
		// Customizable Area End
	}

	async getFollowRequest() {
		const authToken = (await getStorageData('authToken', false)) || '';
		const apiEndPoint = 'bx_block_request_management/requests';
		const getDataMsg = new Message(getName(MessageEnum.RestAPIRequestMessage));

		this.getFollowListId = getDataMsg.messageId;

		getDataMsg.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
			apiEndPoint
		);

		getDataMsg.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			JSON.stringify({
				'Content-Type': configJSON.apiContentType,
				token: authToken,
			})
		);

		getDataMsg.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.getDataMethod
		);

		runEngine.sendMessage(getDataMsg.id, getDataMsg);
	}

	onConfirmUser = async (item: any, status: number) => {
		const authToken = (await getStorageData('authToken', false)) || '';
		const apiEndPoint = `bx_block_request_management/requests/${item.id}`;
		const patchDataMsg = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);

		this.patchRequestAccount = patchDataMsg.messageId;

		patchDataMsg.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
			apiEndPoint
		);

		patchDataMsg.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			JSON.stringify({
				'Content-Type': configJSON.apiContentType,
				token: authToken,
			})
		);

		const body = {
			data: {
				status: status === 1 ? 'Accepted' : 'Rejected',
			},
		};

		patchDataMsg.addData(
			getName(MessageEnum.RestAPIRequestBodyMessage),
			JSON.stringify(body)
		);

		patchDataMsg.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.patchDataMethod
		);

		runEngine.sendMessage(patchDataMsg.id, patchDataMsg);
	};
}
