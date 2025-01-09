import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

type State = {
    recipients: number[];
    setRecipients: Dispatch<SetStateAction<number[]>>;
};

const CreateConversationContext = createContext<State>({
    recipients: [],
    setRecipients() {},
});

export const useCreateConversationContext = () => {
    const context = useContext(CreateConversationContext);
    if (context === undefined) {
        throw new Error("Make sure you wrap with the provider!");
    }
    return context;
};

export const CreateConversationProvider: React.FC<
    React.PropsWithChildren<unknown>
> = (props) => {
    const [recipients, setRecipients] = useState<number[]>([]);

    return (
        <CreateConversationContext.Provider
            value={{
                recipients,
                setRecipients,
            }}
            {...props}
        />
    );
};
