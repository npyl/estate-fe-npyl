import useDialog from "@/hooks/useDialog";
import { TFileVariant, UploadProgress } from "@/types/file";
import useGeneralUploader, { TUpload } from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import useMETHODS from "./useMETHODS";
import useHANDLERS from "./useHANDLERS";

const usePropertyUpload = (
    variant: TFileVariant,
    onProgressUpdate?: (p: UploadProgress) => void
) => {
    const METHODS = useMETHODS(variant);
    const HANDLERS = useHANDLERS(variant, onProgressUpdate);

    // ---------------------------------------------------------------

    const upload = useGeneralUploader(METHODS, HANDLERS);

    const [isUploading, startUploading, stopUploading] = useDialog();
    const uploadFiles: TUpload = useCallback(async (f) => {
        startUploading();
        await upload(f);
        stopUploading();
    }, []);

    return [uploadFiles, { isUploading }] as const;
};

export default usePropertyUpload;
