import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React, { useEffect } from "react";
import VideoTrimming from "../../src/VideoTrimming"
import { ViewSwitcher } from "../../src/VideoTrimming"
import { VideoTrimmingFunction } from "../../src/constant"
import { ProgressModal, getDestFilePath } from "../../src/CommonFile"
import VideoEffect from "../../src/components/VideoEffect/VideoEffect"
import VideoTimeMagic from "../../src/components/VideoTimeMagic/VideoTimeMagic"
import VideoGraffitiModal from "../../src/components/VideoGraffiti/VideoGraffitiModal"
import VideoFilterModal from "../../src/components/VideoFilter/VideoFilterModal"
import TransitionOption from "../../src/components/VideoFilter/components/TransitionOption"
import {TransitionOption as GraffitiTransition} from "../../src/components/VideoGraffiti/components/TransitionOption"
import AudioOption from "../../src/components/VideoEdit/components/AudioOption"
import CanvasOption from "../../src/components/VideoEdit/components/CanvasOption"
import RotateOption from "../../src/components/VideoEdit/components/RotateOption"
import SortOption from "../../src/components/VideoEdit/components/SortOption"
import SpeedOption from "../../src/components/VideoEdit/components/SpeedOption"
import VideoEditingModal from "../../src/components/VideoEdit/VideoEditingModal"
import CopyOption from "../../src/components/VideoEdit/components/CopyOption"
import FreezeOption from "../../src/components/VideoEdit/components/FreezeOption"
import MirrorOption from "../../src/components/VideoEdit/components/MirrorOption"
import SplitOption from "../../src/components/VideoEdit/components/SplitOption"
import {TransitionOption as VideoEditTransition} from "../../src/components/VideoEdit/components/TransitionOption"
import VideoCover from "../../src/components/VideoCoverModal/VideoCover"
import CoverEmojiPicker from "../../src/components/VideoCoverModal/components/CoverEmojiPicker"
import { EmojiData } from "../../src/components/VideoCoverModal/components/EmojiData"
import VideoProgress from "../../src/components/VideoProgress/VideoProgress"
import VideoRecordModal from "../../src/components/VideoRecord/VideoRecordModal"
import {VideoSubtitle} from "../../src/components/VideoSubtitle/VideoSubtitle"
import VideoSubtitleColor from "../../src/components/VideoSubtitle/components/VideoSubtitleColor"
import VideoSubtitleFonts from "../../src/components/VideoSubtitle/components/VideoSubtitleFonts"
import VideoSubtitleTextSize from "../../src/components/VideoSubtitle/components/VideoSubtitleTextSize"
import { VideoPicker } from "../../src/VideoTrimmingController"


const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
            params: {
                mediadetails:{},
                bucketDetails:{}
            }
        },
        dispatch: jest.fn(),
            dismiss: jest.fn(),
            getParam: jest.fn(),
            setParams: jest.fn(),
            addListener: jest.fn((_, callback) => callback()),
            push: jest.fn(),
            replace: jest.fn(),
            pop: jest.fn(),
            isFocused: jest.fn(),
    },
    id: "VideoTrimming",
    route: { params: { videoData: [{
        id: 0,
        uri: "asd",
        duration: 5000,
        type: "video",
        start: 0,
        end: 5000,
        poster: 'asd',
        degree: 0,
        isMuted: false,
        audio: ''
      }], mediadetails: {} ,bucketDetails:{}} }
}

const newScreenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
            params: {
                mediadetails:{},
                bucketDetails:{}
            }
        },
            dispatch: jest.fn(),
            dismiss: jest.fn(),
            getParam: jest.fn(),
            setParams: jest.fn(),
            addListener: jest.fn((_, callback) => callback()),
            push: jest.fn(),
            replace: jest.fn(),
            pop: jest.fn(),
            isFocused: jest.fn(),
    },
    id: "VideoTrimming",
    route: { params: { videoData: [], mediadetails: {} ,bucketDetails:{}} }
}

