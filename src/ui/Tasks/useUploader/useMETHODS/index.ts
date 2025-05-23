import useAddFile from "./useAddFile";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import useRemoveFile from "./useRemoveFile";

const useMETHODS = (cardId?: number): UseGeneralUploaderMethods => {
    const addFile = useAddFile(cardId);
    const removeFile = useRemoveFile();
    return { addFile, removeFile };
};

export default useMETHODS;
