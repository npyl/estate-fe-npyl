export interface User {
    first_name: string;
    last_name: string;
}

export interface UserResponse {
    token: string;
}

export interface IAuthReq {
    username: string;
    password: string;
}
