//
//  ReactNativeExceptionHandler.h
//  Xtok
//
//  Created by Metehan Akbaba on 13.07.2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

#import  <UIKit/UIKit.h>
#include <libkern/OSAtomic.h>
#include <execinfo.h>

@interface ReactNativeExceptionHandler : NSObject <RCTBridgeModule>
+ (void) replaceNativeExceptionHandlerBlock:(void (^)(NSException *exception, NSString *readeableException))nativeCallbackBlock;
+ (void) releaseExceptionHold;
@end
