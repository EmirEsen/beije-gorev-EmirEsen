import React, { ReactElement, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Defs, Ellipse, G, Path, RadialGradient, Stop, SvgProps } from 'react-native-svg';

// Interface for cycle day colors
export interface CycleColorsInterface {
    normalDayColor: string;
    bleedingDayColor: string;
    fertilityDayColor: string;
    ovulationDayColor: string;
}

// Interface for menstruation day data
export interface MenstrationDayData {
    date: string;
    type?: 'BLEEDING' | 'FERTILITY' | 'OVULATION';
    note?: string;
}

// Interface for cycle information
export interface CycleInfo {
    cycleStartDate: string;
    cycleEndDate: string;
}

// Interface for menstruation data from API
export interface MenstrationData {
    menstrationDays: MenstrationDayData[];
    cycleInfo: CycleInfo;
}

// Default colors
const defaultColors: CycleColorsInterface = {
    normalDayColor: '#F3F3F3',      // Grey
    bleedingDayColor: '#F67554',     // Orange
    fertilityDayColor: '#E4F2F2',    // Light green
    ovulationDayColor: '#097B77'     // Dark green
};

interface MenstrationCycleProps extends SvgProps {
    cycleColors?: CycleColorsInterface;
    menstrationData?: MenstrationData;
}

// Define a type for the return value of calculateDotPositions
interface DotPositionResult {
    dots: ReactElement[];
    positions: { x: number; y: number }[];
}

