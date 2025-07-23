// Customizable Area Start
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import {
  initConnection,
  getProducts,
  endConnection,
  ProductPurchase,
  PurchaseError,
  purchaseUpdatedListener,
  purchaseErrorListener,
  SubscriptionPurchase,
  finishTransaction,
  getPurchaseHistory,
  requestPurchase
} from "react-native-iap";

export interface PreMadePackages {
  "id": number,
  "total_coins": number,
  "diamond_awards": number,
  "gold_awards": number,
  "silver_awards": number
  "coins_worth_value": number,
  "created_at": string,
  "updated_at": string,
  "transaction_type": string,
  "product_id": string,
  "platform": string
}


export const configJSON = require("./config");

export interface Props {
  preMadePackages : PreMadePackages [],
  onCompleteTransection : (body : any) => void,
}

interface S {
  productDetails : PreMadePackages [],
  showLoader : boolean,
  selectedProductId : string | null,
}

interface SS {
  id: any;
}

export default class InapppurchasingController extends BlockComponent<
  Props,
  S,
  SS
> {
  purchaseUpdateSubscription : any = null;
  purchaseErrorSubscription : any = null;
  completedTransectionDate : number[] = [];
  IOS_PRODUCT_IDS : string [] = ["Bronze_Package","Diamond_Package_GLV","Gold_Package","Platinum_Package",
  "Silver_Package","Titanium_Package"];
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      productDetails : [],
      showLoader : false,
      selectedProductId : null,
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

  }

  async componentDidMount() {
    this.setProductIdsFromProps(this.props.preMadePackages);
  }

  setProductIdsFromProps = async(preMadePackages : PreMadePackages[]) => {
    if(this.state.productDetails.length === 0 && Array.isArray(preMadePackages)){
      const productIds = preMadePackages.map(item=>`${item.product_id}`);
      if(productIds.length > 0){
      this.setState({showLoader : true},()=>{
        this.getProductDetails(productIds)
      });
      }
    }
  }

  async componentWillUnmount(){
    endConnection();
    this.purchaseUpdateSubscription.remove();
    this.purchaseErrorSubscription.remove();
  }

  purchase = async (sku: string) => {
    this.setState({selectedProductId : sku, showLoader : true});
    try {
      await requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err : any) {
      console.log(err.code, err.message);
    } finally{  
      this.setState({selectedProductId : null ,showLoader : false})
    }
  };

  handlePurchasedItems = async() => {
    try {
      const purchaseHistory = await getPurchaseHistory();
      if (purchaseHistory.length > 0) {
        for (const purchaseItem of purchaseHistory) {
          await finishTransaction({ purchase: purchaseItem, isConsumable: true });
          this.initiateTransectionApi(purchaseItem);
        }
      }
    } catch (error) {
      console.log("Error on get available purchases", error);
    }   
  }

  initIapListener = () => {

    try {
      this.purchaseUpdateSubscription = purchaseUpdatedListener(
        async(purchase: SubscriptionPurchase | ProductPurchase) => {
          const receipt = purchase.transactionReceipt;
          if (receipt) {
            await finishTransaction({purchase, isConsumable: true});
            this.initiateTransectionApi(purchase)
          } 
        },
      );

      this.purchaseErrorSubscription = purchaseErrorListener(
        (error: PurchaseError) => {
          console.log('purchaseErrorListener', error);
        },
      );
    } catch (errorReponse) {
    }
  };

  initiateTransectionApi = (purchase : ProductPurchase) => {
    if(this.completedTransectionDate.includes(purchase.transactionDate)){
      return;
    }
    this.completedTransectionDate.push(purchase.transactionDate);
    const purchasedItem = this.state.productDetails.find((item)=>item.product_id === purchase.productId);
    if(purchasedItem && purchase.transactionId){
      const body = {
        transaction_type: "purchase",
        amount: purchasedItem.coins_worth_value,
        coins_count: purchasedItem.total_coins,
        status: "success",
        payment_id: purchase.transactionId,
        tax_amount: null,
        package_id: purchasedItem.id,
        platform: "ios"
      };
      this.props.onCompleteTransection(body);
    }
  }

  getProductDetails = async(productIds : string []) => {
    await initConnection();
    getProducts({skus:productIds}).then((products:any [])=>{
      const appstoreProductIds = products.map((item)=>item.productId);
      const filteredProducts = this.props.preMadePackages.filter((item)=>appstoreProductIds.includes(item.product_id))
      this.setState({productDetails : filteredProducts},()=>{
        this.handlePurchasedItems();
        this.initIapListener();
      })
    }).catch((error)=>{
      console.log("error on getting products",error)
    }).finally(()=>{
      this.setState({showLoader : false});
    })
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const msgData = message.getData(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
    }
  }
}

// Customizable Area End
