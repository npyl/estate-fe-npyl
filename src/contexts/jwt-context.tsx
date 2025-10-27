import type { FC, ReactNode } from "react";
import { createContext, useCallback, useEffect, useReducer } from "react";
import { useLoginMutation } from "@/services/auth";
import { IUser } from "@/types/user";
import {
    useGenerateChatTokenMutation,
    useLazyGetProfileQuery,
} from "@/services/user";
import { useLogoutMutation } from "@/services/logout";
import debugLog from "@/_private/debugLog";
import { clearAllApiCaches } from "@/store";
import { getTokens, removeTokens, setChatToken, setTokens } from "./tokens";

interface State {
    platform: "JWT";
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: IUser | null;
}

interface AuthContextValue extends State {
    signin: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

enum ActionType {
    INITIALIZE = "INITIALIZE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
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

type Action = InitializeAction | LoginAction | LogoutAction;

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
};

const reducer = (state: State, action: Action): State =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext<AuthContextValue>({
    ...initialState,
    signin: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [loginCb] = useLoginMutation();
    const [logoutCb] = useLogoutMutation();
    const [getProfile] = useLazyGetProfileQuery();

    const [generateChatToken] = useGenerateChatTokenMutation();

    useEffect(() => {
        initialize();
    }, []);

    const initialize = useCallback(async () => {
        try {
            const t = getTokens();
            if (!t.accessToken || !t.refreshToken)
                throw new Error("Tokens non-existent!");

            const user = await getProfile().unwrap();
            if (!user) throw new Error("Failed to get profile!");

            dispatch({
                type: ActionType.INITIALIZE,
                payload: {
                    isAuthenticated: true,
                    user,
                },
            });
        } catch {
            // INFO: prevent infinite loop where user refreshes upon getProfile with unsuccessfully existing token
            removeTokens();

            dispatch({
                type: ActionType.INITIALIZE,
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            });
        }
    }, []);

    const signin = useCallback(async (username: string, password: string) => {
        const loginRes = await loginCb({
            username,
            password,
        }).unwrap();

        setTokens(loginRes);

        clearAllApiCaches();

        const user = await getProfile().unwrap();
        if (!user) throw new Error("Failed getting profile!");

        // INFO: chat token
        try {
            const { messagingEnabled } = user;
            if (!messagingEnabled)
                throw new Error(
                    "Abort generating chat token; messaging is disabled for this user"
                );

            const { token } = await generateChatToken(loginRes.token).unwrap();
            if (!token) throw new Error("Did not receive chatToken");

            setChatToken(token);
        } catch (ex) {
            debugLog(ex);
        }

        dispatch({
            type: ActionType.LOGIN,
            payload: {
                user,
            },
        });
    }, []);

    const logout = useCallback(async () => {
        await logoutCb();
        removeTokens();
        dispatch({ type: ActionType.LOGOUT });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                platform: "JWT",
                signin,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer;
