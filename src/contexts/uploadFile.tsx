import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";
import { NoUploadProgress, UploadProgress } from "src/components/image";

export type IUploadFileContextState = {
    uploadProgress: UploadProgress;
    setUploadProgress: Dispatch<SetStateAction<UploadProgress>>;
};

export const UploadFileContext = createContext<
    IUploadFileContextState | undefined
>(undefined);

export const useUploadFileContext = () => {
    const context = useContext(UploadFileContext);
    if (context === undefined) {
        throw new Error(
            "UploadFileContext value is undefined. Make sure you use the UploadFileContext before using the context."
        );
    }
    return context;
};

const useUploadFileState = () => {
    const [uploadProgress, setUploadProgress] =
        useState<UploadProgress>(NoUploadProgress);

    return {
        uploadProgress,
        setUploadProgress,
    };
};

export const UploadFileProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const value = useUploadFileState();

    return <UploadFileContext.Provider value={value} {...props} />;
};
