import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

type State = {
    conversationId?: string;
    setConversationId: Dispatch<SetStateAction<string>>;
};

const SelectedConversationContext = createContext<State>({
    conversationId: undefined,
    setConversationId() {},
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

    return (
        <SelectedConversationContext.Provider
            value={{
                conversationId,
                setConversationId,
            }}
            {...props}
        />
    );
};
