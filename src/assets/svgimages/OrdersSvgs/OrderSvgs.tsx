import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const RightArrowIcon = (props: SvgProps) => (
  <Svg
    fill='#000000'
    width='20px'
    height='20px'
    viewBox='-77 0 512 512'
    {...props}
  >
    <Path d='M98 460L64 426 227 262 64 98 98 64 294 262 98 460Z' />
  </Svg>
);
