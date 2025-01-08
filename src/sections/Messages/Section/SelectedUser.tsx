import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

type FiltersState = {
    userId?: number;
    setUserId: Dispatch<SetStateAction<number | undefined>>;
};

const SelectedUserContext = createContext<FiltersState>({
    userId: undefined,
    setUserId() {},
});

export const useSelectedUserContext = () => {
    const context = useContext(SelectedUserContext);
    if (context === undefined) {
        throw new Error("Make sure you wrap with the provider!");
    }
    return context;
};

export const SelectedUserProvider: React.FC<
    React.PropsWithChildren<unknown>
> = (props) => {
    const [userId, setUserId] = useState<number>();

    return (
        <SelectedUserContext.Provider
            value={{
                userId,
                setUserId,
            }}
            {...props}
        />
    );
};
