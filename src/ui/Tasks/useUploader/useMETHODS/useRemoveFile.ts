import { useDeleteAttachmentMutation } from "@/services/tasks";
import { useCallback } from "react";

/**
 * Remove a file from BE that failed to upload to S3
 */
const useRemoveFile = () => {
    const [deleteAttachment] = useDeleteAttachmentMutation();

    const removeFileCb = useCallback(async (key: string) => {
        // INFO: see useAddFile for this type cast
        return await deleteAttachment(key as unknown as number);
    }, []);
    return removeFileCb;
};

export default useRemoveFile;
