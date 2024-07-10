import { createContext, useContext, useState } from "react";

type UploadProgress = {
    [key: string]: number;
};

export type IUploadFileContextState = {
    uploadProgress: UploadProgress;
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

export const UploadFileProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});

    const updateProgress = (key: string, p: number) =>
        setUploadProgress((old) => ({ ...old, [key]: p }));

    return (
        <UploadFileContext.Provider
            value={{
                uploadProgress,
                setUploadProgress: updateProgress,
            }}
            {...props}
        />
    );
};
