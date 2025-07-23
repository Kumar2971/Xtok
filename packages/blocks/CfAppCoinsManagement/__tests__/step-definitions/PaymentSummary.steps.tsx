/// <reference types="@types/jest" />

import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import * as utils from "../../../../framework/src/Utilities";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import PaymentSummary from "../../src/PaymentSummary";

const screenProps = {
    navigation: {
        state: { params: {} },
        dispatch: jest.fn(),
        goBack: jest.fn(),
        dismiss: jest.fn(),
        navigate: jest.fn(),
        openDrawer: jest.fn(),
        closeDrawer: jest.fn(),
        toggleDrawer: jest.fn(),
        getParam: jest.fn(),
        setParams: jest.fn(),
        addListener: jest.fn(),
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn(),
    },
    route: {
        params: {amount: 100, count:10}},
    id: "PaymentSummary"
};
const mockgetStorageData = jest.spyOn(utils, "getStorageData")

const feature = loadFeature("./__tests__/features/PaymentSummary-scenario.feature");

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
        mockgetStorageData.mockImplementation(() => {
            return Promise.resolve("ar")
        })
    });

    test("User clicks continue button", ({ given, when, then }) => {
        let paymentSummaryWrapper: ShallowWrapper;
        let instance: PaymentSummary;

        given("the PaymentSummary component is rendered", () => {
            paymentSummaryWrapper = shallow(
                <PaymentSummary {...screenProps} />
            );
        });

        when("I navigate to the PaymentSummary screen", async () => {
            instance = paymentSummaryWrapper.instance() as PaymentSummary;
            paymentSummaryWrapper.findWhere((node) => node.prop("testID") === "continue-button").simulate("press");
        });

        then("PaymentSummary will load with out errors", () => {
            expect(paymentSummaryWrapper).toBeTruthy();
        });

        then("I can select the button with with out errors", () => {
            const btn = paymentSummaryWrapper.findWhere(
                (node) => node.prop("testID") === "terms-conditions"
            );
            btn.simulate("press")
            const button = paymentSummaryWrapper.findWhere(node => node.prop("testID") === "btnExample");
            button.simulate("press")
        });

        then("they should be navigated to StripeIntegration with correct props", () => {
            expect(screenProps.navigation.navigate("StripeIntegration", { amount: 100, count: 10 }))
        });
    });
});



