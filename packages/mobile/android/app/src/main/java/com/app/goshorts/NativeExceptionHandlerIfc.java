package com.app.goshorts;

public interface NativeExceptionHandlerIfc {
    void handleNativeException(Thread thread, Throwable throwable, Thread.UncaughtExceptionHandler originalHandler);
}
