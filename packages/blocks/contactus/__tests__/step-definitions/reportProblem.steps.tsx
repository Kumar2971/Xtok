import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import ReportProblem from "../../src/ReportProblem";
// const navigation = require("react-navigation");

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
// export const configJSON = require("../../config.json");
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as utils from "../../../../framework/src/Utilities";
// import ImagePicker from "react-native-image-crop-picker";
import { View } from "react-native";

// contactUsApiCallId
const sendReportApiResponse: any = {"data":{"id":"62","type":"report_problem","attributes":{"description":"text added...","user":{"id":716,"first_name":null,"last_name":null,"full_phone_number":"919687806011","country_code":91,"phone_number":9687806011,"email":"test315@yopmail.com","activated":true,"device_id":null,"unique_auth_id":"tg343OBimg6lr58Qg6fC4Att","password_digest":"$2a$12$edfnVbafkYXPcrO2dDvlX.BFTS9suko6roPLqpr7.BS7.QxlGlG5i","created_at":"2023-04-05T04:18:01.470Z","updated_at":"2023-04-12T04:27:25.737Z","user_name":"Test315","platform":null,"user_type":null,"app_language_id":null,"last_visit_at":null,"is_blacklisted":false,"suspend_until":null,"status":"regular","stripe_id":null,"stripe_subscription_id":null,"stripe_subscription_date":null,"role_id":3,"full_name":"Test user","gender":null,"date_of_birth":"1992-04-04","age":null,"is_paid":false,"verified":true,"is_subscribed":false,"group_subscribed":false,"user_profile_data":null,"bio":null,"youtube":null,"instagram":null,"is_online":true,"nickname":null,"last_seen_at":"2023-04-12T04:27:25.688Z"},"images":[{"id":605,"url":"https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbDBDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3f3700866bca9e777674532e8650bfbc642074d3/Screenshot%202023-04-04%20at%2012.31.29%20PM.png"},{"id":606,"url":"https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbDRDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8f76446c10f01250637f85dc662eb7e41b427ef1/Screenshot%202023-03-29%20at%2011.16.09%20AM.png"}],"message":"Thanks for submit your feedback"}}};
const errorsResponse: any = {"errors":{"token": ""}};

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn()
  },
  id: "ReportProblem",
};

const feature = loadFeature("./__tests__/features/reportProblem-scenario.feature");

