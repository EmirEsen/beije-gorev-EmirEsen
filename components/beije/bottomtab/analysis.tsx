import React from 'react';
import Svg, { Rect, Path, SvgProps, G, Defs, ClipPath } from 'react-native-svg';

export default function Analysis(props: SvgProps) {
    return (
        <Svg
            width={65}
            height={32}
            viewBox="0 0 65 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#clip0_2407_1893)">
                <Path
                    d="M23.735 11.28H27.685C27.965 11.28 28.185 11.5 28.185 11.78V25.17H23.735C23.455 25.17 23.235 24.95 23.235 24.67V11.78C23.235 11.5 23.455 11.28 23.735 11.28Z"
                    fill={props.color}
                />
                <Path
                    d="M41.015 25.1702H36.565V16.2402C36.565 15.9602 36.785 15.7402 37.065 15.7402H41.015C41.295 15.7402 41.515 15.9602 41.515 16.2402V24.6702C41.515 24.9502 41.295 25.1702 41.015 25.1702Z"
                    fill={props.color}
                />
                <Path
                    d="M30.395 6.83008H34.345C34.625 6.83008 34.845 7.05008 34.845 7.33008V25.1701H29.895V7.33008C29.895 7.05008 30.125 6.83008 30.395 6.83008Z"
                    fill={props.color}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_2407_1893">
                    <Rect
                        width={18.28}
                        height={18.34}
                        fill="white"
                        transform="translate(23.235 6.83008)"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

