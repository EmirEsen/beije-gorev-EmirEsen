// Define the possible types for menstruation days
export enum MenstrationDayType {
    BLEEDING = "BLEEDING",
    FERTILITY = "FERTILITY",
    OVULATION = "OVULATION"
}

// Interface for a single menstruation day
export interface IMenstrationDay {
    date: string;       // Format: "YYYY-MM-DD"
    type?: MenstrationDayType;  // Optional type of the day
    note?: string;      // Optional note/tip for the day
}

// Interface for cycle information
export interface ICycleInfo {
    cycleStartDate: string;  // Format: "YYYY-MM-DD"
    cycleEndDate: string;    // Format: "YYYY-MM-DD"
}

// Main interface for menstruation data
export interface IMenstrationData {
    menstrationDays: IMenstrationDay[];
    cycleInfo: ICycleInfo;
}

// Full response structure
export interface IMenstrationResponse {
    success: boolean
    data: IMenstrationData;
}
