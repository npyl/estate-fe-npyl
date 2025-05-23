import { useCallback } from "react";
import { UseGeneralUploaderHandlers } from "@/ui/useGeneralUploader";
import { errorToast } from "@/components/Toaster";
import { useDispatch } from "react-redux";
import { tasks } from "@/services/tasks";
import { IAddAttachmentRes } from "@/services/tasks/types";

const useHANDLERS = (
    onAddDone?: (res: IAddAttachmentRes[]) => void
): UseGeneralUploaderHandlers => {
    const dispatch = useDispatch();

    const onAddFail = useCallback(() => {
        errorToast("Fail to add file: ...");
    }, []);
    const onUploadFail = useCallback(() => {
        errorToast("Fail to upload file: ...");
    }, []);
    const onFinish = useCallback(
        (responses: any) => {
            // INFO: make sure we call this here (a.k.a. after upload) because directly after fileResponses means the cdnUrl is not valid yet.
            onAddDone?.(responses);

            dispatch(tasks.util.invalidateTags(["Attachments"]));
        },
        [onAddDone]
    );

    return {
        onFinish,
        onAddFail,
        onUploadFail,
        onProgressUpdate: () => {},
    };
};

export default useHANDLERS;
