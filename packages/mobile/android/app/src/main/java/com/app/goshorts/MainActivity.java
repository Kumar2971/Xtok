package com.app.goshorts;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; 
import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.*;

import android.util.Log;

public class MainActivity extends ReactActivity implements Thread.UncaughtExceptionHandler {
  private static final String TAG = "LogModule";


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);
    Thread.setDefaultUncaughtExceptionHandler(this);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Xtok";
  }

  @Override
  public void uncaughtException(Thread thread, Throwable throwable) {
    // Convert the Throwable stack trace to String
    StringWriter sw = new StringWriter();
    PrintWriter pw = new PrintWriter(sw);
    throwable.printStackTrace(pw);
    String errorMessage = sw.toString();

    // Call the native method to send the log to the server
    getReactNativeHost().getReactInstanceManager().getCurrentReactContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("UncaughtException", errorMessage);
    Log.e(TAG, "Uncaught exception: " + errorMessage);
  }
}
