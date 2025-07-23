import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import DraftList from "../../src/DraftList";
import { BackHandler } from 'react-native';
import { act } from 'react-test-renderer';
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";
import { waitFor } from "@testing-library/react-native";
// const navigation = require("react-navigation")

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
        push: jest.fn(),
        replace: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
        isFocused: jest.fn(),
        addListener: jest.fn().mockImplementation((event, callback) => {
            callback();
        }),
    },
    id: "DraftList"
}
const feature = loadFeature('./__tests__/features/DraftList-scenario.feature');


defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });
    test('User navigates to DraftList', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: DraftList;

        given('I am a User loading DraftList', () => {
            exampleBlockA = shallow(<DraftList route={undefined} {...screenProps} />);
        });

        when('I navigate to the DraftList', () => {
            instance = exampleBlockA.instance() as DraftList
        });

        then('DraftList will load with out errors', () => {

            let buttonPress = exampleBlockA.findWhere((node) => node.prop('testID') === 'backArrowKey');
            buttonPress.simulate('press')
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'newTouchKey');
            textInputComponent.simulate('press')
            // instance.emptyList()
            // instance.keyBookmarkExtractor(1)

            let data = {
                item: {
                    attributes: {
                        post_medias: {
                            thumnails: ""
                        }
                    }
                },
                index: 1
            }


            const filterData = {
                data: {
                    attributes: {
                        post_medias: {
                            thumnails: ['http://test.com']
                        }
                    },
                    id: "2",
                },
            };
            // instance.renderDrafts(data)
            let childwapper: ShallowWrapper;
            let FlatListRecomanded = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "flatListDrafts"
            );
            // renderItem wraper
            const renderItem = FlatListRecomanded.prop('renderItem')(filterData)


            const keyExtractor = FlatListRecomanded.prop("keyExtractor");

            const listOfEmptyComponent = FlatListRecomanded.prop("ListEmptyComponent");
            instance.emptyList()

            const renderItemInstance = FlatListRecomanded.prop('renderItem')
            const renderItemData = shallow(renderItemInstance({item: filterData.data }))
            const touchableOpacity = renderItemData.findWhere((node) => node.prop('testID') === 'clickNavDraft');
            touchableOpacity.simulate('press');

        });

        then('I can leave the screen with out errors', async() => {
            await instance.componentWillUnmount();
            instance.handleBackButtonClick();
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
