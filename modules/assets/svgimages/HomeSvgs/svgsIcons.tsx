import * as React from "react";
import Svg, { SvgProps, Path, G, Line } from "react-native-svg";
export const AddProductIcon = (props: SvgProps) => (
    <Svg
        fill={props.color}
        width='20px'
        height='20px'
        viewBox='0 0 24 24'
        id='plus'
        data-name='Line Color'
        {...props}
    >
        <Path
            id='primary'
            d='M5,12H19M12,5V19'
            fill="none"
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        />
    </Svg>
);

export const FavouriteIcon = (props: SvgProps) => (
    <Svg
    width={props.width}
    height={props.height}
    viewBox='0 0 24 24'
    fill='none'
    {...props}
  >
    <Path
      clipRule='evenodd'
      d='M6.47358 1.96511C8.27963 1.93827 10.2651 2.62414 12 4.04838C13.7349 2.62414 15.7204 1.93827 17.5264 1.96511C19.5142 1.99465 21.3334 2.90112 22.2141 4.68531C23.0878 6.45529 22.9326 8.87625 21.4643 11.7362C19.9939 14.6003 17.1643 18.0021 12.4867 21.8566C12.4382 21.898 12.3855 21.9324 12.3298 21.9596C12.1243 22.0601 11.8798 22.0624 11.6702 21.9596C11.6145 21.9324 11.5618 21.898 11.5133 21.8566C6.83565 18.0021 4.00609 14.6003 2.53569 11.7362C1.06742 8.87625 0.912211 6.45529 1.78589 4.68531C2.66659 2.90112 4.4858 1.99465 6.47358 1.96511Z'
      fill={props.fill}
      stroke={props.color}
      fillRule='evenodd'
    />
  </Svg>
);

export const BackButtonIcon = (props: SvgProps) => (
  <Svg
    width='25px'
    height='25px'
    viewBox='0 0 1024 1024'
    {...props}
  >
    <Path
      fill='#000000'
      d='M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z'
    />
    <Path
      fill='#000000'
      d='m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z'
    />
  </Svg>
);

export const RemoveProductIcon = (props: SvgProps) => (
    <Svg
    fill='#ffffff'
    width='22px'
    height='25px'
    viewBox='-3 0 19 19'
    {...props}
  >
    <Path d='M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H1.319a1.03 1.03 0 1 1 0-2.059h10.364a1.03 1.03 0 0 1 1.029 1.03z' />
  </Svg>
);

