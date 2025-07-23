//
//  ReactNativeExceptionHandler.m
//  Xtok
//
//  Created by Metehan Akbaba on 13.07.2023.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import "ReactNativeExceptionHandler.h"


// CONSTANTS

NSString * const RNUncaughtExceptionHandlerSignalExceptionName = @"RNUncaughtExceptionHandlerSignalExceptionName";
NSString * const RNUncaughtExceptionHandlerSignalKey = @"RNUncaughtExceptionHandlerSignalKey";
NSString * const RNUncaughtExceptionHandlerAddressesKey = @"RNUncaughtExceptionHandlerAddressesKey";
volatile int32_t RNUncaughtExceptionCount = 0;
const int32_t RNUncaughtExceptionMaximum = 10;
const NSInteger RNUncaughtExceptionHandlerSkipAddressCount = 4;
const NSInteger RNUncaughtExceptionHandlerReportAddressCount = 5;


@implementation ReactNativeExceptionHandler

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

// VARIABLE DECLARATIONS

//variable which is used to track till when to keep the app running on exception.
bool dismissApp = true;

//variable to hold the custom error handler passed while customizing native handler
void (^nativeErrorCallbackBlock)(NSException *exception, NSString *readeableException);

// variable to hold the previously defined error handler
NSUncaughtExceptionHandler* previousNativeErrorCallbackBlock;

BOOL callPreviousNativeErrorCallbackBlock = false;

//variable to hold the js error handler when setting up the error handler in RN.
void (^jsErrorCallbackBlock)(NSException *exception, NSString *readeableException);

//variable that holds the default native error handler
void (^defaultNativeErrorCallbackBlock)(NSException *exception, NSString *readeableException) =
^(NSException *exception, NSString *readeableException){
    
    UIAlertController* alert = [UIAlertController
                                alertControllerWithTitle:@"Unexpected error occured"
                                message:[NSString stringWithFormat:@"%@\n%@",
                                         @"Apologies..The app will close now \nPlease restart the app\n",
                                         readeableException]
                                preferredStyle:UIAlertControllerStyleAlert];
    
    UIApplication* app = [UIApplication sharedApplication];
    UIViewController * rootViewController = app.delegate.window.rootViewController;
    [rootViewController presentViewController:alert animated:YES completion:nil];
    
    [NSTimer scheduledTimerWithTimeInterval:5.0
                                     target:[ReactNativeExceptionHandler class]
                                   selector:@selector(releaseExceptionHold)
                                   userInfo:nil
                                    repeats:NO];
};

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setHandlerforNativeException:(BOOL)callPreviouslyDefinedHandler withCallback: (RCTResponseSenderBlock)callback)
{
    jsErrorCallbackBlock = ^(NSException *exception, NSString *readeableException){
        callback(@[readeableException]);
    };
    
    previousNativeErrorCallbackBlock = NSGetUncaughtExceptionHandler();
    callPreviousNativeErrorCallbackBlock = callPreviouslyDefinedHandler;
    
    NSSetUncaughtExceptionHandler(&HandleException);
    signal(SIGABRT, SignalHandler);
    signal(SIGILL, SignalHandler);
    signal(SIGSEGV, SignalHandler);
    signal(SIGFPE, SignalHandler);
    signal(SIGBUS, SignalHandler);

    NSLog(@"REGISTERED RN EXCEPTION HANDLER");
}

+ (void) replaceNativeExceptionHandlerBlock:(void (^)(NSException *exception, NSString *readeableException))nativeCallbackBlock{
    NSLog(@"SET THE CALLBACK HANDLER NATTTIVEEE");
    nativeErrorCallbackBlock = nativeCallbackBlock;
}

+ (void) releaseExceptionHold {
    dismissApp = true;
    NSLog(@"RELEASING LOCKED RN EXCEPTION HANDLER");
}

// API call to send the error trace string
- (void)sendErrorTraceString:(NSString *)exceptionThread exceptionMessage:(NSString *)exceptionMessage exceptionStack:(NSString *)exceptionStack {
    // Define the API endpoint URL
    NSString *apiURL = @"https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe/bx_block_admin/ui_exception_thread";
    
    // Create the request body dictionary
    NSDictionary *data = @{
        @"exception_thread": @"ios-native",
        @"exception_message": exceptionMessage,
        @"exception_stack": exceptionStack
    };
    
    // Create the request
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:apiURL]];
    request.HTTPMethod = @"POST";
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Accept"];
    request.HTTPBody = [NSJSONSerialization dataWithJSONObject:data options:0 error:nil];
    
    // Send the API request
    NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
        if (error) {
            NSLog(@"Failed to send error trace. Error: %@", error);
        } else {
            NSLog(@"Error trace sent successfully.");
        }
    }];
    
    [task resume];
}


