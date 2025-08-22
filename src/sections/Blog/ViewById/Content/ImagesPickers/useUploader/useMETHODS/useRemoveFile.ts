import { useRemoveImageMutation } from "@/services/blog";
import { useCallback } from "react";

/**
 * Remove a file from BE that failed to upload to S3
 */
const useRemoveFile = (postId: number) => {
    const [removeImage] = useRemoveImageMutation();
    const removeFileCb = useCallback(
        async (imageKey: string) => removeImage({ postId, imageKey }),
        [postId]
    );
    return removeFileCb;
};

export default useRemoveFile;
