//   @DeleteMapping("/{propertyId}/image/upload-fail")
//     @DeleteMapping("/{propertyId}/blueprint/upload-fail")
//     @DeleteMapping("/{propertyId}/document/upload-fail")

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
                return; // TODO: maybe also show error for this?

            await removeFile({ id: +propertyId!, body: key, variant });

            // TODO: return & handler error
        },
        [propertyId, variant]
    );
    return removeFileCb;
};

export default useRemoveFile;
