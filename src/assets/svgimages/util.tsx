import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CrossMark = (props: SvgProps) => (
  <Svg
    fill={props.color}
    width={props.width}
    height={props.height}
    viewBox='-28 0 512 512'
    {...props}
  >
    <Path d='M64 388L196 256 64 124 96 92 228 224 360 92 392 124 260 256 392 388 360 420 228 288 96 420 64 388Z' />
  </Svg>
);
export default CrossMark;
