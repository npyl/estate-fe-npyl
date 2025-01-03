import { UploadProgress } from "@/types/file";
import { createContext, useContext, useState } from "react";

export type IUploadFileContextState = {
    uploadProgress: UploadProgress;
    setUploadProgress: (p: UploadProgress) => void;
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
    const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
        key: "",
        p: 0,
    });

    return (
        <UploadFileContext.Provider
            value={{
                uploadProgress,
                setUploadProgress,
            }}
            {...props}
        />
    );
};
