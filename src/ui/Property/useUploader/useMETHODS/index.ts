import { TFileVariant } from "@/types/file";
import useAddFile from "./useAddFile";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import useRemoveFile from "./useRemoveFile";

const useMETHODS = (variant: TFileVariant): UseGeneralUploaderMethods => {
    const addFile = useAddFile(variant);
    const removeFile = useRemoveFile(variant);
    return { addFile, removeFile };
};

export default useMETHODS;
