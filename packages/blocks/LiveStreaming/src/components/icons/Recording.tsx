import * as React from "react";
import Svg, { Mask, Path, G, Circle, SvgProps } from "react-native-svg";

function Recording(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Mask id="a" x={0} y={0} width={24} height={24}>
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Circle cx={12} cy={12} r={5} fill="#fff" />
        <Circle cx={12} cy={12} r={10} stroke="#fff" strokeWidth={2} />
      </G>
    </Svg>
  );
}

export default Recording;
