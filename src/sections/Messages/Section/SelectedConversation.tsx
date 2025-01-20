import {
    createContext,
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useState,
} from "react";
import { NEW_CONVERSATION_ID } from "./constants";

type State = {
    conversationId?: string;
    setConversationId: Dispatch<SetStateAction<string>>;
    clearConversationId: VoidFunction;

    isCreating: boolean;
    startCreating: VoidFunction;
};

const SelectedConversationContext = createContext<State>({
    conversationId: undefined,
    setConversationId() {},
    clearConversationId() {},

    isCreating: false,
    startCreating: () => {},
});

export const useSelectedConversationContext = () => {
    const context = useContext(SelectedConversationContext);
    if (context === undefined) {
        throw new Error("Make sure you wrap with the provider!");
    }
    return context;
};

export const SelectedConversationProvider: React.FC<
    React.PropsWithChildren<unknown>
> = (props) => {
    const [conversationId, setConversationId] = useState("");
    const clearConversationId = useCallback(() => setConversationId(""), []);

    const isCreating = conversationId === NEW_CONVERSATION_ID;
    const startCreating = useCallback(
        () => setConversationId(NEW_CONVERSATION_ID),
        []
    );

    return (
        <SelectedConversationContext.Provider
            value={{
                conversationId,
                setConversationId,
                clearConversationId,
                // ...
                isCreating,
                startCreating,
            }}
            {...props}
        />
    );
};
