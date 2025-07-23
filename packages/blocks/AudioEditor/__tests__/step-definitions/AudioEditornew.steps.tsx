import { ShallowWrapper, shallow } from 'enzyme'
import { defineFeature, loadFeature } from "jest-cucumber"

import * as helpers from '../../../../framework/src/Helpers'
import * as utils from '../../../../components/src/Utilities'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AudioEditor from "../../src/AudioEditor"
import { Alert } from "react-native"
import { FFprobeKit,MediaInformationSession } from 'ffmpeg-kit-react-native'
const navigation = require("react-navigation")

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
        isFocused: jest.fn()
      },
    id: "AudioEditor",
    route: { params: {}},
  }


const feature = loadFeature('./__tests__/features/AudioEditor-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(Alert, 'alert');

    });

    test('User navigates to AudioEditor', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let exampleBlockB:ShallowWrapper;
        let instance:AudioEditor;

        given('I am a User loading AudioEditor', () => {
            exampleBlockA = shallow(<AudioEditor {...screenProps}/>);
        });

        when('I navigate to the AudioEditor', async() => {
             instance = exampleBlockA.instance() as AudioEditor

             const postTrimmedAudio = new Message(getName(MessageEnum.RestAPIResponceMessage))
             postTrimmedAudio.addData(getName(MessageEnum.RestAPIResponceDataMessage), postTrimmedAudio);
             postTrimmedAudio.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
                {}
            );
            postTrimmedAudio.addData(getName(MessageEnum.RestAPIResponceDataMessage), postTrimmedAudio.messageId);
            instance.postAudioCallId = postTrimmedAudio.messageId
            runEngine.sendMessage("Unit Test", postTrimmedAudio);

            const mockSession = {
                getReturnCode: jest.fn().mockResolvedValue({ isValueSuccess: () => true }),
                getMediaInformation: jest.fn().mockReturnValue({
                  getDuration: jest.fn().mockReturnValue('120.5'),
                }),
                setMediaInformation: jest.fn(),
                getCompleteCallback: jest.fn(),
                isFFmpeg: jest.fn(),
                isFFprobe: jest.fn(),
              } as unknown as MediaInformationSession; // Casting to avoid TypeScript errors
          
              const getMediaInformationMock = jest.spyOn(FFprobeKit, 'getMediaInformation');
              getMediaInformationMock.mockResolvedValue(mockSession);
          
              const session = await FFprobeKit.getMediaInformation('test-audio.mp3');
              const returnCode = await session.getReturnCode();
          
              expect(returnCode.isValueSuccess()).toBe(true);
          
              const mediaInfo = session.getMediaInformation();
              const duration = mediaInfo.getDuration();
          
              expect(duration).toBe('120.5');
              expect(getMediaInformationMock).toHaveBeenCalledWith('test-audio.mp3');
        });

        then('AudioEditor will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
            instance.setState({ fromValue: '1', toValue: '2' });
        });

        then('I can select the button with with out errors', () => {
            let textInputComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput2');
            textInputComponent2.simulate('changeText', 'hello@aol.com');
            console.debug('PROP ==>>',instance.props.route.params.clip.audio)
            instance.componentDidMount()
            instance.validateValues();
            instance.setState({ fromValue: null, toValue: null });
            instance.validateValues();
            instance.setState({ fromValue: '-1', toValue: '5' });
            instance.validateValues();
            instance.setState({ fromValue: '-10', toValue: '-15' });
            instance.validateValues();
            instance.setState({ fromValue: '2', toValue: '-5' });
            instance.validateValues();
            instance.formatTimes();
            instance.setState({ fromValue: '120', toValue: '150' });
            instance.formatTimes();
            instance.setState({ audioClip: { title: 'Peace' } })
            console.debug('State =>', instance.state.audioClip);
            instance.startDownloading()
            instance.setEnableField()
        });

        then('I can tap with out errors', () => {
            let touchableComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'backBtn');
            touchableComponent.simulate('press');
            let viewComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'mainView');
            expect(viewComponent).toBeInTheDocument;
            instance.setState({remoteAudio:`${utils.returnS3URL()}/minio/sbucket/mr4d6vrehomgae0lcsdhhikspmkm`})
        });

        then('I can tap2 with out errors', async() => {
            let touchableComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'saveBtn');
            touchableComponent.simulate('press');
            let touchableComponent2 = exampleBlockA.findWhere((node) => node.prop('testID') === 'playBtn');
            touchableComponent2.simulate('press');
            instance.doButtonPressed()
            instance.btnExampleProps.onPress()
            instance.txtInputWebProps.onChangeText('hi')
            instance.btnShowHideProps.onPress()
            // instance.componentDidMount()
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
