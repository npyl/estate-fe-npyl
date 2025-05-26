import useDialog from "@/hooks/useDialog";
import { TFileVariant } from "@/types/file";
import useGeneralUploader, {
    TUpload,
    UseGeneralUploaderHandlers,
} from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import useMETHODS from "./useMETHODS";

const useHANDLERS = (): UseGeneralUploaderHandlers => {
    return {
        onAddFail: (f: File) => {},
        onUploadFail: (key: string) => {},
        onProgressUpdate: () => {},
    };
};

const usePropertyUpload = (variant: TFileVariant, propertyId: number) => {
    const METHODS = useMETHODS(variant, propertyId);
    const HANDLERS = useHANDLERS();

    // ---------------------------------------------------------------

    const upload = useGeneralUploader(METHODS, HANDLERS);

    const [isUploading, startUploading, stopUploading] = useDialog();
    const uploadFiles: TUpload = useCallback(async (f) => {
        startUploading();
        const res = await upload(f);
        stopUploading();
        return res;
    }, []);

    return [uploadFiles, { isUploading }] as const;
};

export default usePropertyUpload;
