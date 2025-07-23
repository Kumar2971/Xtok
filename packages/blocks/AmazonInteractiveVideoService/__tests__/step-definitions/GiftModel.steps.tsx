import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import React from "react";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import GiftModel from "../../src/GiftModel";
import * as utils from "../../../../framework/src/Utilities";

const screenProps = {
    navigation: {
        goBack: jest.fn(),
        navigate: jest.fn(),
        addListener: jest.fn((key: string, callback: () => void) => {
            callback();
        }),
    },
    setGiftData: jest.fn(),
    setCategoryData: jest.fn(),
    setSelectedGift: jest.fn(),
    getParticipant: jest.fn(),
    setGiftModel: jest.fn(),
    setParticipantModel: jest.fn(),
    setParticipantLoader: jest.fn(),
    giftsModal: true,
};

const GiftModelFeature = loadFeature(
  "./__tests__/features/GiftModel-scenario.feature"
);
const mockgetStorageData = jest.spyOn(utils, "getStorageData")

defineFeature(GiftModelFeature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(global, 'setTimeout').mockImplementation((cb:any) => cb() );
    jest.spyOn(global, 'setInterval').mockImplementation((cb:any) => cb() );
    mockgetStorageData.mockImplementation((key) => {
      if("SelectedLng" === key) return Promise.resolve("ar")
      else return Promise.resolve("766")
    })
  });

  test("User navigates to GiftModel", ({ given, when, then }) => {
    let giftModelBlock: ShallowWrapper;
    let giftModelInstance: GiftModel;
   
    given("I am a User loading GiftModel", () => {
        giftModelBlock = shallow(<GiftModel {...screenProps} />);
        giftModelInstance = giftModelBlock.instance() as GiftModel;
    });

    when("I navigate to the GiftModel", () => {
      let CategoriesFlatListTest = giftModelBlock.findWhere(
    (node) => node.prop("testID") === "CategoriesFlatListTest"
);
CategoriesFlatListTest.prop('renderItem')({item:{item:{id:'0',attributes:{name:'hello'}}}})
CategoriesFlatListTest.simulate('keyExtractor',{id:''})
CategoriesFlatListTest.renderProp("ListEmptyComponent")();
    
      let categoryFlatlist = giftModelBlock.findWhere(
        (node) => node.prop("testID") === "CategoriesFlatListTest"
    );
      const categoryRenderItem = categoryFlatlist.prop('renderItem')({item:{item:{id:'0',attributes:{name:'hello'}}}})
      const categoryRender = shallow(categoryRenderItem)
      const touchableOpacity2 = categoryRender.findWhere((node) => node.prop('testID') === 'getCalalogue');
      touchableOpacity2.simulate('press');

  const giftsMockData = {data: [{attributes:{image:{url: "url", json : null, type: "image"}}},{attributes:{image:{url: "url2", json : {}, type: "json"}}}]};

//   const CategoryFlatListTest = giftModelBlock.findWhere(
//     (node) => node.prop("testID") === "CategoryFlatListTest"
//   );
//   CategoryFlatListTest.props().keyExtractor({}, 3);
//   const reportReasonItem = CategoryFlatListTest.renderProp('renderItem')({item:giftsMockData.data[0]})
//   CategoryFlatListTest.renderProp('renderItem')({item:giftsMockData.data[1]})
//   CategoryFlatListTest.renderProp('renderItem')({item:{}})
//   let getparticipant = reportReasonItem.findWhere(
//     (node) => node.prop("testID") === "getparticipant"
//   );
//   getparticipant.simulate("press");

    let addParticipant1 = giftModelBlock.findWhere(
    (node) => node.prop("testID") === "addParticipant1"
);
addParticipant1.simulate('press')

     let testButton6 = giftModelBlock.findWhere(
        (node) => node.prop("testID") === "testButton6"
    );
    testButton6.simulate('press')
    
  });

  then('get catalogue and coin data',()=> {
    const getcatlogApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getcatlogApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getcatlogApiCallId.messageId
      );
      getcatlogApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:{attributes:{donated_to_data:{full_name:'as'}}}}
      );
      giftModelInstance.getcatlogApiCallId = getcatlogApiCallId.messageId;
      runEngine.sendMessage("Unit Test", getcatlogApiCallId);

      getcatlogApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getcatlogApiCallId);

      const getcategoryApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getcategoryApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getcategoryApiCallId.messageId
      );
      getcategoryApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {data:[{id:0}]}
      );
      giftModelInstance.getcategoryApiCallId = getcategoryApiCallId.messageId;
      giftModelInstance.getAllGiftsDataApiId = [{catId:"0",apiId:getcategoryApiCallId.messageId}]
      runEngine.sendMessage("Unit Test", getcategoryApiCallId);

      getcategoryApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getcategoryApiCallId);

      const getcoinid = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getcoinid.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getcoinid.messageId
      );
      getcoinid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {coins_count:5}
      );
      giftModelInstance.getcoinid = getcoinid.messageId;
      runEngine.sendMessage("Unit Test", getcoinid);

      getcoinid.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {error:'ss'}
      );
      runEngine.sendMessage("Unit Test", getcoinid);

      let FlatListRecomanded2 = giftModelBlock.findWhere(
        (node) => node.prop("testID") === "CategoryFlatListTest"
    );
    const renderItem2 = FlatListRecomanded2.prop('renderItem')({item:{id:1,attributes:{image:{url:''},coins:10, }}})
    const renderItemData2 = shallow(renderItem2)
    let getparticipant = renderItemData2.findWhere(
      (node) => node.prop("testID") === "getparticipant"
      );
      getparticipant.simulate("press");
    renderItemData2.simulate('keyExtractor',{id:''})
    FlatListRecomanded2.renderProp("ListEmptyComponent")();

      let sendButton2 = giftModelBlock.findWhere(
          (node) => node.prop("testID") === "sendButton2"
      );
      sendButton2.simulate('press')
    })

then('close gift model',()=> {
    let crossButton1 = giftModelBlock.findWhere(
  (node) => node.prop("testID") === "crossButton1"
);
crossButton1.simulate('press')
giftModelInstance.componentWillUnmount()
})


});
})
