import useDialog from "@/hooks/useDialog";
import { TFileVariant } from "@/types/file";
import useGeneralUploader, {
    TUpload,
    UseGeneralUploaderHandlers,
} from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import useMETHODS from "./useMETHODS";

const REGISTRY = new Map<string, string>();

const useHANDLERS = (
    _onFinish: (res: boolean) => void
): UseGeneralUploaderHandlers => {
    return {
        onFinish: () => {
            _onFinish(REGISTRY.size === 0);
        },

        onAddFail: (f: File) => {
            REGISTRY.set(f.name, "wtvr0");
        },
        onUploadFail: (key: string) => {
            REGISTRY.set(key, "wtvr1");
        },

        onProgressUpdate: () => {},
    };
};

const usePropertyUpload = (
    variant: TFileVariant,
    propertyId: number,
    onFinish: (b: boolean) => void
) => {
    const METHODS = useMETHODS(variant, propertyId);
    const HANDLERS = useHANDLERS(onFinish);

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
