// Customizable Area Start
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Inapppurchasing from "../../src/Inapppurchasing";
import { requestPurchase } from 'react-native-iap';
import { waitFor } from "@testing-library/react-native";

let mockFunction : any ;



const screenProps = {
  preMadePackages : [],
  onCompleteTransection : jest.fn((body : any)=>{}),
};

const feature = loadFeature('./__tests__/features/inapppurchasing-scenario.feature');


const mockProp={
  preMadePackages : [
    {
      "id": 1,
      "total_coins": 10,
      "diamond_awards": 0,
      "gold_awards": 0,
      "silver_awards": 0,
      "coins_worth_value": 50,
      "created_at": "",
      "updated_at": "",
      "transaction_type": "purchase",
      "product_id": "Bronze_Package",
      "platform": "ios"
    },
    {
      "id": 2,
      "total_coins": 20,
      "diamond_awards": 0,
      "gold_awards": 0,
      "silver_awards": 0,
      "coins_worth_value": 100,
      "created_at": "",
      "updated_at": "",
      "transaction_type": "purchase",
      "product_id": "Silver_Package",
      "platform": "ios"
    }
  ],
  onCompleteTransection : jest.fn((body : any)=>{}),
}

defineFeature(feature, (test) => {
  

  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
    jest.mock('react-native-iap', () => { 
      mockFunction = jest.fn()
      return {
      initConnection: jest.fn(),
      endConnection: jest.fn(),
      getProducts: jest.fn(),
      flushFailedPurchasesCachedAsPendingAndroid: jest.fn(),
      clearTransactionIOS: jest.fn(),
      getSubscriptions : jest.fn() ,
      getAvailablePurchases : jest.fn(),
      requestSubscription : mockFunction.mockResolvedValue({
        productId : 'id',
        purchaseToken :'token',
        transactionReceipt : 'Receipt'
      })}  
     });
  });

  test("User navigates to inapppurchasing without prop details", ({
    given,
  }) => {
    let inapppurchasingBlock: ShallowWrapper;

    given("I am a User loading inapppurchasing", () => {
        inapppurchasingBlock = shallow(
        <Inapppurchasing {...screenProps} />
      );
    });
  });

  test("User navigates to inapppurchasing with prop details",({
    given,
    when,
    then,
  }) => {
    let updatedBlock: ShallowWrapper;
    let updatedInstance: Inapppurchasing;

    given("I am a User loading inapppurchasing", () => {
      updatedBlock = shallow(<Inapppurchasing {...mockProp} />);
    });

    when("I navigate to the inapppurchasing", () => {
      updatedInstance = updatedBlock.instance() as Inapppurchasing;
      updatedBlock.setProps({Inapppurchasing : {...mockProp}})
    })

    then("I can see the product details with out error", async() => {
      const productList = updatedBlock.findWhere((node)=>node.prop("testID")==="productList");
      expect(productList).toBeTruthy()
      expect(productList.prop("data").length).toBe(2);
      const renderItem = productList.renderProp("renderItem")({item:mockProp.preMadePackages[0]})
      productList.renderProp('keyExtractor')({item:{id:1}})
      const payButton = renderItem.findWhere((node)=>node.prop("testID")=== "purchase");
      payButton.simulate("press");
      // Calling did mount to trigger the listener
      updatedInstance.componentDidMount();
      await waitFor(()=>{
        updatedBlock.update();
        expect(mockProp.onCompleteTransection).toHaveBeenCalled()
      })
    })

    then("I can leave the screen with out errors", () => {
      updatedInstance.componentWillUnmount();
      expect(updatedBlock).toBeTruthy();
    });
    });
});

// Customizable Area End
