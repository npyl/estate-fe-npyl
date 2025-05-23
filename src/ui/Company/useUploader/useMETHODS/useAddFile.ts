import { useUploadCompanyImageMutation } from "@/services/company";
import { useRouter } from "next/router";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import { CompanyImageType } from "@/types/company";

const useAddFile = (variant: CompanyImageType) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const [uploadImage] = useUploadCompanyImageMutation(); // requests Backend for amazon url

    const addFileCb: UseGeneralUploaderMethods["addFile"] = useCallback(
        async (f) => {
            const { name, size, type } = f;

            return await uploadImage({
                contentType: type,
                filename: name,
                size,
                type: variant, // LOGO or WATERMARK
            });
        },
        [variant, propertyId]
    );

    return addFileCb;
};

export default useAddFile;
