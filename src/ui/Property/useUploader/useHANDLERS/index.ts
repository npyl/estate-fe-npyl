import { UploadProgress } from "@/types/file";
import { useCallback } from "react";
import { UseGeneralUploaderHandlers } from "@/ui/useGeneralUploader";
import { errorToast } from "@/components/Toaster";

const useHANDLERS = (
    onProgressUpdate?: (p: UploadProgress) => void
): UseGeneralUploaderHandlers => {
    const onAddFail = useCallback(() => {
        errorToast("Fail to add file: ...");
    }, []);
    const onUploadFail = useCallback(() => {
        errorToast("Fail to upload file: ...");
    }, []);

    return {
        onAddFail,
        onUploadFail,
        onProgressUpdate,
    };
};

export default useHANDLERS;
