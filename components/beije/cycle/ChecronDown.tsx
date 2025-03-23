import React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

export default function ChevronDown(props: SvgProps) {
    return (
        <Svg
            width={19}
            height={18}
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M5 6.75L9.5 11.25L14 6.75"
                stroke="#F4896D"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
