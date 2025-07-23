// test-setup.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('react-native/Libraries/Utilities/Platform', () => {
    let platform = {
      OS: 'android',
    }
  
    const select = jest.fn().mockImplementation((obj) => {
      const value = obj[platform.OS]
      return !value ? obj.default : value
    })
  
    platform.select = select
  
    return platform
  });
  jest.mock('react-native-iap', () => { 
    const productList = [
      {
        productId : "Bronze_Package",
      },
      {
        productId : "Silver_Package",
      }
    ]
    mockFunction = jest.fn()
    return {
    initConnection: jest.fn(),
    endConnection: jest.fn(),
    getProducts: jest.fn((sku)=>{ return new Promise((resolve,reject)=>{
      resolve(productList)
    })}),
    flushFailedPurchasesCachedAsPendingAndroid: jest.fn(),
    clearTransactionIOS: jest.fn(),
    getSubscriptions : jest.fn() ,
    getAvailablePurchases : jest.fn(),
    purchaseUpdatedListener: jest.fn((callback)=>{
      const fakePurchase = {
        transactionReceipt: 'fakeTransactionReceipt',
        productId: 'Bronze_Package',
        transactionId: "123",
        transactionDate:123
      };
      callback(fakePurchase)
    }),
    getPurchaseHistory: jest.fn(()=>{ return new Promise((resolve,reject)=>{
      const purchaseHistory = [{productId: 'Bronze_Package', transactionId:'123', transactionDate:123}]
      resolve(purchaseHistory)
    })}),
    purchaseErrorListener: jest.fn((callback)=>{callback("error")}),
    finishTransaction: jest.fn(()=>true),
    requestSubscription : mockFunction.mockResolvedValue({
      productId : 'id',
      purchaseToken :'token',
      transactionReceipt : 'Receipt'
    })}
   });