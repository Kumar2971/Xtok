package com.app.goshorts;

import static com.wix.reactnativeuilib.keyboardinput.utils.ViewUtils.getWindow;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.os.Handler;
import android.util.Log;
import android.view.GestureDetector;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.content.res.AppCompatResources;

import com.amazonaws.ivs.broadcast.AnalyticsStageRenderer;
import com.amazonaws.ivs.broadcast.AudioLocalStageStream;
import com.amazonaws.ivs.broadcast.BroadcastConfiguration;
import com.amazonaws.ivs.broadcast.BroadcastException;
import com.amazonaws.ivs.broadcast.Device;
import com.amazonaws.ivs.broadcast.DeviceDiscovery;
import com.amazonaws.ivs.broadcast.ImageDevice;
import com.amazonaws.ivs.broadcast.ImageLocalStageStream;
import com.amazonaws.ivs.broadcast.LocalStageStream;
import com.amazonaws.ivs.broadcast.ParticipantInfo;
import com.amazonaws.ivs.broadcast.Stage;
import com.amazonaws.ivs.broadcast.StageStream;
import com.amazonaws.ivs.broadcast.StageVideoConfiguration;
import com.bumptech.glide.Glide;
import com.app.goshorts.model.ParticipantData;
import com.app.goshorts.model.UserInfo;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

public class IVSBroadcastCameraView extends FrameLayout implements LifecycleEventListener {
    private static final String TAG = "IVSBroadcastCameraView";
    public static final String START_COMMAND_NAME = "START";
    public static final String STOP_COMMAND_NAME = "STOP";
    private JSONObject broadcastDetail = null;
    private String IVS_TOKEN = null;
    private Stage mStage = null;
    private UserInfo userInfo = null;
    private ArrayList<ParticipantData> localParticipantData = new ArrayList<>();
    @Deprecated
    public static final String SWAP_CAMERA_COMMAND_NAME = "SWAP_CAMERA";

    private Boolean isGuest = false;
    private Boolean isCoHost = false;
    private String hostId = "";

    private float streamViewHeight;
    private String defaultCameraPos = "front";
    private boolean isUserMuted = false;
    private DeviceDiscovery deviceDiscovery = null;
    private boolean isLiveChallenge = false;
    private String setTeamIdForNative = "";

    public enum Events {
        ON_PARTICIPANT_ADDED("onParticipantAdded"), ON_PARTICIPANT_LEFT("onParticipantLeft"), ON_STREAM_END("onStreamEnded"), ON_GRID_TAPPED("onGridTapped"), ON_IS_BROADCAST_READY("onIsBroadcastReady"), ON_ERROR("onError"), ON_BROADCAST_ERROR("onBroadcastError"), ON_BROADCAST_STATE_CHANGED("onBroadcastStateChanged"), ON_BROADCAST_AUDIO_STATS("onBroadcastAudioStats"), ON_TRANSMISSION_STATISTICS_CHANGED("onTransmissionStatisticsChanged"), @Deprecated ON_BROADCAST_QUALITY_CHANGED("onBroadcastQualityChanged"), @Deprecated ON_NETWORK_HEALTH_CHANGED("onNetworkHealthChanged"), ON_LIKE_PRESSED("onLikePressed"),
        ;

        private String title;

        Events(String title) {
            this.title = title;
        }

        @Override
        public String toString() {
            return title;
        }
    }

    private String STREAM_KEY;
    private String RTMPS_URL;
    private IVSBroadcastSessionService ivsBroadcastSession;
    private List<LocalStageStream> localStageStreams = new ArrayList();
    private int screenHeight = 0;
    private boolean viewInCoHost = false;
    int[] intTeamArray;
    public Boolean isSingleClick = true;
    public Boolean isDoubleClick = true;
    public Boolean isSelectedUserUpdate = false;

    private String watchLiveHostId = "";

    /**
     * A workaround for known issue: https://github.com/facebook/react-native/issues/17968
     */
    private void reLayout(@NonNull View view) {
        view.measure(MeasureSpec.makeMeasureSpec(getMeasuredWidth(), MeasureSpec.EXACTLY), MeasureSpec.makeMeasureSpec(getMeasuredHeight(), MeasureSpec.EXACTLY));
        view.layout(view.getLeft(), view.getTop(), view.getMeasuredWidth(), view.getMeasuredHeight());
        Objects.requireNonNull(getWindow()).setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    }

    private void addCameraPreview(@NonNull View preview) {
        LayoutParams layoutParams = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        addView(preview, layoutParams);
        reLayout(preview);
    }

