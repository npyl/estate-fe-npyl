import { createContext, useContext, useState } from "react";

export type IUploadFileContextState = {
    uploadProgress: Record<string, number>;
    setUploadProgress: (key: string, p: number) => void;
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
    const [uploadProgress, setUploadProgress] = useState<
        Record<string, number>
    >({});

    const updateProgress = (key: string, p: number) =>
        setUploadProgress((old) => {
            console.log("key: ", key, "p: ", p);
            old[key] = p;
            return old;
        });

    return {
        uploadProgress,
        setUploadProgress: updateProgress,
    };
};

export const UploadFileProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const value = useUploadFileState();

    return <UploadFileContext.Provider value={value} {...props} />;
};
