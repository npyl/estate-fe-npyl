import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import { useCallback } from "react";

const useAddFile = () => {
    const addFileCb: UseGeneralUploaderMethods["addFile"] = useCallback(
        async (f) => {
            const { name, size, type } = f;

            // return await addFile({
            //     id: +propertyId!,
            //     variant,
            //     body: {
            //         filename: name,
            //         size,
            //         contentType: type,
            //     },
            // });

            return {} as any;
        },
        []
    );

    return addFileCb;
};

export default useAddFile;
