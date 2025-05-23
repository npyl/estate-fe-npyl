import { useAddPropertyFileMutation } from "@/services/properties";
import { TFileVariant } from "@/types/file";
import { useRouter } from "next/router";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import { useCallback } from "react";

const useAddFile = (variant: TFileVariant) => {
    const router = useRouter();
    const { propertyId } = router.query;

    const [addFile] = useAddPropertyFileMutation(); // requests Backend for amazon url

    const addFileCb: UseGeneralUploaderMethods["addFile"] = useCallback(
        async (f) => {
            const { name, size, type } = f;

            return await addFile({
                id: +propertyId!,
                variant,
                body: {
                    filename: name,
                    size,
                    contentType: type,
                },
            });
        },
        [variant, propertyId]
    );

    return addFileCb;
};

export default useAddFile;
