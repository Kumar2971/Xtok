#import <UserNotifications/UNUserNotificationCenter.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import "RNGoogleSignin.h"

//#if __has_include(<React/RCTBridgeDelegate.h>)
//  #import <React/RCTBridgeDelegate.h>
//#else
//  #import "RCTBridgeDelegate.h"
//#endif

//#import <UIKit/UIKit.h>
//#if __has_include(<RNGoogleSignin/RNGoogleSignin.h>)
//  #import <RNGoogleSignin/RNGoogleSignin.h>
//#else
//  #import "RNGoogleSignin.h"
//#endif

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate ,GIDSignInDelegate>
@property (nonatomic, strong) UIWindow *window;
@end
