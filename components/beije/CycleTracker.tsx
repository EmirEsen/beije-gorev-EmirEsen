import { IMenstrationResponse } from "@/models/IMenstrationResponse";
import React from "react";
import { View, Text } from "react-native";
import MainCycleCircle from "./cycle/MainCycleCircle";
import ChevronDown from "./cycle/ChecronDown";

interface CycleTrackerProps {
    cycleData: IMenstrationResponse;
    isExpanded?: boolean;
}

const CycleTracker = (data: CycleTrackerProps) => {
    const { isExpanded = false } = data;

    const circleThickness = isExpanded ? 68 : 49.05;
    const marginBottom = isExpanded ? 0 : 15;

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: marginBottom }}>
                {new Date().getDate()} {new Date().toLocaleString('tr-TR', { month: 'long' })}
            </Text>
            {isExpanded ? <ChevronDown /> : <></>}
            <MainCycleCircle thickness={circleThickness} />

        </View>
    );
};

export default CycleTracker;



