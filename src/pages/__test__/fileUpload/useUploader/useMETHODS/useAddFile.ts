import { useAddPropertyFileMutation } from "@/services/properties";
import { TFileVariant } from "@/types/file";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import { useCallback } from "react";

const useAddFile = (variant: TFileVariant, id: number) => {
    const [addFile] = useAddPropertyFileMutation(); // requests Backend for amazon url

    const addFileCb: UseGeneralUploaderMethods["addFile"] = useCallback(
        async (f) => {
            const { name, size, type } = f;

            return await addFile({
                id,
                variant,
                body: {
                    filename: name,
                    size,
                    contentType: type,
                },
            });
        },
        [variant, id]
    );

    return addFileCb;
};

export default useAddFile;
