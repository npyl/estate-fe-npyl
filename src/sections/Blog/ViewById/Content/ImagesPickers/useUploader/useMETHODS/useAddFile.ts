import { useAddImageMutation } from "@/services/blog";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import { useCallback } from "react";

const useAddFile = (postId: number) => {
    const [addImage] = useAddImageMutation();
    const addFileCb: UseGeneralUploaderMethods["addFile"] = useCallback(
        async (f) => {
            const { name, size, type } = f;

            return await addImage({
                postId,
                body: {
                    contentType: type,
                    size,
                    filename: name,
                },
            });
        },
        []
    );

    return addFileCb;
};

export default useAddFile;
