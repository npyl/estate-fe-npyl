import { TFileVariant, UploadProgress } from "@/types/file";
import { useCallback } from "react";
import useInvalidateTags from "./useInvalidateTags";
import { UseGeneralUploaderHandlers } from "@/ui/useGeneralUploader";
import { errorToast } from "@/components/Toaster";

const useHANDLERS = (
    variant: TFileVariant,
    onProgressUpdate?: (p: UploadProgress) => void
): UseGeneralUploaderHandlers => {
    const onAddFail = useCallback(() => {
        errorToast("Fail to add file: ...");
    }, []);
    const onUploadFail = useCallback(() => {
        errorToast("Fail to upload file: ...");
    }, []);
    const onFinish = useInvalidateTags(variant);

    return {
        onFinish,
        onAddFail,
        onUploadFail,
        onProgressUpdate,
    };
};

export default useHANDLERS;
