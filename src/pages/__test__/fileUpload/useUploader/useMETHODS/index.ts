import { TFileVariant } from "@/types/file";
import useAddFile from "./useAddFile";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import useRemoveFile from "./useRemoveFile";

const useMETHODS = (
    variant: TFileVariant,
    propertyId: number
): UseGeneralUploaderMethods => {
    const addFile = useAddFile(variant, propertyId);
    const removeFile = useRemoveFile(variant, propertyId);
    return { addFile, removeFile };
};

export default useMETHODS;
