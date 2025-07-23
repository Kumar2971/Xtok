import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import React from "react";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import ReportModal from "../../src/ReportModal";
import * as utils from "../../../../framework/src/Utilities";
import AlertModal from "../../../../components/src/AlertModal";

const screenProps = {
    navigation: {
        goBack: jest.fn(),
        navigate: jest.fn(),
        addListener: jest.fn((key: string, callback: () => void) => {
            callback();
        }),
    },
    isVisible:true,
    language:"en",
    onClose: jest.fn(),
    selectedGridId:1
};

const screenProps2 = {
    navigation: {
        goBack: jest.fn(),
        navigate: jest.fn(),
        addListener: jest.fn((key: string, callback: () => void) => {
            callback();
        }),
    },
    isVisible:true,
    language:"ar",
    onClose: jest.fn(),
    selectedGridId:1
};

const ReportModalFeature = loadFeature(
  "./__tests__/features/ReportModal-scenario.feature"
);
const mockgetStorageData = jest.spyOn(utils, "getStorageData")

defineFeature(ReportModalFeature, (test) => {
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

  test("User navigates to ReportModal", ({ given, when, then }) => {
    let ReportModalBlock: ShallowWrapper;
    let ReportModalBlock2: ShallowWrapper;
    let ReportModalInstance: ReportModal;
   
    given("I am a User loading ReportModal", () => {
        ReportModalBlock = shallow(<ReportModal {...screenProps} />);
        ReportModalBlock2 = shallow(<ReportModal {...screenProps2} />);
        ReportModalInstance = ReportModalBlock.instance() as ReportModal;
    });

    when("I navigate to the ReportModal", () => {

        const reportPostId = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          reportPostId.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            reportPostId.messageId
          );
          reportPostId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {data:{attributes:{account_id:1}}}
          );
          ReportModalInstance.reportPostId = reportPostId.messageId;
          runEngine.sendMessage("Unit Test", reportPostId);
    
          reportPostId.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {error:'ss'}
          );
          runEngine.sendMessage("Unit Test", reportPostId);

        const reasonList = ReportModalBlock.findWhere((node) => node.prop("testID") === "reasonFlatList");
        reasonList.props().keyExtractor({}, 3);
        expect(reasonList).toBeDefined();
        const reportReasonItem = reasonList.renderProp('renderItem')({item:{label:"as",value:"as"},index:0});

        let radioBtnId = reportReasonItem.findWhere((node) => node.prop('testID') === 'radioBtnId0');
        radioBtnId.simulate("press")

        let radioBtnValueId = reportReasonItem.findWhere((node) => node.prop('testID') === 'radioBtnValueId');
        radioBtnValueId.simulate("press")

        const reasonList2 = ReportModalBlock2.findWhere((node) => node.prop("testID") === "reasonFlatList");
        reasonList2.props().keyExtractor({}, 3);
        const renderItem2 = reasonList2.renderProp('renderItem')({item:{label:"Other",value:"Other"},index:2});

        let radioBtnId1 = renderItem2.findWhere((node) => node.prop('testID') === 'radioBtnId2');
        radioBtnId1.simulate("press")
    
        let radioBtnValueId1 = renderItem2.findWhere((node) => node.prop('testID') === 'radioBtnValueId');
        radioBtnValueId1.simulate("press")

        const onpressReport = ReportModalBlock.findWhere((node) => node.prop("testID") === "onpressReport")
        onpressReport.simulate("press")

        const AlertModal = ReportModalBlock.findWhere((node) => node.prop("testID") === "AlertModal")
        AlertModal.props().onPress2()

        const cancleBtnId = ReportModalBlock.findWhere((node) => node.prop("testID") === "cancleBtnId")
        cancleBtnId.simulate("press")
    })

then('close gift model',()=> {

ReportModalInstance.componentWillUnmount()
})


});
})
