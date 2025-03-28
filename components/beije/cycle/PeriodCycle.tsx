import React from 'react';
import Svg, { Rect, Path, SvgProps } from 'react-native-svg';

export default function PeriodCycle(props: SvgProps) {
    return (
        <Svg
            width={115}
            height={64}
            viewBox="0 0 115 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M0.11969 12.2452C-0.114685 5.5335 5.14316 -0.148237 11.8521 0.154503C30.3972 0.991348 48.668 5.22032 65.7478 12.6669C82.8275 20.1135 98.3603 30.6225 111.594 43.641C116.382 48.3507 115.797 56.0698 110.72 60.4657C105.643 64.8616 98.0007 64.2608 93.1419 59.6247C82.3348 49.3129 69.7783 40.9551 56.0281 34.9602C42.278 28.9653 27.6088 25.453 12.6987 24.5523C5.99509 24.1474 0.354065 18.9569 0.11969 12.2452Z"
                fill="#FBD7CE"
            />
        </Svg>
    );
};
