//
//  StreamViewRNModule.m
//  Xtok
//
//  Created by developer on 08/08/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

@import Foundation;
#import "Xtok-Swift.h"
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface StreamViewRNModule : RCTViewManager
@property (nonatomic, copy) RCTDirectEventBlock onStreamEnded;
@property (nonatomic, copy) RCTDirectEventBlock onParticipantAdded;
@property (nonatomic, copy) RCTDirectEventBlock onParticipantLeft;
@property (nonatomic, copy) RCTDirectEventBlock onUserGridSelected;
@property (nonatomic, copy) RCTDirectEventBlock onGridTapped;
@property (nonatomic, copy) RCTDirectEventBlock onLikePressed;

@end

@implementation StreamViewRNModule

RCT_EXPORT_MODULE();

- (UIView *)view
{
  return [StreamView new];
}

RCT_EXPORT_VIEW_PROPERTY(broadcastDetail, NSString);

RCT_EXPORT_VIEW_PROPERTY(streamEndPressed, NSString);

RCT_EXPORT_VIEW_PROPERTY(muteUser, NSString);

RCT_EXPORT_VIEW_PROPERTY(flipCamera, NSString);

RCT_EXPORT_VIEW_PROPERTY(selectedChallengeUserId, NSString);

RCT_EXPORT_VIEW_PROPERTY(isLiveChallenge, NSString);

RCT_EXPORT_VIEW_PROPERTY(teamIdForNative, NSString);

RCT_EXPORT_VIEW_PROPERTY(nativeViewHeight, NSString);

RCT_EXPORT_VIEW_PROPERTY(onStreamEnded, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onParticipantAdded, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onParticipantLeft, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onUserGridSelected, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onGridTapped, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onLikePressed, RCTDirectEventBlock)



@end