- (void)handleException:(NSException *)exception
{
    NSString * readeableError = [NSString stringWithFormat:NSLocalizedString(@"%@\n%@", nil),
                                 [exception reason],
                                 [[exception userInfo] objectForKey:RNUncaughtExceptionHandlerAddressesKey]];
    dismissApp = false;
    
    // Send the error trace string via API call
    [self sendErrorTraceString:[exception name] exceptionMessage:[exception reason] exceptionStack:readeableError];

    if (callPreviousNativeErrorCallbackBlock && previousNativeErrorCallbackBlock) {
        previousNativeErrorCallbackBlock(exception);
    }
    
    if(nativeErrorCallbackBlock != nil){
        nativeErrorCallbackBlock(exception,readeableError);
    }else{
        defaultNativeErrorCallbackBlock(exception,readeableError);
    }
    jsErrorCallbackBlock(exception,readeableError);
    
    CFRunLoopRef runLoop = CFRunLoopGetCurrent();
    CFArrayRef allModes = CFRunLoopCopyAllModes(runLoop);
    while (!dismissApp)
    {
        long count = CFArrayGetCount(allModes);
        long i = 0;
        while(i < count){
            NSString *mode = CFArrayGetValueAtIndex(allModes, i);
            if(![mode isEqualToString:@"kCFRunLoopCommonModes"]){
                CFRunLoopRunInMode((CFStringRef)mode, 0.001, false);
            }
            i++;
        }
    }
    
    CFRelease(allModes);
    
    NSSetUncaughtExceptionHandler(NULL);
    signal(SIGABRT, SIG_DFL);
    signal(SIGILL, SIG_DFL);
    signal(SIGSEGV, SIG_DFL);
    signal(SIGFPE, SIG_DFL);
    signal(SIGBUS, SIG_DFL);
    signal(SIGPIPE, SIG_DFL);
    
    kill(getpid(), [[[exception userInfo] objectForKey:RNUncaughtExceptionHandlerSignalKey] intValue]);
    
}

void HandleException(NSException *exception)
{
    int32_t exceptionCount = OSAtomicIncrement32(&RNUncaughtExceptionCount);
    if (exceptionCount > RNUncaughtExceptionMaximum)
    {
        return;
    }
    
    NSArray *callStack = [ReactNativeExceptionHandler backtrace];
    NSMutableDictionary *userInfo =
    [NSMutableDictionary dictionaryWithDictionary:[exception userInfo]];
    [userInfo
     setObject:callStack
     forKey:RNUncaughtExceptionHandlerAddressesKey];
    
    [[[ReactNativeExceptionHandler alloc] init]
     performSelectorOnMainThread:@selector(handleException:)
     withObject:
     [NSException
      exceptionWithName:[exception name]
      reason:[exception reason]
      userInfo:userInfo]
     waitUntilDone:YES];
}

void SignalHandler(int signal)
{
    int32_t exceptionCount = OSAtomicIncrement32(&RNUncaughtExceptionCount);
    if (exceptionCount > RNUncaughtExceptionMaximum)
    {
        return;
    }
    
    NSMutableDictionary *userInfo =
    [NSMutableDictionary
     dictionaryWithObject:[NSNumber numberWithInt:signal]
     forKey:RNUncaughtExceptionHandlerSignalKey];
    
    NSArray *callStack = [ReactNativeExceptionHandler backtrace];
    [userInfo
     setObject:callStack
     forKey:RNUncaughtExceptionHandlerAddressesKey];
    
    [[[ReactNativeExceptionHandler alloc] init]
     performSelectorOnMainThread:@selector(handleException:)
     withObject:
     [NSException
      exceptionWithName:RNUncaughtExceptionHandlerSignalExceptionName
      reason:
      [NSString stringWithFormat:
       NSLocalizedString(@"Signal %d was raised.", nil),
       signal]
      userInfo:
      [NSDictionary
       dictionaryWithObject:[NSNumber numberWithInt:signal]
       forKey:RNUncaughtExceptionHandlerSignalKey]]
     waitUntilDone:YES];
}

// UTILITY METHOD TO GET THE BACKTRACE

+ (NSArray *)backtrace
{
    void* callstack[128];
    int frames = backtrace(callstack, 128);
    char **strs = backtrace_symbols(callstack, frames);
    
    int i;
    NSMutableArray *backtrace = [NSMutableArray arrayWithCapacity:frames];
    for (
         i = RNUncaughtExceptionHandlerSkipAddressCount;
         i < RNUncaughtExceptionHandlerSkipAddressCount +
         RNUncaughtExceptionHandlerReportAddressCount;
         i++)
    {
        [backtrace addObject:[NSString stringWithUTF8String:strs[i]]];
    }
    free(strs);
    
    return backtrace;
}

@end

