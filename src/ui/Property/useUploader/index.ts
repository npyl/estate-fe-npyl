import useDialog from "@/hooks/useDialog";
import { TFileVariant, UploadProgress } from "@/types/file";
import useGeneralUploader from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import useMETHODS from "./useMETHODS";
import useInvalidateTags from "./useInvalidateTags";

const STRIP_METADATA = true;

const usePropertyUpload = (
    variant: TFileVariant,
    onProgressUpdate?: (p: UploadProgress) => void
) => {
    const METHODS = useMETHODS(variant);

    // ---------------------------------------------------------------

    const invalidateTags = useInvalidateTags(variant);

    const upload = useGeneralUploader(
        METHODS,
        { onProgressUpdate },
        STRIP_METADATA
    );

    const [isUploading, startUploading, stopUploading] = useDialog();
    const uploadFiles = useCallback(
        async (f: File[]) => {
            startUploading();
            const res = await upload(f);
            stopUploading();

            if (!res.success) return;

            invalidateTags();
        },
        [variant]
    );

    return [uploadFiles, { isUploading }] as const;
};

export default usePropertyUpload;
