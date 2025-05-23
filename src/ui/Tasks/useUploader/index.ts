import useDialog from "@/hooks/useDialog";
import useGeneralUploader, { TUpload } from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import useMETHODS from "./useMETHODS";
import useHANDLERS from "./useHANDLERS";
import { IAddAttachmentRes } from "@/services/tasks/types";

const useAttachmentUpload = (
    cardId: number | undefined,
    onAddDone?: (res: IAddAttachmentRes[]) => void
) => {
    const METHODS = useMETHODS(cardId);
    const HANDLERS = useHANDLERS(onAddDone);

    // ---------------------------------------------------------------

    const upload = useGeneralUploader(METHODS, HANDLERS);

    const [isUploading, startUploading, stopUploading] = useDialog();
    const uploadFiles: TUpload = useCallback(async (f) => {
        startUploading();
        const res = await upload(f);
        stopUploading();
        return res as number[];
    }, []);

    return [uploadFiles, { isUploading }] as const;
};

export default useAttachmentUpload;
