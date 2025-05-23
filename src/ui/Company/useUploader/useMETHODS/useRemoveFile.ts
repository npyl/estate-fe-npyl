import { useRemoveCompanyImageMutation } from "@/services/company";
import { CompanyImageType } from "@/types/company";
import { useCallback } from "react";

/**
 * Remove a file from BE that failed to upload to S3
 */
const useRemoveFile = (variant: CompanyImageType) => {
    const [removeFile] = useRemoveCompanyImageMutation();
    const removeFileCb = useCallback(async () => {
        await removeFile(variant);
        // TODO: return & handler error
    }, [variant]);
    return removeFileCb;
};

export default useRemoveFile;