export default function MenstrationCycle(
    { cycleColors = defaultColors, menstrationData, style, ...props }: MenstrationCycleProps) {
    const { normalDayColor, bleedingDayColor, fertilityDayColor, ovulationDayColor } = cycleColors;

    // Extract cycle information and days
    const { startDate, endDate, daysInMonth, dayTypes } = useMemo(() => {
        // Default to current month if no data provided
        if (!menstrationData || !menstrationData.cycleInfo) {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const daysInMonth = new Date(year, month, 0).getDate();
            return {
                startDate: new Date(),
                endDate: new Date(),
                daysInMonth,
                dayTypes: {}
            };
        }

        const startDate = new Date(menstrationData.cycleInfo.cycleStartDate);
        const endDate = new Date(menstrationData.cycleInfo.cycleEndDate);

        // Calculate days in month
        const year = startDate.getFullYear();
        const month = startDate.getMonth() + 1;
        const daysInMonth = new Date(year, month, 0).getDate();

        // Create a map of day numbers to their types
        const dayTypes: Record<number, string | undefined> = {};

        if (menstrationData.menstrationDays && menstrationData.menstrationDays.length > 0) {
            menstrationData.menstrationDays.forEach(day => {
                const date = new Date(day.date);
                const dayNumber = date.getDate();
                dayTypes[dayNumber] = day.type;
            });
        }

        return { startDate, endDate, daysInMonth, dayTypes };
    }, [menstrationData]);

    // Function to get color based on day type
    const getDayColor = (dayNumber: number): string => {
        const dayType = dayTypes[dayNumber];

        switch (dayType) {
            case 'BLEEDING':
                return bleedingDayColor;
            case 'FERTILITY':
                return fertilityDayColor;
            case 'OVULATION':
                return ovulationDayColor;
            default:
                return normalDayColor;
        }
    };

    // Calculate dot size based on day type
    const getDayDotSize = (dayNumber: number): number => {
        const dayType = dayTypes[dayNumber];
        return dayType ? 6.17 : 2.28; // Large dots for special days, small dots for normal days
    };

    // Calculate dot opacity
    const getDayOpacity = (dayNumber: number): number => {
        return dayTypes[dayNumber] === 'OVULATION' ? 0.76 : 1;
    };

    // Function to calculate positions for all days in a circle
    const calculateDotPositions = (): DotPositionResult => {
        const dots: ReactElement[] = [];
        const positions: { x: number; y: number }[] = [];
        const centerX = 187.5;
        const centerY = 210.5;
        const radius = 140;  // Main radius of the cycle
        const angleStep = (2 * Math.PI) / daysInMonth;

        for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
            // Calculate angle (start from top, going clockwise)
            const angle = (dayNumber - 1) * angleStep - Math.PI / 2;

            // Calculate position on the circle
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            // Calculate dot radius based on day type
            const dotRadius = getDayDotSize(dayNumber);

            // Collect positions for green dots
            if (dayTypes[dayNumber] === "FERTILITY" || dayTypes[dayNumber] === "OVULATION") {
                positions.push({ x, y });
            }

            // Generate the ellipse for this day
            dots.push(
                <Ellipse
                    key={`day-${dayNumber}`}
                    cx={x}
                    cy={y}
                    rx={dotRadius}
                    ry={dotRadius}
                    fill={getDayColor(dayNumber)}
                    opacity={getDayOpacity(dayNumber)}
                />
            );
        }

        return { dots, positions };
    };

    const { dots, positions } = useMemo(() => calculateDotPositions(), [menstrationData, dayTypes, daysInMonth]);

    const generateDynamicPath = (positions: { x: number; y: number }[]): string => {
        if (positions.length < 2) return "";

        // Start path at the first dot
        let path = `M ${positions[0].x},${positions[0].y}`;

        for (let i = 1; i < positions.length; i++) {
            const { x, y } = positions[i];
            path += ` L ${x},${y}`;
        }

        // Optional: Close the path if needed
        // path += " Z";

        return path;
    };

    const dynamicPath = useMemo(() => generateDynamicPath(positions), [positions]);

    return (
        <View style={[styles.container, style]}>
            <Svg
                width="100%"
                height="100%"
                viewBox="0 0 375 421"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                {...props}
            >
                <G filter="url(#filter0_d_14_2744)">
                    <Path
                        d="M351 210.5C351 300.799 277.799 374 187.5 374C97.2014 374 24 300.799 24 210.5C24 120.201 97.2014 47 187.5 47C277.799 47 351 120.201 351 210.5ZM73.05 210.5C73.05 273.709 124.291 324.95 187.5 324.95C250.709 324.95 301.95 273.709 301.95 210.5C301.95 147.291 250.709 96.05 187.5 96.05C124.291 96.05 73.05 147.291 73.05 210.5Z"
                        fill="#F3F3F3"
                    />
                </G>
                <Path
                    d="M181.12 71.2452C180.885 64.5335 186.144 58.8517 192.853 59.1542C227.578 60.7203 260.86 74.1594 287.016 97.4228C316.212 123.39 334.287 159.603 337.489 198.545C340.69 237.487 328.773 276.167 304.21 306.554C279.646 336.941 244.325 356.702 205.577 361.734C166.829 366.766 127.631 356.684 96.1209 333.58C64.6104 310.475 43.2076 276.123 36.3555 237.656C29.5034 199.188 37.7282 159.559 59.3227 126.995C78.6686 97.8218 107.413 76.3268 140.586 65.9425C146.995 63.9362 153.531 68.0862 155.019 74.6351C156.507 81.184 152.378 87.6432 146.001 89.7469C118.918 98.6801 95.4805 116.475 79.5911 140.436C61.4517 167.789 54.5428 201.078 60.2986 233.391C66.0544 265.704 84.0328 294.559 110.502 313.967C136.97 333.375 169.896 341.844 202.445 337.617C234.993 333.389 264.663 316.79 285.296 291.265C305.929 265.74 315.94 233.249 313.251 200.538C310.561 167.827 295.378 137.408 270.853 115.595C249.37 96.4881 222.165 85.2708 193.699 83.552C186.995 83.1472 181.354 77.9569 181.12 71.2452Z"
                    fill="#FCFCFC"
                />
                <Path
                    d="M181.12 71.2452C180.885 64.5335 186.143 58.8518 192.852 59.1545C211.397 59.9913 229.668 64.2203 246.748 71.6669C263.827 79.1135 279.36 89.6225 292.594 102.641C297.382 107.351 296.797 115.07 291.72 119.466C286.643 123.862 279.001 123.261 274.142 118.625C263.335 108.313 250.778 99.9551 237.028 93.9602C223.278 87.9653 208.609 84.453 193.699 83.5523C186.995 83.1474 181.354 77.9569 181.12 71.2452Z"
                    fill="#FBD7CE"
                />

                {dynamicPath && (
                    <Path d={dynamicPath} stroke="#BDE1E0" strokeWidth="20" fill="none" strokeLinecap="round" />
                )}

                {/* Render the dynamic day dots */}
                {dots}

                <Defs>
                    <RadialGradient
                        id="paint0_radial_14_2744"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(39.5 110) rotate(41.0613) scale(108.089)"
                    >
                        <Stop stopColor="white" />
                        <Stop offset={0.979167} stopColor="white" stopOpacity={0} />
                    </RadialGradient>
                    <RadialGradient
                        id="paint1_radial_14_2744"
                        cx={0}
                        cy={0}
                        r={1}
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(298 374) rotate(-132.837) scale(177.964)"
                    >
                        <Stop offset={0.00111343} stopColor="white" />
                        <Stop offset={0.979167} stopColor="white" stopOpacity={0} />
                    </RadialGradient>
                </Defs>
            </Svg>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 375 / 421, // Maintain the aspect ratio of the SVG
        alignItems: 'center',
        justifyContent: 'center',
    }
});
