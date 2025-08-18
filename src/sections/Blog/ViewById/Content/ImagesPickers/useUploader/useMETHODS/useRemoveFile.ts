import { useCallback } from "react";

/**
 * Remove a file from BE that failed to upload to S3
 */
const useRemoveFile = () => {
    const removeFileCb = useCallback(async (key: string) => {}, []);
    return removeFileCb;
};

export default useRemoveFile;