let switchProps = {
    onSelectMagic: (type: string) => { },
    isProcessing: false,
    onEffectSelect: (category: any, type: any, command: any) => { },
    onFilterEdit: (category: any, type: any, command: any) => { },
    onFilterToggle: (type: string) => { },
    selectedUri: "http://techslides.com/demos/sample-videos/small.mp4",
    selectedTab: VideoTrimmingFunction.filter,
    videoData: [{
        id: 0,
        uri: "asd",
        duration: 5000,
        type: "video",
        start: 0,
        end: 5000,
        poster: 'asd',
        degree: 0,
        isMuted: false,
        audio: ''
      }],
    onSingleVideo: (video: string) => { },
    onClose: () => { },
    onEditFeature: (allVideo: VideoPicker[]) => { },
    poster:"",
    selectedId:0,
    selectedVideo:{
        id: 0,
        uri: "asd",
        duration: 5000,
        type: "video",
        start: 0,
        end: 5000,
        poster: 'asd',
        degree: 0,
        isMuted: false,
        audio: ''
      }
}

const feature = loadFeature('./__tests__/features/VideoTrimming-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.useFakeTimers();
    });

    test('User navigates to VideoTrimming', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: VideoTrimming;
        let switcher: ShallowWrapper
        let progress: ShallowWrapper
        let filterVideo:ShallowWrapper;
        let filterTransition:ShallowWrapper;

        given('I am a User loading VideoTrimming', () => {
            exampleBlockA = shallow(<VideoTrimming {...screenProps} />);
            shallow(<VideoTrimming {...newScreenProps} />);
            progress = shallow(<ProgressModal isProcessing={false} />)
        });

        when('I navigate to the VideoTrimming', () => {
            instance = exampleBlockA.instance() as VideoTrimming
        });

        then('VideoTrimming will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            const musicData = {
                play: (onEnd?: (success: boolean) => void) => jest.fn(),
                pause: () => jest.fn(),
                stop: (onStop?: () => void) => jest.fn(),
                setCurrentTime: (seconds: number) => jest.fn(),
                getCurrentTime: (callback: (seconds: number) => void) => jest.fn(),
                setVolume: (volume: number) => jest.fn(),
                setPan: (panId: number) => jest.fn(),
                setNumberOfLoops: (numberOfLoops: number) => jest.fn(),
                release: jest.fn(),
                getDuration: jest.fn(),
                getNumberOfChannels: jest.fn(),
                getVolume: jest.fn(),
                getPan: jest.fn(),
            }
            //mocking music data
            instance.selectedMusicFile = musicData;
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'releaseTab');
            buttonComponent.simulate('press');
            instance.setState({editing:true})
            instance.doButtonPressed()
            instance.setEnableField()
            instance.handleToggleEditing()
            instance.playAudio()
            // let path=getFilePath()
            let destPath=getDestFilePath()
            let goBackBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'goBack');
            // goBackBtn.simulate('press');
            let nextButton = exampleBlockA.findWhere((node) => node.prop('testID') === 'nextButtonTest');
            // nextButton.simulate('press');
            const pauseBtn = exampleBlockA.findWhere((node) =>node.prop('testID') === "pause")
            // pauseBtn.simulate('press');
            const videoBtn = exampleBlockA.findWhere((node) =>node.prop('testID') === "video")
            // videoBtn.simulate('progress',{currentTime:0,seekableDuration:5})
            const switchertestBtn = exampleBlockA.findWhere((node) =>node.prop('testID') === "switchertest")
            switchertestBtn.simulate('singleVideo','uri')
            switchertestBtn.simulate('close')
            switchertestBtn.simulate('editFeature',[{id:0,uri:'uri'}])
            switchertestBtn.simulate('filterToggle','uri')
            const transBtn = exampleBlockA.findWhere((node) =>node.prop('testID') === "slider")
            // transBtn.simulate('valueChange',2)
            instance.setState({activeTab:2})
            const activeTabBtn = exampleBlockA.findWhere((node) =>node.prop('testID') === "selectMusic")
            activeTabBtn.simulate('press');

            const activeTab = buttonComponent.findWhere((node) =>node.prop('testID') === "activeTab")
            activeTab.at(0).simulate('press');

            const musicDataList = exampleBlockA.findWhere((node) =>node.prop('testID') === "musicDataList")
            
            const flatlistIdRender = musicDataList.renderProp('renderItem')({ item: {attributes:{image:"photo.png",title:"title",audio:"audio"}}, index: 0 })
            let eventBtn1 = flatlistIdRender.findWhere((node) => node.prop('testID') === 'audioBtnId');
            eventBtn1.simulate('press');

            musicDataList.renderProp('renderItem')({ item: {attributes:{image:"photo.png",title:"title",audio:"audio"}}, index: 0 })
            
            let eventBtn2 = flatlistIdRender.findWhere((node) => node.prop('testID') === 'audioBtnId');
            eventBtn2.simulate('press');
            const nextButtonTest = exampleBlockA.findWhere((node) =>node.prop('testID') === "nextButtonTest")
            nextButtonTest.simulate('press');
            // instance.checkFilesExistOrNot('','')
            // instance.calculatePercentage()
            instance.onMergeAudio()
            instance.playAudio()
            nextButtonTest.simulate('press');
            instance.getFrameImages()
            // instance.getResultVideoFrames()
        });

        then('I can select the button with with out errors', () => {
            let buttonaudio = exampleBlockA.findWhere((node) => node.prop('testID') === 'audio');
            buttonaudio.simulate('press');
        });
        then('I can choose the filter with out errors', () => {
           
            switcher = shallow(<ViewSwitcher {...switchProps} />);
            const coverProps = {
                ...switchProps, isVisible: true, onToggle: () => { }, onSelectEffect: () => { },
                isProcessing: false, selectedTab: VideoTrimmingFunction.effect
            }
            filterVideo = shallow(<VideoFilterModal {...coverProps} videoId={0} videoUrl="" />);
            filterTransition= shallow(<TransitionOption testID="transition" onConfirm={()=>{}} onFilter={()=>{}} />)
            const myButton = filterVideo.findWhere((node) =>node.prop('testID') === "cancel")
            myButton.props().onPress();

            const successButton = filterVideo.findWhere((node) =>node.prop('testID') === "success")
            // successButton.props().onPress();

            const transitionButton = filterVideo.findWhere((node) =>node.prop('testID') === "transition")
            transitionButton.props().onConfirm();
            transitionButton.props().onFilter('tab','Moon','');
            transitionButton.props().onFilter('tab','Gingham','');
            transitionButton.props().onFilter('tab','Clarendon','');
            transitionButton.props().onFilter('tab','Juno','');
            transitionButton.props().onFilter('tab','Slumber','');
            transitionButton.props().onFilter('tab','Ludwig','');
            transitionButton.props().onFilter('tab','Crema','');
            transitionButton.props().onFilter('tab','Aden','');
            transitionButton.props().onFilter('tab','Lark','');
            transitionButton.props().onFilter('tab','Lo-fi','');
            transitionButton.props().onFilter('tab','Erase','');
            transitionButton.props().onFilter('','Moon', "colorchannelmixer=rr=0.8:rg=0.8:rb=0.8:gr=0.8:gg=0.8:gb=0.8:br=0.9:bg=0.9:bb=1.2" )
            const deleteModalBtn = filterVideo.findWhere((node) =>node.prop('testID') === "Delete")
            deleteModalBtn.props().onDelete();
            deleteModalBtn.props().onCancel();

            const transBtn = filterVideo.findWhere((node) =>node.prop('testID') === "video")
            // transBtn.props().onLoad({duration:6});
        });
        then('I can leave the screen with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });
    });

    test('Select the Video Effects', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: VideoTrimming;
        let switcher: ShallowWrapper
        let effectVideo: ShallowWrapper
        let videoProgress: ShallowWrapper;

        given('I am a User loading Video Effects', () => {
            exampleBlockA = shallow(<VideoTrimming {...screenProps} />);
            expect(exampleBlockA).toBeTruthy();
        });

        when('I navigate to the Video Effects', () => {
            instance = exampleBlockA.instance() as VideoTrimming
            videoProgress = shallow(<VideoProgress isVisible={true} percentage={10} />);
        });
        then('I can choose the effects with out errors', () => {
            const effectProps = { ...switchProps,selectedTab: VideoTrimmingFunction.effect }
            switcher = shallow(<ViewSwitcher {...effectProps} />);
            const coverProps = {...switchProps,
                isVisible: true, onToggle: () => { }, onSelectEffect: () => { },
                isProcessing: false, selectedTab: VideoTrimmingFunction.effect
            }
            effectVideo = shallow(<VideoEffect {...coverProps} videoId={0} videoUrl="" />);
            const myButton = effectVideo.findWhere((node) =>node.prop('testID') === "close")
            myButton.props().onPress();
            const successBtn = effectVideo.findWhere((node) =>node.prop('testID') === "success")
            // successBtn.props().onPress();
            const pauseBtn = effectVideo.findWhere((node) =>node.prop('testID') === "pause")
            // pauseBtn.props().onPress();
            const deleteModalBtn = effectVideo.findWhere((node) =>node.prop('testID') === "deleteModal")
            deleteModalBtn.props().onDelete();
            deleteModalBtn.props().onCancel();
            const videoBtn = effectVideo.findWhere((node) =>node.prop('testID') === "video")
             // videoBtn.props().onProgress({currentTime:0});
            // videoBtn.props().onLoad({duration:5});
            const selectEffectBtn = effectVideo.findWhere((node) =>node.prop('testID') === "selectEffect")
            // selectEffectBtn.props().onPress()
            // expect(selectEffectBtn.prop('optionIndex')).toBe(0)
            // expect('onComplete').toHaveBeenNthCalledWith("")
            
        });
    });

    test('Select the Time Magic', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: VideoTrimming;
        let switcher: ShallowWrapper;
        let magicVideo: ShallowWrapper;

        given('I am a User loading Time Magic', () => {
            exampleBlockA = shallow(<VideoTrimming {...screenProps} />);
        });

        when('I navigate to the Time Magic', () => {
            instance = exampleBlockA.instance() as VideoTrimming
        });
        then('I can choose the Time Magic with out errors', () => {
            const effectProps = {...switchProps, selectedTab: VideoTrimmingFunction.magic }
            switcher = shallow(<ViewSwitcher {...effectProps} />);
            const coverProps = {...switchProps,
                isVisible: true, onToggle: () => { }, onSelectEffect: () => { },
                isProcessing: false, selectedTab: VideoTrimmingFunction.effect
            }
            magicVideo = shallow(<VideoTimeMagic {...coverProps} videoId={0} videoUrl="" />);
            const myButton = magicVideo.findWhere((node) =>node.prop('testID') === "cancel")
            myButton.props().onPress();

            const successButton = magicVideo.findWhere((node) =>node.prop('testID') === "success")
            // successButton.props().onPress();

            const transitionButton = magicVideo.findWhere((node) =>node.prop('testID') === "pause")
            // transitionButton.props().onPress();
            const deleteModalBtn = magicVideo.findWhere((node) =>node.prop('testID') === "Delete")
            deleteModalBtn.props().onDelete();
            deleteModalBtn.props().onCancel();
            const videoBtn = magicVideo.findWhere((node) =>node.prop('testID') === "video")
             // videoBtn.props().onProgress({currentTime:0});
            // videoBtn.props().onLoad({duration:5});
            const selectMagicBtn = magicVideo.findWhere((node) =>node.prop('key') === "selectMagic")
            // console.log("selectMagicBtn",selectMagicBtn.props());
            
            // selectMagicBtn.props().onPress();
            // console.debug('HERE ####', selectMagicBtn.props().Item({label: 'Slow Motion', value: background}).props.children[1].props.onPress());
        });
    });

    test('Select the Video Graffiti', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: VideoTrimming;
        let switcher: ShallowWrapper
        let videoGraffiti: ShallowWrapper;
        let transition: ShallowWrapper;

        given('I am a User loading Video Graffiti', () => {
            exampleBlockA = shallow(<VideoTrimming {...screenProps} />);
        });

        when('I navigate to the Video Graffiti', () => {
            instance = exampleBlockA.instance() as VideoTrimming
        });
        then('I can choose the video graffiti with out errors', () => {
            const graffitiProps = {...switchProps , selectedTab: VideoTrimmingFunction.graffiti}
            switcher = shallow(<ViewSwitcher {...graffitiProps} />);
            const coverProps = {...switchProps,
                isVisible: true, onToggle: () => { }, onSelectEffect: () => { },
                isProcessing: false, selectedTab: VideoTrimmingFunction.effect
            }
            videoGraffiti = shallow(<VideoGraffitiModal {...coverProps} videoUrl="" />);
            transition= shallow(<GraffitiTransition testID="" onConfirm={()=>{}} onSelect={()=>{}} />)
            const videoBtn = videoGraffiti.findWhere((node) =>node.prop('testID') === "video")
             // videoBtn.props().onProgress({currentTime:0});
            // videoBtn.props().onLoad({duration:5});
            const pauseBtn = videoGraffiti.findWhere((node) =>node.prop('testID') === "pause")
            // pauseBtn.props().onPress();
            const deleteModalBtn = videoGraffiti.findWhere((node) =>node.prop('testID') === "Delete")
            deleteModalBtn.props().onDelete();
            deleteModalBtn.props().onCancel();
            const transitionButton = videoGraffiti.findWhere((node) =>node.prop('testID') === "transition")
            transitionButton.props().onConfirm();
        });
    });
    test('Select the Video Edit', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:VideoTrimming;
        let switcher:ShallowWrapper
        let flatListRenderWraper:ShallowWrapper;

    given('I am a User loading Video Edit', () => {
        exampleBlockA = shallow(<VideoTrimming {...screenProps}/>);
    });

    when('I navigate to the Video Edit', () => {
         instance = exampleBlockA.instance() as VideoTrimming
    });
    then('I can choose the video Edit AudioOption', () => {
       const coverProps={...switchProps, isVisible: true, onToggle: jest.fn(), videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
       switcher = shallow(<AudioOption {...coverProps} onConfirm={()=>{}} />);
    });
    then('I can choose the video Edit CanvasOption', () => {
       const coverProps={...switchProps,videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
        switcher = shallow(<CanvasOption  onConfirm={()=>{}} {...coverProps}/>);
        expect(switcher.find('greatestCommonDivisor'));
    let   itemObj = {
        item: 'white',
        index: 0
      };
      let partiFlatList = switcher.findWhere(
        (node) => node.prop("testID") === "ParticipantFlatListTest"
      );
      partiFlatList.props().renderItem(itemObj);
      partiFlatList.props().keyExtractor("1");
      let colorSizeBtn = switcher.findWhere(
        (node) => node.prop("testID") === "colorSize"
      );
      colorSizeBtn.props().onPress();
      expect(flatListRenderWraper)
        // jest.spyOn(React,'useEffect').mockImplementation((f)=>f())

    });
    then('I can choose the video Edit CopyOption', () => {
       const coverProps={ ...switchProps,isVisible: true, onToggle: jest.fn(), videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
        switcher = shallow(<CopyOption onConfirm={()=>{}} {...coverProps}/>);
    });
    then('I can choose the video Edit FreezeOption', () => {
       const coverProps={ ...switchProps,isVisible: true, onToggle: jest.fn(), videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
        switcher = shallow(<FreezeOption onConfirm={()=>{}} {...coverProps}/>);
    });
    then('I can choose the video Edit MirrorOption', () => {
       const coverProps={...switchProps, isVisible: true, onToggle: jest.fn(), videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
        switcher = shallow(<MirrorOption onConfirm={()=>{}} {...coverProps}/>);
    });
    then('I can choose the video Edit RotateOption', () => {
       const coverProps={...switchProps, isVisible: true, onToggle: jest.fn(), videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
        switcher = shallow(<RotateOption onConfirm={()=>{}} {...coverProps}/>);
    });
    then('I can choose the video Edit SortOption', () => {
       const coverProps={...switchProps, isVisible: true, onConfirm: jest.fn(), videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
        switcher = shallow(<SortOption onSelectVideo={()=>{}} {...coverProps}/>);
        let colorSizeBtn = switcher.findWhere(
            (node) => node.prop("testID") === "oderData"
          );
          colorSizeBtn.props().onPress();
          let draggableBtn = switcher.findWhere(
            (node) => node.prop("testID") === "draggable"
          );
          draggableBtn.props().onMoveEnd([]);
    });
    then('I can choose the video Edit SpeedOption', () => {
       const coverProps={ ...switchProps,isVisible: true, onConfirm: jest.fn(), videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
        switcher = shallow(<SpeedOption {...coverProps}/>);
        let speeBtn = switcher.findWhere(
            (node) => node.prop("testID") === "speed"
          );
          speeBtn.props().onPress();
    });
    then('I can choose the video Edit SplitOption', () => {
       const coverProps={...switchProps, isVisible: true, onToggle: jest.fn(), videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
        switcher = shallow(<SplitOption onConfirm={()=>{}} {...coverProps}/>);
    });
    then('I can choose the video Edit TransitionOptions', () => {
        switcher = shallow(<VideoEditTransition onConfirm={()=>{}}/>);
    });
    then('I can choose the video Edit with out errors', () => {
       const coverProps={...switchProps, isVisible: true, onToggle: jest.fn(), videoUri: 'xyz', selectedTab:VideoTrimmingFunction.edit}
        switcher = shallow(<VideoEditingModal {...coverProps}/>);
        let videoBtn = switcher.findWhere(
            (node) => node.prop("testID") === "video"
          );
        //   videoBtn.props().onLoad({duration:5,naturalSize:{width:5,height:5}});
        //    // videoBtn.props().onProgress({currentTime:0});
        const myButton = switcher.findWhere((node) =>node.prop('testID') === "cancel")
        myButton.props().onPress();

        const successButton = switcher.findWhere((node) =>node.prop('testID') === "success")
        successButton.props().onPress();
        const deleteModalBtn = switcher.findWhere((node) =>node.prop('testID') === "Delete")
            deleteModalBtn.props().onDelete();
            deleteModalBtn.props().onCancel();
        const pauseBtn = switcher.findWhere((node) =>node.prop('testID') === "pause")
        // pauseBtn.props().onPress();
        const transitionsBtn = switcher.findWhere((node) =>node.prop('testID') === "transitions")
        // transitionsBtn.props().onPress();
    });

    });

    test('Select the Video Cover', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: VideoTrimming;
        let switcher: ShallowWrapper
        let effectVideo: ShallowWrapper
        let emojiPicker: ShallowWrapper
        let stickerPicker: ShallowWrapper

        let flatListEmojiWraper:ShallowWrapper;

        given('I am a User loading Video Cover', () => {
            exampleBlockA = shallow(<VideoTrimming {...screenProps} />);
        });

        when('I navigate to the Video Cover', () => {
            instance = exampleBlockA.instance() as VideoTrimming
        });
        then('I can choose the Cover with out errors', () => {
            effectVideo = shallow(<VideoCover onToggle={()=>{}} videoUri="" videoId={0} isVisible/>);
            const myButton = effectVideo.findWhere((node) =>node.prop('testID') === "close")
            myButton.props().onPress();
            const successmyButton = effectVideo.findWhere((node) =>node.prop('testID') === "success")
            // successmyButton.props().onPress();
            const videoBtn = effectVideo.findWhere((node) =>node.prop('testID') === "video")
             // videoBtn.props().onProgress({currentTime:0});
            // videoBtn.props().onLoad({duration:5});
            const pauseBtn = effectVideo.findWhere((node) =>node.prop('testID') === "pause")
            // pauseBtn.props().onPress();
            const deleteModalBtn = effectVideo.findWhere((node) =>node.prop('testID') === "Delete")
            deleteModalBtn.props().onDelete();
            deleteModalBtn.props().onCancel();
            expect(effectVideo.find('getNewFilePath')).toBeTruthy();
            console.log("instanceCover-->",effectVideo);
            effectVideo.simulate('converterNewH',10)
            // instanceCover.props().converterNewH(10)

            stickerPicker = shallow(<CoverEmojiPicker onChange={()=>{}} isSticker={true} />);
            emojiPicker = shallow(<CoverEmojiPicker onChange={()=>{}} isSticker={false} />);
            let   itemObj =  {
                item:{ image: '1f48b.png' },
                index:0
            };
              let partiFlatList = emojiPicker.findWhere(
                (node) => node.prop("testID") === "emojiList"
              );
              partiFlatList.props().renderItem(itemObj);
              partiFlatList.props().keyExtractor("1");

              let   itemObj1 =  {
                item:{ image: '1f48b.png' },
                index:0
            };
              let partiFlatList1 = stickerPicker.findWhere(
                (node) => node.prop("testID") === "stickerList"
              );
              partiFlatList1.props().renderItem(itemObj1);
              partiFlatList1.props().keyExtractor("1");

              let event:{nativeEvent:{
                layout:{
                    x:10, y:10, width:80, height:90
                }
              }}
              const layoutBtn = effectVideo.findWhere((node) =>node.prop('testID') === "layout")
            //   layoutBtn.props().onLayout(event);

        });
    });

    test('Select the Video Record', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: VideoTrimming;
        let switcher: ShallowWrapper
        let recordVideo: ShallowWrapper

        given('I am a User loading Video Record', () => {
            exampleBlockA = shallow(<VideoTrimming {...screenProps} />);
        });

        when('I navigate to the Video Record', () => {
            instance = exampleBlockA.instance() as VideoTrimming
        });
        then('I can choose the Record with out errors', () => {
            recordVideo = shallow(<VideoRecordModal onToggle={()=>{}} videoUri="" isVisible poster="" />);
            const myButton = recordVideo.findWhere((node) =>node.prop('testID') === "close")
            // myButton.props().onPress();
            const successmyButton = recordVideo.findWhere((node) =>node.prop('testID') === "success")
            // successmyButton.props().onPress();
            const videoBtn = recordVideo.findWhere((node) =>node.prop('testID') === "video")
             // videoBtn.props().onProgress({currentTime:0});
            // videoBtn.props().onLoad({duration:5});
            // videoBtn.props().onEnd();
            const pauseBtn = recordVideo.findWhere((node) =>node.prop('testID') === "pause")
            // pauseBtn.props().onPress();
            const deleteModalBtn = recordVideo.findWhere((node) =>node.prop('testID') === "Delete")
            deleteModalBtn.props().onDelete();
            deleteModalBtn.props().onCancel();
            const deleteImgBtn = recordVideo.findWhere((node) =>node.prop('testID') === "deleteImg")
            deleteImgBtn.props().onPress();

            //reference mock
            const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
            const recordBtn = recordVideo.findWhere((node) =>node.prop('testID') === "record")
            expect(exampleBlockA).toBeTruthy();

            // recordBtn.props().onPress();
            //  expect(useRefSpy).toBeCalledWith(null);

        });
    });

    test('Select the Video Subtitle', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: VideoTrimming;
        let switcher: ShallowWrapper
        let recordVideo: ShallowWrapper
        let colorTitle: ShallowWrapper
        let fontTitle: ShallowWrapper
        let fontSize: ShallowWrapper
        given('I am a User loading Video Subtitle', () => {
            exampleBlockA = shallow(<VideoTrimming {...screenProps} />);
        });

        when('I navigate to the Video Subtitle', () => {
            instance = exampleBlockA.instance() as VideoTrimming
        });
        then('I can choose the Subtitle with out errors', () => {
            // recordVideo = shallow(<VideoSubtitle onToggle={()=>{}} videoUri="" videoId={0} isVisible  />);
            colorTitle = shallow(<VideoSubtitleColor onPress={()=>{}} selectedItem=""  />)
            fontTitle = shallow(<VideoSubtitleFonts onPress={()=>{}} selectedItem=""  />)
            fontSize = shallow(<VideoSubtitleTextSize onChange={()=>{}} selectedItem={0} />)
            // const myButton = recordVideo.findWhere((node) =>node.prop('testID') === "close")
            // myButton.props().onPress();
            // const successmyButton = recordVideo.findWhere((node) =>node.prop('testID') === "success")
            // successmyButton.props().onPress();
            // const videoBtn = recordVideo.findWhere((node) =>node.prop('testID') === "video")
             // videoBtn.props().onProgress({currentTime:0});
            // videoBtn.props().onLoad({duration:5});
            // const pauseBtn = recordVideo.findWhere((node) =>node.prop('testID') === "pause")
            // pauseBtn.props().onPress();
            // const deleteModalBtn = recordVideo.findWhere((node) =>node.prop('testID') === "Delete")
            // deleteModalBtn.props().onDelete();
            // deleteModalBtn.props().onCancel();
            // const deleteImgBtn = recordVideo.findWhere((node) =>node.prop('testID') === "arraytext")
            // deleteImgBtn.props().onPress();
        });
        then('I can load the Video player',()=>{
            // instance.isVideoPlaying();
            // instance.setState({isPlaying:true},()=>{
            //     instance.isVideoPlaying();
            // });
            // instance.setMusicType(true);
            // instance.setAudio({attributes:{audio:""}});
            // instance.setAudio({attributes:{audio:"audio"}});
        })
    });
});

describe("sum function", () => {
    it("should return filter", () => {
        let props:any={...switchProps,selectedTab: VideoTrimmingFunction.filter}
      expect(ViewSwitcher(props));
    });
    it("should return effect", () => {
        let props:any={...switchProps,selectedTab: VideoTrimmingFunction.effect}
      expect(ViewSwitcher(props));
    });
    it("should return edit", () => {
        let props:any={...switchProps,selectedTab: VideoTrimmingFunction.edit}
      expect(ViewSwitcher(props));
    });
    it("should return magic", () => {
        let props:any={...switchProps,selectedTab: VideoTrimmingFunction.magic}
      expect(ViewSwitcher(props));
    });
    it("should return music", () => {
        let props:any={...switchProps,selectedTab: VideoTrimmingFunction.music}
      expect(ViewSwitcher(props));
    });
    it("should return record", () => {
        let props:any={...switchProps,selectedTab: VideoTrimmingFunction.record}
      expect(ViewSwitcher(props));
    });
    it("should return subtitle", () => {
        let props:any={...switchProps,selectedTab: VideoTrimmingFunction.subtitle}
      expect(ViewSwitcher(props));
    });
    it("should return cover", () => {
        let props:any={...switchProps,selectedTab: VideoTrimmingFunction.cover}
      expect(ViewSwitcher(props));
    });
  });
