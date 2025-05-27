import useDialog from "@/hooks/useDialog";
import useGeneralUploader from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import useMETHODS from "./useMETHODS";
import { CompanyImageType } from "@/types/company";

const useCompanyUpload = (variant: CompanyImageType) => {
    const METHODS = useMETHODS(variant);

    // ---------------------------------------------------------------

    const upload = useGeneralUploader(METHODS, {});

    const [isUploading, startUploading, stopUploading] = useDialog();
    const uploadFiles = useCallback(async (f: File[]) => {
        startUploading();
        await upload(f);
        stopUploading();
    }, []);

    return [uploadFiles, { isUploading }] as const;
};

export default useCompanyUpload;
