import { useRemovePropertyFileMutation } from "@/services/properties";
import { TFileVariant } from "@/types/file";
import { useRouter } from "next/router";
import { useCallback } from "react";

/**
 * Remove a file from BE that failed to upload to S3
 */
const useRemoveFile = (variant: TFileVariant) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const [removeFile] = useRemovePropertyFileMutation();
    const removeFileCb = useCallback(
        async (key: string) => {
            if (
                variant !== "image" &&
                variant !== "blueprint" &&
                variant !== "document"
            )
                return { error: "VARIANT_NOT_VALID" };

            return await removeFile({ id: +propertyId!, body: key, variant });
        },
        [propertyId, variant]
    );
    return removeFileCb;
};

export default useRemoveFile;
