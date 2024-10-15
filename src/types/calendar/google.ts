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
}

// "https://lh3.googleusercontent.com/a/ACg8ocKLxIejKpkKh7-FWVLy44JDD2D2FcftnX9h3PGvyQgocr8xTw=s96-c"

export type { IsAuthenticatedRes, GoogleCalendarUserInfo };
