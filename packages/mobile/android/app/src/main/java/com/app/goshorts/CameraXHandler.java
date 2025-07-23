package com.app.goshorts;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.util.DisplayMetrics;
import android.util.Size;
import android.view.Surface;

import androidx.annotation.NonNull;
import androidx.camera.core.Camera;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.LifecycleOwner;

import com.google.common.util.concurrent.ListenableFuture;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executor;

import ai.deepar.ar.CameraResolutionPreset;
import ai.deepar.ar.DeepAR;
import ai.deepar.ar.DeepARImageFormat;

public class CameraXHandler {
  private final Activity activity;

  // external surface provider
  private static final boolean useExternalCameraTexture = false; // ?
  private ARSurfaceProvider surfaceProvider = null;
  private DeepAR frameReceiver;

  private ProcessCameraProvider processCameraProvider;
  private ListenableFuture<ProcessCameraProvider> future;

  private final int defaultLensFacing = CameraSelector.LENS_FACING_FRONT;
  private int lensFacing = defaultLensFacing;
  private Camera camera;

  public CameraXHandler(Activity activity) {
    this.activity = activity;
    startNative();
  }

  private void startNative() {
    future = ProcessCameraProvider.getInstance(activity);
    CameraResolutionPreset resolutionPreset = CameraResolutionPreset.P1920x1080;
    Executor executor = ContextCompat.getMainExecutor(activity);

    int width;
    int height;

    int orientation = getScreenOrientation();

    if (orientation == ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE ||
        orientation == ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE) {
        width = resolutionPreset.getWidth();
        height = resolutionPreset.getHeight();
    } else {
        width = resolutionPreset.getHeight();
        height = resolutionPreset.getWidth();
    }

    future.addListener(() -> {
        try {
            processCameraProvider = future.get();
            Size cameraResolution = new Size(width, height);

            CameraSelector cameraSelector = new CameraSelector.Builder()
                .requireLensFacing(lensFacing)
                .build();

            Preview preview = new Preview.Builder()
                .setTargetResolution(cameraResolution)
                .build();

            processCameraProvider.unbindAll();

            camera = processCameraProvider.bindToLifecycle(
                (LifecycleOwner) activity,
                cameraSelector,
                preview
            );

            if (surfaceProvider == null) {
                surfaceProvider = new ARSurfaceProvider(activity, frameReceiver);
            }

            preview.setSurfaceProvider(surfaceProvider);
            surfaceProvider.setMirror(lensFacing == CameraSelector.LENS_FACING_FRONT);

        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
    }, executor);
  }


  public void openCamera(DeepAR frameReceiver) {
    this.frameReceiver = frameReceiver;
    startNative();
  }

  public void closeCamera() {
    ProcessCameraProvider cameraProvider = null;

    try {
      cameraProvider = future.get();
      cameraProvider.unbindAll();
    } catch (ExecutionException e) {
      e.printStackTrace();
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    if (surfaceProvider != null) {
      surfaceProvider.stop();
      surfaceProvider = null;
    }

    frameReceiver.release();
    frameReceiver = null;
  }

  public void setFlashOn(boolean enabled) {
    try {
      if (camera != null && camera.getCameraInfo().hasFlashUnit()) {
        camera.getCameraControl().enableTorch(enabled);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void switchCamera(int _lensFacing) {
    lensFacing = _lensFacing == CameraSelector.LENS_FACING_FRONT ? CameraSelector.LENS_FACING_FRONT : CameraSelector.LENS_FACING_BACK;
    //unbind immediately to avoid mirrored frame.
    ProcessCameraProvider cameraProvider = null;
    try {
      cameraProvider = future.get();
      cameraProvider.unbindAll();
    } catch (ExecutionException e) {
      e.printStackTrace();
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    startNative();
  }

  private int getScreenOrientation() {
    int rotation = activity.getWindowManager().getDefaultDisplay().getRotation();
    DisplayMetrics dm = new DisplayMetrics();
    activity.getWindowManager().getDefaultDisplay().getMetrics(dm);
    int width = dm.widthPixels;
    int height = dm.heightPixels;
    int orientation;
    // if the device's natural orientation is portrait:
    if ((rotation == Surface.ROTATION_0
      || rotation == Surface.ROTATION_180) && height > width ||
      (rotation == Surface.ROTATION_90
        || rotation == Surface.ROTATION_270) && width > height) {
      switch (rotation) {
        case Surface.ROTATION_0:
          orientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;
          break;
        case Surface.ROTATION_90:
          orientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
          break;
        case Surface.ROTATION_180:
          orientation =
            ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT;
          break;
        case Surface.ROTATION_270:
          orientation =
            ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE;
          break;
        default:
          orientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;
          break;
      }
    }
    // if the device's natural orientation is landscape or if the device
    // is square:
    else {
      switch (rotation) {
        case Surface.ROTATION_0:
          orientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
          break;
        case Surface.ROTATION_90:
          orientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;
          break;
        case Surface.ROTATION_180:
          orientation =
            ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE;
          break;
        case Surface.ROTATION_270:
          orientation =
            ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT;
          break;
        default:
          orientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
          break;
      }
    }

    return orientation;
  }
}
