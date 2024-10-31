import type { FC, ReactNode } from "react";
import { createContext, useEffect, useReducer } from "react";
import { useLoginMutation, useRegisterMutation } from "../services/auth";
import { IUser } from "src/types/user";
import { useLazyProfileQuery } from "src/services/user";

interface State {
    platform: "JWT";
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: IUser | null;
}

export interface AuthContextValue extends State {
    signin: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

enum ActionType {
    INITIALIZE = "INITIALIZE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    REGISTER = "REGISTER",
}

type InitializeAction = {
    type: ActionType.INITIALIZE;
    payload: {
        isAuthenticated: boolean;
        user: IUser | null;
    };
};

type LoginAction = {
    type: ActionType.LOGIN;
    payload: {
        user: IUser;
    };
};

type LogoutAction = {
    type: ActionType.LOGOUT;
};

type RegisterAction = {
    type: ActionType.REGISTER;
    payload: {
        user: IUser;
    };
};

type Action = InitializeAction | LoginAction | LogoutAction | RegisterAction;

type Handler = (state: State, action: any) => State;

const initialState: State = {
    platform: "JWT",
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const handlers: Record<ActionType, Handler> = {
    INITIALIZE: (state: State, action: InitializeAction): State => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state: State, action: LoginAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isInitialized: true,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state: State): State => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
    REGISTER: (state: State, action: RegisterAction): State => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
};

const reducer = (state: State, action: Action): State =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<AuthContextValue>({
    ...initialState,
    signin: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    signup: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [login, { isSuccess }] = useLoginMutation();
    const [register] = useRegisterMutation();
    const [getProfile] = useLazyProfileQuery();

    useEffect(() => {
        initialize();
    }, [isSuccess]);

    const initialize = async (): Promise<void> => {
        try {
            if (globalThis?.localStorage?.getItem("accessToken")) {
                const user = await getProfile().unwrap();
                if (!user) {
                    throw "Failed to get profile!";
                }

                dispatch({
                    type: ActionType.INITIALIZE,
                    payload: {
                        isAuthenticated: true,
                        user,
                    },
                });
            } else {
                throw "Token doesn't exist!";
            }
        } catch (error) {
            // INFO: prevent infinite loop where user refreshes upon getProfile with unsuccessfully existing token
            globalThis?.localStorage?.removeItem("accessToken");

            dispatch({
                type: ActionType.INITIALIZE,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    };

    const signin = async (
        username: string,
        password: string
    ): Promise<void> => {
        const loginRes = await login({
            username,
            password,
        }).unwrap();

        localStorage.setItem("accessToken", loginRes.token);

        const user = await getProfile().unwrap();
        if (!user) {
            throw "Failed getting profile!";
        }

        await dispatch({
            type: ActionType.LOGIN,
            payload: {
                user,
            },
        });
    };

    const logout = async (): Promise<void> => {
        localStorage.removeItem("accessToken");
        dispatch({ type: ActionType.LOGOUT });
    };

    const signup = async (username: string, password: string): Promise<void> =>
        await register({
            username,
            password,
        }).unwrap();

    return (
        <AuthContext.Provider
            value={{
                ...state,
                platform: "JWT",
                signin,
                logout,
                signup,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer;
