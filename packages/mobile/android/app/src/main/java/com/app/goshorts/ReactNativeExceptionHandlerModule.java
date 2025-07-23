
package com.app.goshorts;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONException;
import org.json.JSONObject;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import org.json.JSONArray;
import org.json.JSONObject;

public class ReactNativeExceptionHandlerModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext reactContext;
    private Activity activity;
    private static Class errorIntentTargetClass = DefaultErrorScreen.class;
    private static NativeExceptionHandlerIfc nativeExceptionHandler;
    private Callback callbackHolder;
    private Thread.UncaughtExceptionHandler originalHandler;
    public ReactNativeExceptionHandlerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "ReactNativeExceptionHandler";
  }

  @ReactMethod
  public void setHandlerforNativeException(
          final boolean executeOriginalUncaughtExceptionHandler,
          final boolean forceToQuit,
          Callback customHandler) {

      callbackHolder = customHandler;
      originalHandler = Thread.getDefaultUncaughtExceptionHandler();

      Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {

          @Override
          public void uncaughtException(Thread thread, Throwable throwable) {

          String stackTraceString = Log.getStackTraceString(throwable);
          String message = throwable.getMessage();

          JSONObject jsonPayload = new JSONObject();
          try {
              jsonPayload.put("exception_thread", "android-native");
              jsonPayload.put("exception_message", message);
              jsonPayload.put("exception_stack", stackTraceString);
              callEndpoint(jsonPayload.toString());
          } catch (JSONException e) {
              throw new RuntimeException(e);
          }

          callbackHolder.invoke(stackTraceString);

          if (nativeExceptionHandler != null) {
              nativeExceptionHandler.handleNativeException(thread, throwable, originalHandler);
          } else {
              activity = getCurrentActivity();

              Intent i = new Intent();
              i.setClass(activity, errorIntentTargetClass);
              i.putExtra("stack_trace_string",stackTraceString);
              i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

              activity.startActivity(i);
              activity.finish();

              if (executeOriginalUncaughtExceptionHandler && originalHandler != null) {
                  originalHandler.uncaughtException(thread, throwable);
              }

              if (forceToQuit) {
                  System.exit(0);
              }
          }
          }
      });
  }

    @ReactMethod
    public void throwError() {
        // This is a native Android exception and will not be caught by React Native.
        throw new RuntimeException("Test exception from native code");
    }

    public static void callEndpoint(String jsonPayload) {
        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
        RequestBody requestBody = RequestBody.create(mediaType, jsonPayload);

        Request request = new Request.Builder()
                .url("https://liketiktokapp-255799-ruby.b255799.dev.eastus.az.svc.builder.cafe/bx_block_admin/ui_exception_thread")
                .post(requestBody)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                String responseBody = response.body().string();
                System.out.println("Response: " + responseBody);
            } else {
                System.out.println("Request failed with code: " + response.code());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

   public static void replaceErrorScreenActivityClass(Class errorScreenActivityClass){
       errorIntentTargetClass = errorScreenActivityClass;
   }

   public static void setNativeExceptionHandler(NativeExceptionHandlerIfc nativeExceptionHandler) {
       ReactNativeExceptionHandlerModule.nativeExceptionHandler = nativeExceptionHandler;
   }
}
