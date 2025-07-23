/// <reference types="@types/jest" />

import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import React from "react";
import Loader from "../../src/Loader";

const feature = loadFeature("./__tests__/features/Loader-scenario.feature");

defineFeature(feature, (test) => {
  test("User navigates to Loader", ({
    given,
    when,
    then,
  }) => {
    let LoaderWrapper: ShallowWrapper;
   
    given("I am a User loading Loader", () => {
      LoaderWrapper = shallow(<Loader  />);
    });

    then("Loader will load with out errors", async() => {
      expect(LoaderWrapper).toBeTruthy();
    });
  })
});
