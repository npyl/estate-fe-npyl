import { useRemovePropertyFileMutation } from "@/services/properties";
import { TFileVariant } from "@/types/file";
import { useCallback } from "react";

/**
 * Remove a file from BE that failed to upload to S3
 */
const useRemoveFile = (variant: TFileVariant, id: number) => {
    const [removeFile] = useRemovePropertyFileMutation();
    const removeFileCb = useCallback(
        async (key: string) => {
            if (
                variant !== "image" &&
                variant !== "blueprint" &&
                variant !== "document"
            )
                return; // TODO: maybe also show error for this?

            await removeFile({ id, body: key, variant });

            // TODO: return & handler error
        },
        [id, variant]
    );
    return removeFileCb;
};

export default useRemoveFile;
