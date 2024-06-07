import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
export const HomeIcon = (props: SvgProps) => (
  <Svg
    width='20px'
    height='20px'
    viewBox='0 0 15 15'
    fill='none'
    {...props}
  >
    <Path
      d='M7.8254 0.120372C7.63815 -0.0401239 7.36185 -0.0401239 7.1746 0.120372L0 6.27003V13.5C0 14.3284 0.671573 15 1.5 15H5.5C5.77614 15 6 14.7761 6 14.5V11.5C6 10.6716 6.67157 10 7.5 10C8.32843 10 9 10.6716 9 11.5V14.5C9 14.7761 9.22386 15 9.5 15H13.5C14.3284 15 15 14.3284 15 13.5V6.27003L7.8254 0.120372Z'
      fill='#000000'
    />
  </Svg>
);

export const LocationIcon = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <Path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.5742 21.8187C12.2295 22.0604 11.7699 22.0601 11.4253 21.8184L11.4228 21.8166L11.4172 21.8127L11.3986 21.7994C11.3829 21.7882 11.3607 21.7722 11.3325 21.7517C11.2762 21.7106 11.1956 21.6511 11.0943 21.5741C10.8917 21.4203 10.6058 21.1962 10.2641 20.9101C9.58227 20.3389 8.67111 19.5139 7.75692 18.4988C5.96368 16.5076 4 13.6105 4 10.3636C4 8.16134 4.83118 6.0397 6.32548 4.46777C7.82141 2.89413 9.86146 2 12 2C14.1385 2 16.1786 2.89413 17.6745 4.46777C19.1688 6.0397 20 8.16134 20 10.3636C20 13.6105 18.0363 16.5076 16.2431 18.4988C15.3289 19.5139 14.4177 20.3389 13.7359 20.9101C13.3942 21.1962 13.1083 21.4203 12.9057 21.5741C12.8044 21.6511 12.7238 21.7106 12.6675 21.7517C12.6393 21.7722 12.6171 21.7882 12.6014 21.7994L12.5828 21.8127L12.5772 21.8166L12.5754 21.8179L12.5742 21.8187ZM9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10Z'
      fill='#000000'
    />
  </Svg>
);

export const Menuicon = (props: SvgProps) => (
  <Svg
    fill='#000000'
    width={props.width}
    height={props.height}
    viewBox='0 0 52 52'
    {...props}
  >
    <Path d='M20,44c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,47.3,20,44z M20,26c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6 S20,29.3,20,26z M20,8c0-3.3,2.7-6,6-6s6,2.7,6,6s-2.7,6-6,6S20,11.3,20,8z' />
  </Svg>
);

export const Cross = (props: SvgProps) => (
  <Svg
  width={props.width}
  height={props.height}
  viewBox='0 0 15 15'
  id='cross'
  {...props}
>
  <Path
    d='M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#xA;&#x9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#xA;&#x9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#xA;&#x9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#xA;&#x9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z'
  />
</Svg>
);

export const DownArrow = (props: SvgProps) => (
  <Svg
    fill='#353839'
    width={props.width}
    height={props.height}
    viewBox='0 0 32 32'
    {...props}
  >
    <Path d='M11.125 16.313l7.688-7.688 3.594 3.719-11.094 11.063-11.313-11.313 3.5-3.531z' />
  </Svg>
);






export const WorkingIcon = (props: SvgProps) => (
  <Svg
    fill='#000000'
    width='20px'
    height='20px'
    viewBox='0 0 24 24'
    {...props}
    
  >
    <Path d='M5,21H19a2.006,2.006,0,0,0,2-2V9a2.006,2.006,0,0,0-2-2H17V5a2,2,0,0,0-2-2H9A2,2,0,0,0,7,5V7H5A2.006,2.006,0,0,0,3,9V19A2.006,2.006,0,0,0,5,21ZM9,5.5A.5.5,0,0,1,9.5,5h5a.5.5,0,0,1,.5.5V7H9Z' />
  </Svg>
);





