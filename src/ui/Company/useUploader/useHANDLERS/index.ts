import { useCallback } from "react";
import { UseGeneralUploaderHandlers } from "@/ui/useGeneralUploader";
import { errorToast } from "@/components/Toaster";

const useHANDLERS = (): UseGeneralUploaderHandlers => {
    const onAddFail = useCallback(() => {
        errorToast("Fail to add file: ...");
    }, []);
    const onUploadFail = useCallback(() => {
        errorToast("Fail to upload file: ...");
    }, []);
    const onFinish = useCallback(() => {}, []);

    return {
        onFinish,
        onAddFail,
        onUploadFail,
    };
};

export default useHANDLERS;
