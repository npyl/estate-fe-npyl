import useAddFile from "./useAddFile";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import useRemoveFile from "./useRemoveFile";

const useMETHODS = (): UseGeneralUploaderMethods => {
    const addFile = useAddFile();
    const removeFile = useRemoveFile();
    return { addFile, removeFile };
};

export default useMETHODS;