const obj = [
  {
    id:1,
    filename: "123.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    type: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:2,
    filename: "abc.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    type: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  }
]
const objwithImageType = [
  {
    id:1,
    filename: "123.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    mime: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:2,
    filename: "abc.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    mime: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  }
]

const imageArray = [
  {
    id:1,
    filename: "123.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    type: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:2,
    filename: "abc.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    type: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:3,
    filename: "123.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    type: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:4,
    filename: "abc.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    mime: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:5,
    filename: "123.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    mime: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:6,
    filename: "abc.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    mime: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:7,
    filename: "123.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    mime: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:8,
    filename: "abc.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    mime: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:9,
    filename: "123.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    mime: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  {
    id:10,
    filename: "abc.jpg",
    uri: '/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg',
    mime: "image/jpeg",
    name: "14E30C3D4-8621-4498-86E6-69BC4993E02E.jpg",
    path:"/Users/macm22/Library/Developer/CoreSimulator/Devices/93458AD8-AF00-4BED-9CEB-0D5F617D450D/data/Containers/Data/Application/2CD63ED3-7E14-42DA-A054-5326B36DC733/tmp/react-native-image-crop-picker/4E30C3D4-8621-4498-86E6-69BC4993E02E.jpg"
  },
  
]

const mockgetStorageData = jest.spyOn(utils, "getStorageData");
mockgetStorageData.mockResolvedValue("ar");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
  });

  test("User navigates to reportproblem", ({ given, when, then }) => {
    let ReportProblemWrapper: ShallowWrapper;
    let instance: ReportProblem;
    let flatListRenderWraper: ShallowWrapper;
    let itemObj: any;

    given("I am a User loading reportproblem", () => {
      //@ts-ignore
      ReportProblemWrapper = shallow(<ReportProblem {...screenProps} />);
    });

    when("I navigate to the reportproblem", () => {
      instance = ReportProblemWrapper.instance() as ReportProblem;
    });

    then("reportproblem will load with out errors", () => {
      expect(ReportProblemWrapper).toBeTruthy();
    });

    then("I can enter comment with out error", () => {
      let txtInputComponent = ReportProblemWrapper.findWhere(
        node => node.prop("testID") === "txtInputDescription"
      );
      txtInputComponent.simulate("changeText", "Your description here.");
      txtInputComponent.simulate("submitEditing");
    });
   
    then("I will upload Images without errors", () => {
      const { ImageSourceviewarray } = instance.state;
      itemObj = {
        item: ImageSourceviewarray[0] || [],
        index: 0
      }

      let buttonComponent = ReportProblemWrapper.findWhere(
        node => node.prop("testID") === "addphphotosBtn"
      );
      buttonComponent.simulate("press");

      let imageFlatlist = ReportProblemWrapper.findWhere(
        node => node.prop("testID") === "imageFlatlist"
      );
      imageFlatlist.props().renderItem(itemObj);
      imageFlatlist.props().keyExtractor("1");

      flatListRenderWraper = shallow(
        //@ts-ignore
        <View>
          {instance.renderImage(itemObj)};
        </View>
      );
    });

    then("I will delete Images without errors", () => {
      const {ImageSourceviewarray} = instance.state;
      itemObj = {
        item: ImageSourceviewarray[0] || [],
        index: 0
      }

      let buttonComponent = flatListRenderWraper.findWhere(
        node => node.prop("testID") === "deleteBtn"
      );
      buttonComponent.simulate("press");
    });

    then("I can select send report button with out error", () => {
      let buttonComponent = ReportProblemWrapper.findWhere(
        node => node.prop("testID") === "sendReportBtn"
      );
      buttonComponent.simulate("press");

      //send report apicall
      const sendReportProblemApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )
      sendReportProblemApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        sendReportProblemApiCallId.messageId
      )
      sendReportProblemApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        JSON.parse(JSON.stringify(sendReportApiResponse))
      )
      instance.sendReportProblemApiCallId = sendReportProblemApiCallId.messageId;
      runEngine.sendMessage('Unit Test', sendReportProblemApiCallId)

      instance.setReportModal(true);
      instance.goToNext();
    });

    then("I can select send report with error", () => { 
      let txtInputComponent = ReportProblemWrapper.findWhere(
        node => node.prop("testID") === "txtInputDescription"
      );
      txtInputComponent.simulate("changeText", "");

      let buttonComponent = ReportProblemWrapper.findWhere(
        node => node.prop("testID") === "sendReportBtn"
      );
      buttonComponent.simulate("press");
      //send report apicall
      const sendReportProblemApiCallId = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      )
      sendReportProblemApiCallId.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        sendReportProblemApiCallId.messageId
      )
      sendReportProblemApiCallId.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {"errors":{"token": ""}}
      )
      instance.sendReportProblemApiCallId = sendReportProblemApiCallId.messageId;
      runEngine.sendMessage('Unit Test', sendReportProblemApiCallId)


       buttonComponent = ReportProblemWrapper.findWhere(
          (node) => node.prop("testID") === "submitModal"
        );
      buttonComponent.simulate("popup");
    });

    then('I can close popup with ok button', () => {
      const goToNextMock =jest.spyOn(instance,"goToNext")
      let buttonComponent = ReportProblemWrapper.findWhere(
          (node) => node.prop("testID") === "okBtn"
        );
      buttonComponent.simulate("press");
      let submitModal = ReportProblemWrapper.findWhere(
        (node) => node.prop("testID") === "submitModal"
      );
      submitModal.simulate("requestClose")  
      expect(goToNextMock).toHaveBeenCalledTimes(1);
  });

    then("I can select send report button with image type", () => { 
      instance = ReportProblemWrapper.instance() as ReportProblem;
    });

    then("I can leave the screen with out errors", () => {
      let btnGoBack = ReportProblemWrapper.findWhere(
        (node:any) => node.prop("testID") === "btnGoBack"
      );
      btnGoBack.simulate("press");
      instance.handleErrorResponse(errorsResponse);
      instance.componentWillUnmount();
      expect(ReportProblemWrapper).toBeTruthy();
    });
  });

  test("User navigates to reportproblem with error", ({ given, when, then }) => {
    let ReportProblemWrapper: ShallowWrapper;
    let instance: ReportProblem;

    given("I am a User loading reportproblem with error", () => {
      //@ts-ignore
      ReportProblemWrapper = shallow(<ReportProblem {...screenProps} />);
    });

    when("I navigate to the reportproblem with error", () => {
      instance = ReportProblemWrapper.instance() as ReportProblem;
    });

    then("reportproblem will load with errors", () => {
      let txtInputComponent = ReportProblemWrapper.findWhere(
        node => node.prop("testID") === "txtInputDescription"     
      );
      txtInputComponent.simulate("changeText", "");
      expect(ReportProblemWrapper).toBeTruthy();
    });
  });

});
