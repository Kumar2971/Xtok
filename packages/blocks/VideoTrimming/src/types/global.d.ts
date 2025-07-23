declare module 'react-native-drag-resize';

declare module 'react-native-draggable-dynamic-flatlist';

declare module 'react-native-video-controls';

declare module "react-native-trimmer" {
    interface TrimmerProps {
        tintColor: string;
                  markerColor: string;
                  trackBackgroundColor: string;
                  trackBorderColor: string;
                  scrubberColor: string;
                  trimmerLeftHandlePosition: number;
                  trimmerRightHandlePosition: number;
                  minimunTrimDuration: number;
                  maxTrimDuration: number;
      totalDuration: number;
      zoomMultiplier: number;
      maximumZoomLevel: number;
      initialZoomValue: number;
      scaleInOnInit?: boolean;
      scrubberPosition?:number;
      trimmerLeftHandlePosition: number;
      trimmerRightHandlePosition: number;
      minimunTrimDuration: number;
      maxTrimDuration: number;
      onHandleChange: (event: {
        leftPosition: number;
        rightPosition: number;
      }) => void;
    }
    export default class Trimmer extends React.Component<TrimmerProps> {}
  }