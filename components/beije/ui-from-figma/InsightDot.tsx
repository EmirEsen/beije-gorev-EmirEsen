import React from 'react';
import Svg, { Rect, Defs, Pattern, Use, Image, ClipPath, RadialGradient, Stop, Mask, Path, G } from 'react-native-svg';

export default function InsightDot(props: any) {
    return (
        <>
            <Svg
                width={36}
                height={36}
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                {...props}
            >
                <Rect width={36} height={36} fill="#1E1E1E" />
                <G clipPath="url(#clip0_0_1)">
                    <Rect x={-36} y={-465} width={375} height={812} rx={10} fill="#FDECE7" />
                    <Rect
                        x={-36}
                        y={-465}
                        width={375}
                        height={812}
                        rx={10}
                        fill="url(#paint0_radial_0_1)"
                        fillOpacity={0.2}
                    />
                    <Rect
                        x={-36}
                        y={-465}
                        width={375}
                        height={812}
                        rx={10}
                        fill="url(#paint1_radial_0_1)"
                        fillOpacity={0.2}
                    />
                    <Rect
                        x={-36}
                        y={-465}
                        width={375}
                        height={812}
                        rx={10}
                        fill="url(#paint2_radial_0_1)"
                        fillOpacity={0.4}
                    />
                    <Rect
                        width={375}
                        height={973}
                        transform="translate(-36 -153)"
                        fill="#F7F7F7"
                    />
                    <Rect x={-12} y={-10} width={327} height={352} rx={8} fill="white" />
                    <Mask id="path-4-inside-1_0_1" fill="white">
                        <Path d="M-8 -10H311V46H-8V-10Z" />
                    </Mask>
                    <Path
                        d="M311 45H-8V47H311V45Z"
                        fill="#F3F3F3"
                        mask="url(#path-4-inside-1_0_1)"
                    />
                    <G clipPath="url(#clip1_0_1)">
                        <Rect width={36} height={36} fill="url(#pattern0_0_1)" />
                    </G>
                </G>
                <Rect
                    x={-35.5}
                    y={-464.5}
                    width={374}
                    height={811}
                    rx={9.5}
                    stroke="black"
                />
                <Defs>
                    <Pattern
                        id="pattern0_0_1"
                        patternContentUnits="objectBoundingBox"
                        width={1}
                        height={1}
                    >
                        <Use xlinkHref="#image0_0_1" transform="scale(0.00347222)" />
                    </Pattern>
                    <RadialGradient
                        id="paint0_radial_0_1"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(152 265) rotate(90) scale(407 584.755)"
                    >
                        <Stop offset={0.0559397} stopColor="#F06A47" />
                        <Stop offset={0.81} stopColor="#F06A47" stopOpacity={0} />
                    </RadialGradient>
                    <RadialGradient
                        id="paint1_radial_0_1"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(682 -606) rotate(137.647) scale(941.81 1189.84)"
                    >
                        <Stop offset={0.0412276} stopColor="#F06A47" />
                        <Stop offset={0.81} stopColor="#F06A47" stopOpacity={0} />
                    </RadialGradient>
                    <RadialGradient
                        id="paint2_radial_0_1"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(-67 -561) rotate(66.808) scale(573.875 289.203)"
                    >
                        <Stop stopColor="white" />
                        <Stop offset={0.843266} stopColor="white" stopOpacity={0} />
                    </RadialGradient>
                    <ClipPath id="clip0_0_1">
                        <Rect x={-36} y={-465} width={375} height={812} rx={10} fill="white" />
                    </ClipPath>
                    <ClipPath id="clip1_0_1">
                        <Rect width={36} height={36} rx={18} fill="white" />
                    </ClipPath>
                    <Image
                        id="image0_0_1"
                        width={288}
                        height={288}
                        preserveAspectRatio="none"
                        xlinkHref="data:image/png;base64,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"
                    />
                </Defs>
            </Svg>
        </>
    );
};



