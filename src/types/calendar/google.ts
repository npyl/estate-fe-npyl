interface IsAuthenticatedRes {
    isAuthenticated: boolean;
    userInfo?: GoogleCalendarUserInfo;
}

interface GoogleCalendarUserInfo {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
}

export type { IsAuthenticatedRes, GoogleCalendarUserInfo };
