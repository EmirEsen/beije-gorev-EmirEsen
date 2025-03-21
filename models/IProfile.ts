interface IProfileInfo {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    passwordHash: string;
}

interface ICycleStatus {
    isRegistrationComplete: boolean;
    inOnboardingCompleted: boolean;
}

interface IProfile {
    _id: string;
    profileInfo: IProfileInfo;
    cycleStatus: ICycleStatus;
}

interface IProfileResponse {
    success: boolean;
    data: IProfile;
}

export { IProfileInfo, ICycleStatus, IProfile, IProfileResponse };
