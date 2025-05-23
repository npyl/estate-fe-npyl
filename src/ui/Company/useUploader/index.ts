import useDialog from "@/hooks/useDialog";
import useGeneralUploader, { TUpload } from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import useMETHODS from "./useMETHODS";
import useHANDLERS from "./useHANDLERS";
import { CompanyImageType } from "@/types/company";

const useCompanyUpload = (variant: CompanyImageType) => {
    const METHODS = useMETHODS(variant);
    const HANDLERS = useHANDLERS();

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

export default useCompanyUpload;
