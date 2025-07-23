//
//  RnTestExceptionHandler.h
//  Xtok
//
//  Created by Metehan Akbaba on 14.07.2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RnTestExceptionHandler : NSObject <RCTBridgeModule>

@end
