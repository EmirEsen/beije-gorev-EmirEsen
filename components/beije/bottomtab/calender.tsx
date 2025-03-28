import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Calender(props: SvgProps) {
    return (
        <Svg
            width={65}
            height={32}
            viewBox="0 0 65 32"
            fill={props.color}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M23.455 13.4502H41.795V22.9802C41.795 24.1902 40.805 25.1802 39.595 25.1802H25.655C24.445 25.1802 23.455 24.1902 23.455 22.9802V13.4502Z"
                fill={props.color}
            />
            <Path
                d="M25.655 6.82007H39.595C40.805 6.82007 41.795 7.81007 41.795 9.02007V11.8301H23.455V9.02007C23.455 7.81007 24.445 6.82007 25.655 6.82007Z"
                fill={props.color}
            />
        </Svg>
    );
};










