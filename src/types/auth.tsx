interface TokenResponse {
    token: string;
    refreshToken: string;
}

interface IAuthReq {
    username: string;
    password: string;
}

export type { TokenResponse, IAuthReq };