    @SuppressLint("ClickableViewAccessibility")
    private void manageMultiHostView() {
        removeAllViews();
        LinearLayout linearLayout = new LinearLayout(getRootView().getContext());
        linearLayout.setOrientation(LinearLayout.HORIZONTAL);
        LayoutParams linearLayoutParams = new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        linearLayout.removeAllViews();
        ParticipantData participantData = null;
        for (int i = 0; i < localParticipantData.size(); i++) {
            if (localParticipantData.get(i).getViewerType().equals("host")) {
                participantData = localParticipantData.get(i);
                hostId = localParticipantData.get(i).getId();
            }
            if (localParticipantData.get(i).getViewerType().equals("guest")) {
                isGuest = true;
            }
            if (localParticipantData.get(i).getViewerType().equals("cohost")) {
                if (!userInfo.getIsViewer().equals("true")) {
                    participantData = localParticipantData.get(0);
                }
                isCoHost = true;
            }
        }
        //Handle Host and Guest/CoHost view
        if (isGuest && localParticipantData.size() > 1) {
            isSingleClick = false;
            if (participantData != null && participantData.getStageStream() != null && participantData.getStageStream().getPreview() != null) {
                View hostView = inflate(getRootView().getContext(), R.layout.item_host, null);
                hostView.setId(View.generateViewId());
                View videoPreview = ((ImageDevice) participantData.getStageStream().getDevice()).getPreviewView(BroadcastConfiguration.AspectMode.FILL);
                videoPreview.setLayoutParams(new ViewGroup.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
                FrameLayout frameLayout = hostView.findViewById(R.id.viewParticipantStage);
                frameLayout.addView(videoPreview);
                TextView textViewTitle = hostView.findViewById(R.id.txtParticipantName);
                textViewTitle.setText(String.format("%s%s", participantData.getViewerType().substring(0, 1).toUpperCase(), participantData.getViewerType().substring(1).toLowerCase()));
                LinearLayout.LayoutParams params1 = new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.MATCH_PARENT);
                params1.weight = 1;
                hostView.setOnTouchListener(new IVSBroadcastCameraViewDoubleTapListener(hostView.getContext(), participantData));
                linearLayout.addView(hostView, params1);
            }

            ArrayList<ParticipantData> mNewData = new ArrayList<>();
            for (int i = 0; i < localParticipantData.size(); i++) {
                if (!localParticipantData.get(i).getViewerType().equals("host") && !localParticipantData.get(i).getViewerType().equals("viewer")) {
                    mNewData.add(localParticipantData.get(i));
                }
            }
            FrameLayout guestView = new FrameLayout(getRootView().getContext());
            guestView.removeAllViews();
            GridLayout gridLayout = new GridLayout(getRootView().getContext());
            gridLayout.removeAllViewsInLayout();
            if (mNewData.size() <= 2) {
                gridLayout.setColumnCount(1);
            } else {
                gridLayout.setColumnCount(2);
            }
            gridLayout.setLayoutParams(new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
            for (int i = 0; i < mNewData.size(); i++) {
                FrameLayout frameLayout = null;
                View view = inflate(getRootView().getContext(), R.layout.item_participant, null);
                view.setId(View.generateViewId());
                if (mNewData.get(i).getStageStream() != null && mNewData.get(i).getStageStream().getPreview() != null) {
                    View videoPreview = ((ImageDevice) mNewData.get(i).getStageStream().getDevice()).getPreviewView(BroadcastConfiguration.AspectMode.FILL);
                    videoPreview.setLayoutParams(new ViewGroup.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
                    frameLayout = view.findViewById(R.id.viewParticipantStage);
                    frameLayout.addView(videoPreview);
                }
                if (Objects.equals(mNewData.get(i).getId(), localParticipantData.get(0).getId())) {
                    ImageView mute = view.findViewById(R.id.mute);
                    ImageView flipCamera = view.findViewById(R.id.flipCamera);
                    mute.setVisibility(View.VISIBLE);
                    flipCamera.setVisibility(View.VISIBLE);

                    assert frameLayout != null;
                    frameLayout.setOnTouchListener(new IVSBroadcastCameraViewDoubleTapListener(getContext(), participantData));
                    if (!isUserMuted) {
                        mute.setImageDrawable(AppCompatResources.getDrawable(getContext(), R.drawable.volume_off));
                    } else {
                        mute.setImageDrawable(AppCompatResources.getDrawable(getContext(), R.drawable.volume_up));
                    }
                    mute.setOnClickListener(new OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            if (!isUserMuted) {
                                isUserMuted = true;
                                mute.setImageDrawable(AppCompatResources.getDrawable(getContext(), R.drawable.volume_up));
                                unMuteUser();
                            } else {
                                isUserMuted = false;
                                mute.setImageDrawable(AppCompatResources.getDrawable(getContext(), R.drawable.volume_off));
                                muteUser();
                            }
                        }
                    });

                    flipCamera.setOnClickListener(view12 -> {
                        String cameraView;
                        if (defaultCameraPos.equals("back")) {
                            cameraView = "front";
                        } else {
                            cameraView = "back";
                        }
                        setCameraPosition(cameraView, true);
                    });

                }
                TextView textViewTitle = view.findViewById(R.id.txtParticipantName);
                textViewTitle.setText(mNewData.get(i).getUsername());
                ImageView imageView = view.findViewById(R.id.imageProfile);
                if (!mNewData.get(i).getAvatarUrl().equals(""))
                    Glide.with(getRootView().getContext()).load(mNewData.get(i).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageView);
                GridLayout.LayoutParams param = new GridLayout.LayoutParams(GridLayout.spec(GridLayout.UNDEFINED, GridLayout.FILL, 1f), GridLayout.spec(GridLayout.UNDEFINED, GridLayout.FILL, 1f));
                param.height = 0;
                param.width = 0;
                view.setLayoutParams(param);
                view.setTag(gridLayout);
                gridLayout.addView(view);
            }
            LinearLayout.LayoutParams params2 = new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.MATCH_PARENT);
            params2.weight = 1;
            guestView.addView(gridLayout);
            guestView.requestLayout();
            linearLayout.addView(guestView, params2);
        } else if (isCoHost && localParticipantData.size() > 1) {
            if (participantData != null && participantData.getStageStream() != null && participantData.getStageStream().getPreview() != null) {
                FrameLayout singleView1 = new FrameLayout(getRootView().getContext());
                singleView1.setId(View.generateViewId());
                LinearLayout.LayoutParams singleViewParams1 = new LinearLayout.LayoutParams(getRootView().getMeasuredWidth(), getRootView().getMeasuredHeight());
                View videoPreview = ((ImageDevice) participantData.getStageStream().getDevice()).getPreviewView(BroadcastConfiguration.AspectMode.FILL);
                singleView1.addView(videoPreview);
                singleView1.requestLayout();
                linearLayout.addView(singleView1, singleViewParams1);
                viewInCoHost = true;
            }
        } else {
            if (participantData != null && participantData.getStageStream() != null && participantData.getStageStream().getPreview() != null) {
                View hostView = inflate(getRootView().getContext(), R.layout.item_host, null);
                hostView.setId(View.generateViewId());
                View videoPreview = ((ImageDevice) participantData.getStageStream().getDevice()).getPreviewView(BroadcastConfiguration.AspectMode.FILL);
                videoPreview.setLayoutParams(new ViewGroup.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
                FrameLayout frameLayout = hostView.findViewById(R.id.viewParticipantStage);
                frameLayout.addView(videoPreview);
                LinearLayout.LayoutParams params1 = new LinearLayout.LayoutParams(getRootView().getMeasuredWidth(), getRootView().getMeasuredHeight());
                isSingleClick = false;
                hostView.setOnTouchListener(new IVSBroadcastCameraViewDoubleTapListener(hostView.getContext(), participantData));
                linearLayout.addView(hostView, params1);
            }
        }
        addView(linearLayout, linearLayoutParams);
        linearLayout.setBackgroundColor(Color.BLACK);
        reLayout(linearLayout);
        if (viewInCoHost) {
            if (screenHeight == 0) {
                screenHeight = linearLayout.getHeight();
            }
            isSelectedUserUpdate = false;
            reRenderCoHostView(false, "");
        } else {
            sendIsReadyEvent();
        }
    }

