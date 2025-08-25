import useDialog from "@/hooks/useDialog";
import { UploadProgress } from "@/types/file";
import useGeneralUploader from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import useMETHODS from "./useMETHODS";
import reportToast from "@/ui/useGeneralUploader/reportToast";
import useInvalidateTags from "./useInvalidateTags";

const STRIP_METADATA = true;

const useBlogUpload = (
    postId: number,
    onProgressUpdate?: (p: UploadProgress) => void
) => {
    const METHODS = useMETHODS(postId);

    // ---------------------------------------------------------------

    const invalidateTags = useInvalidateTags();

    const upload = useGeneralUploader(
        METHODS,
        { onProgressUpdate },
        STRIP_METADATA
    );

    const [isUploading, startUploading, stopUploading] = useDialog();
    const uploadFiles = useCallback(async (f: File[]) => {
        startUploading();
        const res = await upload(f);
        stopUploading();

        if (!res.success) {
            reportToast(res.report);
            return;
        }

        invalidateTags();
    }, []);

    return [uploadFiles, { isUploading }] as const;
};

export default useBlogUpload;
