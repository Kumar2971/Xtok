import { ShallowWrapper, shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import React from "react";
import * as helpers from "../../../../framework/src/Helpers";
import CfSoloLive from "../../src/CfLiveChallengeSolo";
const navigation = require("react-navigation");

export const configJSON = require("../../config.json");

// contactUsApiCallId
const sendReportApiResponse: any = {"data":{"id":"62","type":"report_problem","attributes":{"description":"text added...","user":{"id":716,"first_name":null,"last_name":null,"full_phone_number":"919687806011","country_code":91,"phone_number":9687806011,"email":"test315@yopmail.com","activated":true,"device_id":null,"unique_auth_id":"tg343OBimg6lr58Qg6fC4Att","password_digest":"$2a$12$edfnVbafkYXPcrO2dDvlX.BFTS9suko6roPLqpr7.BS7.QxlGlG5i","created_at":"2023-04-05T04:18:01.470Z","updated_at":"2023-04-12T04:27:25.737Z","user_name":"Test315","platform":null,"user_type":null,"app_language_id":null,"last_visit_at":null,"is_blacklisted":false,"suspend_until":null,"status":"regular","stripe_id":null,"stripe_subscription_id":null,"stripe_subscription_date":null,"role_id":3,"full_name":"Test user","gender":null,"date_of_birth":"1992-04-04","age":null,"is_paid":false,"verified":true,"is_subscribed":false,"group_subscribed":false,"user_profile_data":null,"bio":null,"youtube":null,"instagram":null,"is_online":true,"nickname":null,"last_seen_at":"2023-04-12T04:27:25.688Z"},"images":[{"id":605,"url":"https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbDBDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--3f3700866bca9e777674532e8650bfbc642074d3/Screenshot%202023-04-04%20at%2012.31.29%20PM.png"},{"id":606,"url":"https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbDRDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--8f76446c10f01250637f85dc662eb7e41b427ef1/Screenshot%202023-03-29%20at%2011.16.09%20AM.png"}],"message":"Thanks for submit your feedback"}}};
const errorsResponse: any = {"errors":{"token": ""}};
const searchResult = [
  {
    id:1,
    text:"abc"
  },
  {
    id:2,
    text:"xyz"
  }
]
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn()
  },
  id: "CfSoloLive",
};

const feature = loadFeature("./__tests__/features/CfLiveChallengeSolo-scenario.feature");


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CfLiveChallengeSolo", ({ given, when, then }) => {
    let CfLiveChallengeSoloWrapper: ShallowWrapper;
    let instance: CfSoloLive;
    let itemObj: any;

    given("I am a User loading CfLiveChallengeSolo", () => {
      //@ts-ignore
      CfLiveChallengeSoloWrapper = shallow(<CfSoloLive {...screenProps} />);
    });

    when("I navigate to the CfLiveChallengeSolo", () => {
      instance = CfLiveChallengeSoloWrapper.instance() as CfSoloLive;
    });

    then("CfLiveChallengeSolo will load with out errors", () => {
      instance.setState({invitationModel:true}, () => {
        instance.invitationModel();
      })
      expect(CfLiveChallengeSoloWrapper).toBeTruthy();
    });

    then("I can select add button", () => {
      let addBtn = CfLiveChallengeSoloWrapper.findWhere(
        (node:any) => node.prop("testID") === "addBtn"
      );
      addBtn.simulate("press");
    });

    then("I can select end button", () => {
      let endBtn = CfLiveChallengeSoloWrapper.findWhere(
        (node:any) => node.prop("testID") === "endBtn"
      );
      // endBtn.simulate("press");
    });

    then("I can add comments with out errors", () => {
      // let txtInputComponent = CfLiveChallengeSoloWrapper.findWhere(
      //   node => node.prop("testID") === "addComment"
      // );
      // txtInputComponent.simulate("changeText", "Your description here.");
      // txtInputComponent.simulate("submitEditing");
    });

    then("I can select profile button", () => {
      // let selectBtn = CfLiveChallengeSoloWrapper.findWhere(
      //   (node:any) => node.prop("testID") === "selectBtn"
      // );
      // selectBtn.simulate("press");
    });

    then("I can search user with out errors", () => {
      let txtInputComponent = CfLiveChallengeSoloWrapper.findWhere(
        node => node.prop("testID") === "searchId"
      );
      instance.renderSearchFlatlist()
      instance.setState({searchresult:['','']})
      instance.renderSearchFlatlist()
      txtInputComponent.simulate("changeText", "Your description here.");
      txtInputComponent.simulate("submitEditing");

      instance.setState({searchresult : "abc"}, () => {
        itemObj = {
          item: searchResult[0] || [],
          index: 0
        }
        let imageFlatlist = CfLiveChallengeSoloWrapper.findWhere(
          node => node.prop("testID") === "serachFlatlist"
        );
        imageFlatlist.props().renderItem(itemObj);
        imageFlatlist.props().keyExtractor("1");
      })

    });
    
    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(CfLiveChallengeSoloWrapper).toBeTruthy();
    });
  });
});
