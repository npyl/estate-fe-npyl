import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { IKanbanAttachment } from "@/types/tasks";

type FiltersState = {
    attachments: IKanbanAttachment[];
    setAttachments: Dispatch<SetStateAction<IKanbanAttachment[]>>;
};

const AttachmentsContext = createContext<FiltersState>({
    attachments: [],
    setAttachments: () => {},
});

export const useAttachmentsContext = () => {
    const context = useContext(AttachmentsContext);
    if (context === undefined) {
        throw new Error(
            "AttachmentsProvider value is undefined. Make sure you use the AttachmentsProvider before using the context."
        );
    }
    return context;
};

export const AttachmentsProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const [attachments, setAttachments] = useState<IKanbanAttachment[]>([]);

    return (
        <AttachmentsContext.Provider
            value={{
                attachments,
                setAttachments,
            }}
            {...props}
        />
    );
};
