import useAddFile from "./useAddFile";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import useRemoveFile from "./useRemoveFile";
import { CompanyImageType } from "@/types/company";

const useMETHODS = (variant: CompanyImageType): UseGeneralUploaderMethods => {
    const addFile = useAddFile(variant);
    const removeFile = useRemoveFile(variant);
    return { addFile, removeFile };
};

export default useMETHODS;
