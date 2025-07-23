package com.app.goshorts;

import android.content.Context;

import androidx.multidex.MultiDexApplication;

import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.facebook.FacebookSdk;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactInstanceManager;
import com.airbnb.android.react.lottie.LottiePackage;
import com.app.goshorts.RNTDeepARPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import org.reactnative.camera.RNCameraPackage;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import live.videosdk.rnfgservice.ForegroundServicePackage;
import live.videosdk.rnincallmanager.InCallManagerPackage;
import com.dooboolab.RNIap.RNIapPackage;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import org.jetbrains.annotations.Nullable;
public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          packages.add(new PickerPackage());
          packages.add(new RNFusedLocationPackage());
          packages.add(new RNGestureHandlerPackage());
          packages.add(new RNCameraPackage());
          packages.add(new ForegroundServicePackage());
          packages.add(new InCallManagerPackage());
          packages.add(new RnTestExceptionHandlerPackage());
          packages.add(new ReactNativeExceptionHandlerPackage());
          packages.add(new RNTDeepARPackage());
          packages.add(new AmazonIvsReactNativeBroadcastPackage());
          packages.add(new RNIapPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "packages/mobile/index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
 	public Intent registerReceiver(@Nullable BroadcastReceiver receiver, IntentFilter filter) {
     	if (Build.VERSION.SDK_INT >= 34 && getApplicationInfo().targetSdkVersion >= 34) {
         	return super.registerReceiver(receiver, filter, Context.RECEIVER_EXPORTED);
     	} else {
         	return super.registerReceiver(receiver, filter);
     	}
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
