import useDialog from "@/hooks/useDialog";
import useGeneralUploader from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import useMETHODS from "./useMETHODS";
import useHANDLERS from "./useHANDLERS";
import { IAddAttachmentRes } from "@/services/tasks/types";
import { useDispatch } from "react-redux";
import { tasks } from "@/services/tasks";

const useAttachmentUpload = (cardId: number | undefined) => {
    const dispatch = useDispatch();

    const METHODS = useMETHODS(cardId);
    const HANDLERS = useHANDLERS();

    // ---------------------------------------------------------------

    const upload = useGeneralUploader(METHODS, HANDLERS);

    const [isUploading, startUploading, stopUploading] = useDialog();
    const uploadFiles = useCallback(
        async (f: File[]) => {
            startUploading();
            const res = await upload(f);
            stopUploading();

            if (!res.success) return { ids: [], res: [] };

            // INFO: on create mode do not invalidate tags
            if (cardId !== undefined)
                dispatch(tasks.util.invalidateTags(["Attachments"]));

            return {
                ids: res.report.uploaded.map(({ key }) => key),
                res: res.report.uploaded as unknown as IAddAttachmentRes[],
            };
        },
        [cardId]
    );

    return [uploadFiles, { isUploading }] as const;
};

export default useAttachmentUpload;