    //RenderCoHostView
    private void reRenderCoHostView(Boolean isCohostSelected, String selectedHostId) {
        removeAllViews();
        //Grid view with host and co-host
        FrameLayout singleView = new FrameLayout(getRootView().getContext());
        singleView.removeAllViews();
        FrameLayout.LayoutParams singleViewParams = new FrameLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        singleView.setLayoutParams(singleViewParams);
        int screenWidth = getRootView().getMeasuredWidth();
        final int frameHeight;
        final int frameWidth;
        ArrayList<ParticipantData> mNewData = new ArrayList<>();
        ParticipantData hostData = null;
        for (int i = 0; i < localParticipantData.size(); i++) {
            if (!localParticipantData.get(i).getViewerType().equals("viewer")) {
                if (localParticipantData.get(i).getViewerType().equals("host")) {
                    hostData = localParticipantData.get(i);
                    if (isCohostSelected) {
                        hostId = selectedHostId;
                    } else {
                        hostId = localParticipantData.get(i).getId();
                    }
                }
                mNewData.add(localParticipantData.get(i));

            }
        }
        int hostPosition = mNewData.indexOf(hostData);
        if (hostPosition != -1) {
            mNewData.remove(hostPosition);
            mNewData.add(0, hostData);
        }
        if (isLiveChallenge && intTeamArray.length == mNewData.size()) {
            ArrayList<Integer> arrayList = new ArrayList<>();
            for (int value : intTeamArray) {
                arrayList.add(value);
            }
            mNewData.sort(Comparator.comparingInt(itemElement -> arrayList.indexOf(Integer.parseInt(itemElement.getId()))));
        }
        int itemSize = mNewData.size();
        if (itemSize == 2) {
            frameWidth = screenWidth / itemSize;
            frameHeight = screenHeight;
        } else if (itemSize == 3 || itemSize == 5 || itemSize == 7 || itemSize == 9 || itemSize == 11) {
            frameWidth = screenWidth / 2;
            if (itemSize == 3) {
                frameHeight = screenHeight / 2;
            } else if (itemSize == 5) {
                frameHeight = screenHeight / 3;
            } else if (itemSize == 7) {
                frameHeight = screenHeight / 4;
            } else if (itemSize == 9) {
                frameHeight = screenHeight / 5;
            } else {
                frameHeight = screenHeight / (itemSize / 2);
            }
        } else if (itemSize == 4 || itemSize == 6 || itemSize == 8 || itemSize == 10) {
            frameWidth = screenWidth / 2;
            if (itemSize == 6) {
                frameHeight = screenHeight / 3;
            } else if (itemSize == 8) {
                frameHeight = screenHeight / 4;
            } else if (itemSize == 10) {
                frameHeight = screenHeight / 5;
            } else {
                frameHeight = screenHeight / 2;
            }
        } else {
            frameWidth = screenWidth;
            frameHeight = screenHeight;
        }
        for (int i = 0; i < itemSize; i++) {
            FrameLayout frameLayout = createSection(frameWidth, frameHeight, mNewData.get(i), watchLiveHostId);
            LinearLayout.LayoutParams marginParams = new LinearLayout.LayoutParams(frameWidth, frameHeight);
            switch (i) {
                case 2:
                case 3:
                case 5:
                case 7:
                case 9:
                    marginParams.leftMargin = frameWidth;
                    int additionalHeight = 0;
                    if ((i == 2 && itemSize == 3) || (i == 3 && itemSize == 5) || (i == 5 && itemSize == 7) || (i == 7 && itemSize == 9)) {
                        additionalHeight = frameHeight * 2;
                    }
                    marginParams.height = (additionalHeight != 0) ? additionalHeight : frameHeight;
                    if (isLiveChallenge && itemSize == 6) {
                        if (i == 2) {
                            marginParams.topMargin = frameHeight * 2;
                            marginParams.leftMargin = 0;
                        }
                        if (i == 3) {
                            marginParams.topMargin = 0;
                        }
                        if (i == 5) {
                            marginParams.topMargin = frameHeight * 2;
                        }
                    } else {
                        switch (i) {
                            case 3:
                                marginParams.topMargin = frameHeight;
                                break;
                            case 5:
                                marginParams.topMargin = frameHeight * 2;
                                break;
                            case 7:
                                marginParams.topMargin = frameHeight * 3;
                                break;
                            case 9:
                                marginParams.topMargin = frameHeight * 4;
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case 4:
                    if (isLiveChallenge && itemSize == 6) {
                        marginParams.topMargin = frameHeight;
                        marginParams.leftMargin = frameWidth;
                    } else marginParams.topMargin = frameHeight * 2;
                    break;
                case 6:
                    marginParams.topMargin = frameHeight * 3;
                    break;
                case 8:
                    marginParams.topMargin = frameHeight * 4;
                    break;
                case 1:
                    if (itemSize != 2) marginParams.topMargin = frameHeight;
                    else marginParams.leftMargin = frameWidth;
                    break;
                default:
                    break;
            }
            frameLayout.setLayoutParams(marginParams);
            singleView.addView(frameLayout);
        }
        if (isLiveChallenge && mNewData.size() > 0 && !isSelectedUserUpdate) {
            FrameLayout frameLayout = new FrameLayout(getRootView().getContext());
            frameLayout.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
            View view = showVSChallengeView(mNewData);//inflate(getRootView().getContext(), R.layout.challenge_view, null);
            view.setId(View.generateViewId());
            view.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT, FrameLayout.LayoutParams.WRAP_CONTENT, Gravity.CENTER));
            frameLayout.addView(view);
            // Set the second view to appear above the first view
            frameLayout.bringChildToFront(view);
            singleView.addView(frameLayout);
            Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    frameLayout.setVisibility(View.GONE);
                }
            }, 5000);
        }
        addView(singleView);
        reLayout(singleView);
        sendIsReadyEvent();
        viewInCoHost = false;
    }

    private View showVSChallengeView(ArrayList<ParticipantData> mNewData) {
        View view = inflate(getRootView().getContext(), R.layout.challenge_view, null);
        view.setId(View.generateViewId());
        ImageView imageProfile1 = view.findViewById(R.id.imageProfile1);
        ImageView imageProfile2 = view.findViewById(R.id.imageProfile2);
        ImageView imageProfile3 = view.findViewById(R.id.imageProfile3);
        ImageView imageProfile4 = view.findViewById(R.id.imageProfile4);
        ImageView imageProfile5 = view.findViewById(R.id.imageProfile5);
        ImageView imageProfile6 = view.findViewById(R.id.imageProfile6);

        if (mNewData.size() == 4) {
            imageProfile2.setVisibility(View.VISIBLE);
            imageProfile5.setVisibility(View.VISIBLE);
            imageProfile3.setVisibility(View.GONE);
            imageProfile4.setVisibility(View.GONE);
            if (!mNewData.get(0).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(0).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile1);
            if (!mNewData.get(1).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(1).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile2);
            if (!mNewData.get(2).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(2).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile5);
            if (!mNewData.get(3).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(3).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile6);
        } else if (mNewData.size() == 6) {
            imageProfile2.setVisibility(View.VISIBLE);
            imageProfile3.setVisibility(View.VISIBLE);
            imageProfile4.setVisibility(View.VISIBLE);
            imageProfile5.setVisibility(View.VISIBLE);
            if (!mNewData.get(0).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(0).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile1);
            if (!mNewData.get(1).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(1).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile2);
            if (!mNewData.get(2).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(2).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile3);
            if (!mNewData.get(3).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(3).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile4);
            if (!mNewData.get(4).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(4).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile5);
            if (!mNewData.get(5).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(5).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile6);
        } else {
            imageProfile2.setVisibility(View.GONE);
            imageProfile3.setVisibility(View.GONE);
            imageProfile4.setVisibility(View.GONE);
            imageProfile5.setVisibility(View.GONE);
            if (!mNewData.get(0).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(0).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile1);
            if (!mNewData.get(1).getAvatarUrl().equals(""))
                Glide.with(getRootView().getContext()).load(mNewData.get(1).getAvatarUrl()).placeholder(R.drawable.avatar).into(imageProfile6);
        }
        return view;
    }

    private FrameLayout createSection(int width, int height, ParticipantData participantData, String watchLiveHostId) {
        View view = inflate(getRootView().getContext(), R.layout.item_participant, null);
        view.setId(View.generateViewId());
        LinearLayout.LayoutParams params1 = new LinearLayout.LayoutParams(getRootView().getMeasuredWidth(), getRootView().getMeasuredHeight());
        if (participantData.getStageStream() != null && participantData.getStageStream().getPreview() != null) {
            View videoPreview = ((ImageDevice) participantData.getStageStream().getDevice()).getPreviewView(BroadcastConfiguration.AspectMode.FILL);
            videoPreview.setLayoutParams(new ViewGroup.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
            FrameLayout frameLayout = view.findViewById(R.id.viewParticipantStage);
            frameLayout.addView(videoPreview);
        }
        TextView textViewTitle = view.findViewById(R.id.txtParticipantName);
        textViewTitle.setText(participantData.getUsername());
        ImageView imageView = view.findViewById(R.id.imageProfile);
        if (!participantData.getAvatarUrl().equals(""))
            Glide.with(getRootView().getContext()).load(participantData.getAvatarUrl()).placeholder(R.drawable.avatar).into(imageView);

        LinearLayout.LayoutParams viewParam = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT);
        view.setLayoutParams(viewParam);
        //Like pressed
        view.setOnTouchListener(new IVSBroadcastCameraViewDoubleTapListener(view.getContext(), participantData));
        FrameLayout section = new FrameLayout(getRootView().getContext());
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(width, height);
        section.addView(view);
        section.setLayoutParams(layoutParams);
        return section;
    }

    private void muteUser() {
        if (mStage != null) {
            Log.d(TAG, "muteUser: " + localStageStreams.size());
            deviceDiscovery = new DeviceDiscovery(getContext());
            List<Device> devices = deviceDiscovery.listLocalDevices();
            Device microphone = null;

            for (Device device : devices) {
                Device.Descriptor descriptor = device.getDescriptor();
                if (descriptor.type == Device.Descriptor.DeviceType.MICROPHONE) {
                    microphone = device;
                    break; // Assuming you want to use the first found microphone
                }
            }

            if (microphone != null) {
                // Using iterator to avoid concurrent modification exceptions
                Iterator<LocalStageStream> iterator = localStageStreams.iterator();
                while (iterator.hasNext()) {
                    LocalStageStream item = iterator.next();
                    if (item.getStreamType().equals(StageStream.Type.AUDIO)) {
                        iterator.remove(); // Safely remove the item from the list
                    }
                }
                for (int i = 0; i < localStageStreams.size(); i++) {
                    Log.d(TAG, "total Local Stream mute User: " + localStageStreams.get(i).getStreamType());
                }
                mStage.refreshStrategy();
            } else {
                Log.e(TAG, "muteUser: Microphone not found");
            }
        }

    }


    private void unMuteUser() {
        if (mStage != null) {
            Log.d(TAG, "unmuteUser: " + localStageStreams.size());
            deviceDiscovery = new DeviceDiscovery(getContext());
            List<Device> devices = deviceDiscovery.listLocalDevices();
            Device microphone = null;
            for (Device device : devices) {
                Device.Descriptor descriptor = device.getDescriptor();
                if (descriptor.type == Device.Descriptor.DeviceType.MICROPHONE) {
                    microphone = device;
                    break; // Assuming you want to use the first found microphone
                }
            }
            if (microphone != null) {
                AudioLocalStageStream microphoneStream = new AudioLocalStageStream(microphone);
                // Using iterator to avoid concurrent modification exceptions
                Iterator<LocalStageStream> iterator = localStageStreams.iterator();
                while (iterator.hasNext()) {
                    LocalStageStream item = iterator.next();
                    if (item.getStreamType().equals(StageStream.Type.AUDIO)) {
                        iterator.remove(); // Safely remove the item from the list
                    }
                }
                localStageStreams.add(microphoneStream);
                mStage.refreshStrategy();

            } else {
                Log.e(TAG, "unmuteUser: Microphone not found");
            }
        }
    }

    private void onReceiveCameraPreviewHandler(@NonNull View preview) {
        removeAllViews();
        addCameraPreview(preview);
    }

    private void onBroadcastEventHandler(IVSBroadcastSessionService.Events event, @Nullable WritableMap eventPayload) {
        switch (event) {
            case ON_ERROR: {
                sendEvent(Events.ON_BROADCAST_ERROR.toString(), eventPayload);
                break;
            }
            case ON_STATE_CHANGED: {
                sendEvent(Events.ON_BROADCAST_STATE_CHANGED.toString(), eventPayload);
                break;
            }
            case ON_AUDIO_STATS: {
                sendEvent(Events.ON_BROADCAST_AUDIO_STATS.toString(), eventPayload);
                break;
            }
            case ON_TRANSMISSION_STATISTICS_CHANGED: {
                sendEvent(Events.ON_TRANSMISSION_STATISTICS_CHANGED.toString(), eventPayload);
                break;
            }
            case ON_QUALITY_CHANGED: {
                sendEvent(Events.ON_BROADCAST_QUALITY_CHANGED.toString(), eventPayload);
                break;
            }
            case ON_NETWORK_HEALTH_CHANGED: {
                sendEvent(Events.ON_NETWORK_HEALTH_CHANGED.toString(), eventPayload);
                break;
            }
            default: {
                throw new RuntimeException("Unknown event name: " + event);
            }
        }
    }

    private void sendEvent(String eventName, @Nullable WritableMap eventPayload) {
        ThemedReactContext reactContext = (ThemedReactContext) super.getContext();
        RCTEventEmitter eventEmitter = reactContext.getJSModule(RCTEventEmitter.class);
        eventEmitter.receiveEvent(getId(), eventName, eventPayload);
    }

    private void sendErrorEvent(String errorMessage) {
        WritableMap eventPayload = Arguments.createMap();
        eventPayload.putString("message", errorMessage);
        sendEvent(Events.ON_ERROR.toString(), eventPayload);
    }

    private void sendIsReadyEvent() {
        if (ivsBroadcastSession != null) {
            WritableMap eventPayload = Arguments.createMap();
            eventPayload.putBoolean("isReady", ivsBroadcastSession.isReady());
            sendEvent(Events.ON_IS_BROADCAST_READY.toString(), eventPayload);
        }
    }

    private void initBroadcastSession() {
        if (ivsBroadcastSession.isInitialized()) return;

        try {
            ivsBroadcastSession.setEventHandler(this::onBroadcastEventHandler);
            ivsBroadcastSession.init();
//            ivsBroadcastSession.getCameraPreviewAsync(this::onReceiveCameraPreviewHandler);
        } catch (RuntimeException error) {
            sendErrorEvent(error.toString());
        }
    }

    public IVSBroadcastCameraView(ThemedReactContext reactContext) {
        super(reactContext);
        Objects.requireNonNull(getWindow()).setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
        reactContext.addLifecycleEventListener(this);
        ivsBroadcastSession = new IVSBroadcastSessionService(reactContext);
    }

    protected void start(@Nullable ReadableArray args) {
        String finalRtmpsUrl = RTMPS_URL;
        String finalStreamKey = STREAM_KEY;

        if (args != null) {
            ReadableMap options = args.getMap(0);
            if (options.hasKey("rtmpsUrl") && !options.isNull("rtmpsUrl")) {
                finalRtmpsUrl = options.getString("rtmpsUrl");
            }
            if (options.hasKey("streamKey") && !options.isNull("streamKey")) {
                finalStreamKey = options.getString("streamKey");
            }
        }

        if (finalRtmpsUrl == null) {
            sendErrorEvent("'rtmpsUrl' is empty.");
            return;
        }

        if (finalStreamKey == null) {
            sendErrorEvent("'streamKey' is empty.");
            return;
        }

        try {
            ivsBroadcastSession.start(finalRtmpsUrl, finalStreamKey);
        } catch (RuntimeException error) {
            sendErrorEvent(error.toString());
        }
    }

    protected void stop() {
        try {
            ivsBroadcastSession.stop();
        } catch (RuntimeException error) {
            sendErrorEvent(error.toString());
        }
    }

    @Deprecated
    protected void swapCamera() {
        try {
            ivsBroadcastSession.swapCamera(this::onReceiveCameraPreviewHandler);
        } catch (RuntimeException error) {
            sendErrorEvent(error.toString());
        }
    }

    protected void cleanUp() {
        removeAllViews();
        ivsBroadcastSession.deinit();
    }

    protected void setIsMuted(boolean isMuted) {
        Log.d(TAG, "setIsMuted: " + isMuted);
        isUserMuted = isMuted;
        if (isMuted) {
            unMuteUser();
        } else {
            muteUser();
        }
    }


    protected void setIsCameraPreviewMirrored(boolean isCameraPreviewMirrored) {
        ivsBroadcastSession.setIsCameraPreviewMirrored(isCameraPreviewMirrored, this::onReceiveCameraPreviewHandler);
    }

    protected void setCameraPosition(String cameraPosition, Boolean isFrom) {
        defaultCameraPos = cameraPosition;
        if (mStage != null) { //called after stage creation when user swap camera F->B , B->F
            manageSwapCameraFun(defaultCameraPos, isFrom);
        } else {
            ivsBroadcastSession.setCameraPosition(defaultCameraPos, this::onReceiveCameraPreviewHandler);
        }
    }

    private void manageSwapCameraFun(String cameraPosition, Boolean isFrom) {
        localStageStreams.clear();
        List<Device> devices = deviceDiscovery.listLocalDevices();
        List<LocalStageStream> publishStreams = new ArrayList<>();
        Device frontCamera = null;
        Device microphone = null;

        Device.Descriptor.Position cameraPos = Device.Descriptor.Position.UNKNOWN;
        if (isFrom) {
            if (cameraPosition.equals("back")) {
                cameraPos = Device.Descriptor.Position.BACK;
            } else {
                cameraPos = Device.Descriptor.Position.FRONT;
            }
        } else {
            if (cameraPosition.equals("back")) {
                cameraPos = Device.Descriptor.Position.FRONT;
            } else {
                cameraPos = Device.Descriptor.Position.BACK;
            }
        }

        for (Device device : devices) {
            Device.Descriptor descriptor = device.getDescriptor();

            if (frontCamera == null && descriptor.type == Device.Descriptor.DeviceType.CAMERA && descriptor.position == cameraPos) {
                frontCamera = device;
            }
            if (microphone == null && descriptor.type == Device.Descriptor.DeviceType.MICROPHONE) {
                microphone = device;
            }
        }

        assert frontCamera != null;
        StageVideoConfiguration config = new StageVideoConfiguration();
        config.setTargetFramerate(10);
        config.setMaxBitrate(1500000);
        ImageLocalStageStream cameraStream = new ImageLocalStageStream(frontCamera,config);
        assert microphone != null;
//        AudioLocalStageStream microphoneStream = new AudioLocalStageStream(microphone);
        localStageStreams.add(cameraStream);
//        localStageStreams.add(microphoneStream);
        mStage.refreshStrategy();
    }

    protected void setCameraPreviewAspectMode(String cameraPreviewAspectMode) {
        ivsBroadcastSession.setCameraPreviewAspectMode(cameraPreviewAspectMode, this::onReceiveCameraPreviewHandler);
    }

    protected void setRtmpsUrl(String rtmpsUrl) {
        RTMPS_URL = rtmpsUrl;
    }

    protected void setStreamKey(String streamKey) {
        STREAM_KEY = streamKey;
    }

    protected void setSessionLogLevel(String sessionLogLevel) {
        ivsBroadcastSession.setSessionLogLevel(sessionLogLevel);
    }

    protected void setLogLevel(String logLevel) {
        ivsBroadcastSession.setLogLevel(logLevel);
    }

    protected void setConfigurationPreset(String configurationPreset) {
        ivsBroadcastSession.setConfigurationPreset(configurationPreset);
    }

    protected void setVideoConfig(ReadableMap videoConfig) {
        ivsBroadcastSession.setVideoConfig(videoConfig);
    }

    protected void setAudioConfig(ReadableMap audioConfig) {
        ivsBroadcastSession.setAudioConfig(audioConfig);
    }

    protected void setHostId(String hostId) {
        this.hostId = hostId;
    }

    protected void setBroadcastDetail(String broadcastDetailJsonString) {
        try {
            broadcastDetail = new JSONObject(broadcastDetailJsonString);
            IVS_TOKEN = broadcastDetail.getString("token");
            if (!IVS_TOKEN.equals("") && mStage == null) {
                userInfo = new UserInfo();
                userInfo.setUserId(broadcastDetail.getString("userId"));
                userInfo.setUserName(broadcastDetail.getString("userName"));
                userInfo.setIsHost(broadcastDetail.getString("isHost"));
                userInfo.setPhoto(broadcastDetail.getString("photo"));
                userInfo.setUserRole(broadcastDetail.getString("userRole"));
                userInfo.setIsViewer(broadcastDetail.getString("isViewer"));
                setupStage();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void endBroadcast() {
        releaseResources();
        endButtonPressed();
    }

    private void releaseResources() {
        if (mStage != null) {
            mStage.release();
            mStage = null;
        }
        if (ivsBroadcastSession != null) {
            ivsBroadcastSession.deinit();
        }

        if (deviceDiscovery != null) {
            deviceDiscovery.release();
            deviceDiscovery = null;
        }
        localParticipantData.clear();
        localStageStreams.clear();
    }

    public void streamViewHeight(String nativeViewHeight) {
        Log.d(TAG, "streamViewHeight: " + nativeViewHeight);
        streamViewHeight = Float.parseFloat(nativeViewHeight);
    }

    public void selectedChallengeUserId(String hostId) {
        Log.d(TAG, "selectedChallengeUserId: " + hostId);
        watchLiveHostId = hostId;
        isSelectedUserUpdate = true;
        reRenderCoHostView(true, hostId);

    }


    public void setTeamIdForNative(String mSetTeamIdForNative) {
        Log.d(TAG, "setTeamIdForNative: " + mSetTeamIdForNative);
        setTeamIdForNative = mSetTeamIdForNative;
    }

    public void isLiveChallenge(String mIsLiveChallenge) {
        Log.d(TAG, "isLiveChallenge: " + mIsLiveChallenge);
        //Adjust existing view height while Live challenge start
        if (mIsLiveChallenge.equals("true") && screenHeight != 0) {
            isLiveChallenge = true;
            String[] values = setTeamIdForNative.replaceAll("[\\[\\]]", "").split(",");
            intTeamArray = new int[values.length];
            for (int i = 0; i < values.length; i++) {
                intTeamArray[i] = Integer.parseInt(values[i]);
            }
            Log.d(TAG, "isLiveChallenge: " + Arrays.toString(intTeamArray));
            screenHeight = screenHeight - 40;
            isSelectedUserUpdate = false;
            if (!watchLiveHostId.isEmpty()) {
                reRenderCoHostView(true, watchLiveHostId);
            } else {
                reRenderCoHostView(false, "");
            }
        }
        if (mIsLiveChallenge.equals("false")) {
            if (isCoHost) {
                isLiveChallenge = false;
            }
        }
    }


    private void setupStage() {
        Stage stage = new Stage(getContext(), IVS_TOKEN, strategy);
        try {
            ParticipantData participantData = new ParticipantData();
            participantData.setId(userInfo.getUserId());
            participantData.setUsername(userInfo.getUserName());
            participantData.setAvatarUrl(userInfo.getPhoto());
            participantData.setHost(Objects.equals(userInfo.getIsHost(), "true"));
            participantData.setLocal(true);
            participantData.setViewerType(userInfo.getUserRole());
            localParticipantData.add(0, participantData);

            if (!userInfo.getUserRole().equals("viewer")) {
                deviceDiscovery = new DeviceDiscovery(getContext());
                List<Device> devices = deviceDiscovery.listLocalDevices();
                Device frontCamera = null;
                Device microphone = null;
                // Create streams using the front camera, first microphone
                for (Device device : devices) {
                    Device.Descriptor descriptor = device.getDescriptor();
                    if (frontCamera == null && descriptor.type == Device.Descriptor.DeviceType.CAMERA && descriptor.position == Device.Descriptor.Position.FRONT) {
                        frontCamera = device;
                    }
                    if (microphone == null && descriptor.type == Device.Descriptor.DeviceType.MICROPHONE) {
                        microphone = device;
                    }
                }
                assert frontCamera != null;
                StageVideoConfiguration config = new StageVideoConfiguration();
                config.setTargetFramerate(10);
                config.setMaxBitrate(1500000);
                ImageLocalStageStream cameraStream = new ImageLocalStageStream(frontCamera, config);
//                assert microphone != null;
//                AudioLocalStageStream microphoneStream = new AudioLocalStageStream(microphone);
                localStageStreams.add(cameraStream);
//                localStageStreams.add(microphoneStream);
            } else {
                if (deviceDiscovery != null) {
                    deviceDiscovery.release();
                    deviceDiscovery = null;
                }
                ivsBroadcastSession.deinit();
            }
            if (mStage != null) {
                mStage.release();
            }
            mStage = stage;
            mStage.join();
            stage.addRenderer(stageRenderer);
        } catch (BroadcastException exception) {
            Log.d(TAG, "setupStage: " + exception.getLocalizedMessage());
        }
    }

    private final AnalyticsStageRenderer stageRenderer = new AnalyticsStageRenderer() {
        @Override
        public void onError(@NonNull BroadcastException e) {
            Log.d(TAG, "getStageRenderer onError: " + e.getLocalizedMessage());
        }

        @Override
        public void onConnectionStateChanged(@NonNull Stage stage, @NonNull Stage.ConnectionState connectionState, @Nullable BroadcastException e) {
            Log.d(TAG, "getStageRenderer onConnectionStateChanged: " + connectionState);
        }

        @Override
        public void onParticipantJoined(@NonNull Stage stage, @NonNull ParticipantInfo participantInfo) {
            Objects.requireNonNull(getWindow()).setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING);
            Log.d(TAG, "getStageRenderer onParticipantJoined: " + participantInfo.participantId);
            if (participantInfo.isLocal) {
                if (localParticipantData.size() == 0) {
                    return;
                }
                if (!participantInfo.participantId.equals("")) {
                    localParticipantData.get(0).setParticipantId(participantInfo.participantId);
                }
            } else {
                if (!participantInfo.participantId.equals("")) {
                    ParticipantData participantData = new ParticipantData();
                    participantData.setParticipantId(participantInfo.participantId);
                    if (participantInfo.userInfo != null && !participantInfo.userInfo.isEmpty()) {
                        HashMap<String, String> userInfo = participantInfo.userInfo;
                        Log.d(TAG, "onParticipantJoined: " + participantInfo.participantId + " " + userInfo.get("userRole") + " " + userInfo.get("userId") + " " + userInfo.get("userName"));
                        participantData.setViewerType(userInfo.get("userRole"));
                        participantData.setId(userInfo.get("userId"));
                        participantData.setUsername(userInfo.get("userName"));
                        participantData.setAvatarUrl(userInfo.get("photo"));
                    } else {
                        participantData.setViewerType("guest");
                    }
                    participantData.setLocal(false);
                    localParticipantData.add(participantData);
                }
            }
            sendParticipantAdded(participantInfo);
        }

        @Override
        public void onParticipantLeft(@NonNull Stage stage, @NonNull ParticipantInfo participantInfo) {
            Log.d(TAG, "getStageRenderer onParticipantLeft: " + participantInfo.participantId);
            sendParticipantLeft(participantInfo);
        }

        @Override
        public void onParticipantPublishStateChanged(@NonNull Stage stage, @NonNull ParticipantInfo participantInfo, @NonNull Stage.PublishState publishState) {
            Log.d(TAG, "getStageRenderer onParticipantPublishStateChanged: " + publishState.name());

        }

        @Override
        public void onParticipantSubscribeStateChanged(@NonNull Stage stage, @NonNull ParticipantInfo participantInfo, @NonNull Stage.SubscribeState subscribeState) {
            Log.d(TAG, "getStageRenderer onParticipantSubscribeStateChanged: " + subscribeState);
        }

        @Override
        public void onStreamsAdded(@NonNull Stage stage, @NonNull ParticipantInfo participantInfo, @NonNull List<StageStream> list) {
            Log.d(TAG, "getStageRenderer onStreamsAdded: ");
            for (StageStream stream : list) {
                try {
                    if (stream.getStreamType() == StageStream.Type.VIDEO) {
                        if (!localParticipantData.isEmpty()) {
                            for (int i = 0; i < localParticipantData.size(); i++) {
                                if (Objects.equals(localParticipantData.get(i).getParticipantId(), participantInfo.participantId)) {
                                    ParticipantData participantData = localParticipantData.get(i);
                                    participantData.setStageStream(stream);
                                    localParticipantData.set(i, participantData);
                                    break;
                                }
                            }
                        }
                        manageMultiHostView();
                    }
                } catch (Exception e) {
                    Log.d(TAG, "onStreamsAdded: Failed to get video preview for participant: " + participantInfo);
                }
            }
        }

        @Override
        public void onStreamsRemoved(@NonNull Stage stage, @NonNull ParticipantInfo participantInfo, @NonNull List<StageStream> list) {
            Log.d(TAG, "onStreamsRemoved: " + list.size());
            for (int i = 0; i < list.size(); i++) {
                Log.d(TAG, "onStreamsRemoved: " + list.get(i).getStreamType());
            }
            Log.d(TAG, "getStageRenderer onStreamsRemoved: ");
            for (StageStream stream : list) {
                Log.d(TAG, "onStreamsRemoved: " + stream.getStreamType());
            }
        }

        @Override
        public void onStreamsMutedChanged(@NonNull Stage stage, @NonNull ParticipantInfo participantInfo, @NonNull List<StageStream> list) {
            Log.d(TAG, "getStageRenderer onStreamsMutedChanged: " + participantInfo.participantId);
            for (StageStream stream : list) {
                try {
                    if (!localParticipantData.isEmpty()) {
                        for (int i = 0; i < localParticipantData.size(); i++) {
                            if (Objects.equals(localParticipantData.get(i).getParticipantId(), participantInfo.participantId)) {
                                ParticipantData participantData = localParticipantData.get(i);
                                participantData.setStageStream(stream);
                                localParticipantData.set(i, participantData);
                                break;
                            }
                        }
                    }
                    manageMultiHostView();
                } catch (Exception e) {
                    Log.d(TAG, "onStreamsAdded: Failed to get video preview for participant: " + participantInfo);
                }
            }
        }

        @Override
        public void onAnalyticsEvent(@NonNull String s, @NonNull String s1) {
            Log.d(TAG, "onAnalyticsEvent: " + s + " :: " + s1);
        }
    };

    private final Stage.Strategy strategy = new Stage.Strategy() {
        @NonNull
        @Override
        public List<LocalStageStream> stageStreamsToPublishForParticipant(@NonNull Stage stage, @NonNull ParticipantInfo participantInfo) {
            Log.d(TAG, "stageStreamsToPublishForParticipant = " + localStageStreams.size());

            for (int i = 0; i < localStageStreams.size(); i++) {
                Log.d(TAG, "stageStreamsToPublishForParticipant for loop = " + localStageStreams.get(i).getStreamType() + " === " + localStageStreams.get(i).getMuted());
            }
            return localStageStreams;
        }

        @Override
        public boolean shouldPublishFromParticipant(@NonNull Stage stage, ParticipantInfo participantInfo) {
            Log.d(TAG, "shouldPublishFromParticipant: " + participantInfo.userInfo);
            return true;
        }

        @Override
        public Stage.SubscribeType shouldSubscribeToParticipant(@NonNull Stage stage, ParticipantInfo participantInfo) {
            Log.d(TAG, "shouldSubscribeToParticipant: " + participantInfo.userInfo);
            return Stage.SubscribeType.AUDIO_VIDEO;
        }
    };

    private void sendParticipantAdded(ParticipantInfo participantInfo) {
        boolean isViewer = false;
        WritableMap eventPayload = Arguments.createMap();
        if (localParticipantData.size() > 0)
            for (ParticipantData participantData : localParticipantData) {
                Log.d(TAG, "sendParticipantAdded: " + participantInfo.participantId);
                Log.d(TAG, "sendParticipantAdded: " + participantData.getParticipantId() + " " + participantData.getUsername() + " " + participantData.getViewerType());
                if (participantData.getParticipantId().equals(participantInfo.participantId) && participantData.getViewerType() != null && participantData.getViewerType().equals("viewer")) {
                    isViewer = true;
                    break;
                }
            }
        if (isViewer) {
            return;
        }
        if (participantInfo.isLocal) {
            eventPayload.putString("userId", userInfo.getUserId());
            eventPayload.putString("userName", userInfo.getUserName());
            eventPayload.putString("userRole", userInfo.getUserRole());
            eventPayload.putString("userPhoto", userInfo.getPhoto());
        } else {
            if (participantInfo.userInfo != null) {
                HashMap<String, String> userInfo = participantInfo.userInfo;
                String role = "";
                if (Objects.equals(userInfo.get("userRole"), "")) {
                    role = "guest";
                } else {
                    role = userInfo.get("userRole");
                }
                eventPayload.putString("userId", userInfo.get("userId"));
                eventPayload.putString("userName", userInfo.get("userName"));
                eventPayload.putString("userRole", role);
                eventPayload.putString("userPhoto", userInfo.get("photo"));

            }
        }
        sendEvent(Events.ON_PARTICIPANT_ADDED.toString(), eventPayload);
    }

    private void sendParticipantLeft(ParticipantInfo participantInfo) {
        WritableMap eventPayload = Arguments.createMap();
        boolean isViewer = false;
        if (!localParticipantData.isEmpty()) {
            int participantIndex = 0;
            for (int i = 0; i < localParticipantData.size(); i++) {
                if (Objects.equals(localParticipantData.get(i).getParticipantId(), participantInfo.participantId)) {
                    participantIndex = i;
                }
            }
            HashMap<String, String> userInfo = participantInfo.userInfo;
            String role = "";
            if (Objects.equals(userInfo.get("userRole"), "")) {
                role = "guest";
            } else {
                role = userInfo.get("userRole");
            }
            eventPayload.putString("userId", userInfo.get("userId"));
            eventPayload.putString("userName", userInfo.get("userName"));
            eventPayload.putString("userRole", role);
            eventPayload.putString("userPhoto", userInfo.get("photo"));
            sendEvent(Events.ON_PARTICIPANT_LEFT.toString(), eventPayload);
            if (localParticipantData.get(participantIndex).getViewerType().equals("viewer")) {
                isViewer = true;
            }
            localParticipantData.remove(participantIndex);
        }
        if (localParticipantData.size() > 0) {
            if (isCoHost && isLiveChallenge && !isViewer) {
                isLiveChallenge = false;
                isSelectedUserUpdate = false;
                reRenderCoHostView(false, "");
            } else {
                isGuest = false;
                isCoHost = false;
                manageMultiHostView();
            }
        }
    }

    private void sendGridTapUserData(ParticipantData participantData) {
        WritableMap eventPayload = Arguments.createMap();
        if (participantData != null) {
            eventPayload.putString("userId", participantData.getId());
            sendEvent(Events.ON_GRID_TAPPED.toString(), eventPayload);
        }
    }

    private void endButtonPressed() {
        WritableMap eventPayload = Arguments.createMap();
        eventPayload.putBoolean("isPressed", true);
        sendEvent(Events.ON_STREAM_END.toString(), eventPayload);
    }


    @Override
    public void onHostResume() {
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        cleanUp();
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        initBroadcastSession();
    }

    @SuppressLint("ClickableViewAccessibility")
    protected void setonLikePressed(IVSBroadcastCameraView view, boolean listener) {
        view.setOnTouchListener(new IVSBroadcastCameraViewDoubleTapListener(this.getContext(), null));
    }

    public class IVSBroadcastCameraViewDoubleTapListener implements View.OnTouchListener {
        private final GestureDetector gestureDetector;

        public IVSBroadcastCameraViewDoubleTapListener(Context context, ParticipantData participantData) {
            gestureDetector = new GestureDetector(context, new GestureDetector.SimpleOnGestureListener() {
                @Override
                public boolean onDoubleTap(@NonNull MotionEvent e) {
                    if (isDoubleClick) {
                        if (participantData != null) {
                            if (!userInfo.getUserId().equals(participantData.getId()) && participantData.getViewerType().equals("host")) {
                                if (!watchLiveHostId.isEmpty() && userInfo.getIsViewer().equals("true")) { //when click in cohost if cliacble user is Host then this condition called
                                    WritableMap eventPayload = Arguments.createMap();
                                    Log.d(TAG, "onDoubleTap: " + watchLiveHostId);
                                    eventPayload.putString("userId", watchLiveHostId);
                                    sendEvent(Events.ON_LIKE_PRESSED.toString(), eventPayload);
                                } else {
                                    WritableMap eventPayload = Arguments.createMap();
                                    Log.d(TAG, "onDoubleTap: " + participantData.getId());
                                    eventPayload.putString("userId", participantData.getId());
                                    sendEvent(Events.ON_LIKE_PRESSED.toString(), eventPayload);
                                }
                            } else if (participantData.getViewerType().equals("cohost")) {
                                if (!Objects.equals(participantData.getId(), userInfo.getUserId())) {
                                    WritableMap eventPayload = Arguments.createMap();
                                    Log.d(TAG, "onDoubleTap: " + participantData.getId());
                                    eventPayload.putString("userId", participantData.getId());
                                    sendEvent(Events.ON_LIKE_PRESSED.toString(), eventPayload);
                                }
                               /* if(!watchLiveHostId.isEmpty()) {
                                    WritableMap eventPayload = Arguments.createMap();
                                    Log.d(TAG, "onDoubleTap: " + watchLiveHostId);
                                    eventPayload.putString("userId", watchLiveHostId);
                                    sendEvent(Events.ON_LIKE_PRESSED.toString(), eventPayload);
                                }*/
                            }
                        }
                    }
                    return true;
                }

                @Override
                public boolean onSingleTapConfirmed(@NonNull MotionEvent e) {
                    if (isSingleClick) {

                        if (userInfo.getIsViewer().equals("true") && !participantData.getId().equals(hostId)) {
                            if (participantData != null) sendGridTapUserData(participantData);
                        }
                    }
                    return super.onSingleTapConfirmed(e);
                }
            });
        }

        @SuppressLint("ClickableViewAccessibility")
        @Override
        public boolean onTouch(View view, MotionEvent motionEvent) {
            gestureDetector.onTouchEvent(motionEvent);
            return true;
        }
    }

    @Override
    protected void onDetachedFromWindow() {
        releaseResources();
        super.onDetachedFromWindow();
    }
}

