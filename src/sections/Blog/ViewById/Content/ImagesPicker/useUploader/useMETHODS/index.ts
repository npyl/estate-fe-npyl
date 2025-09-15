import useAddFile from "./useAddFile";
import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import useRemoveFile from "./useRemoveFile";

const useMETHODS = (postId: number): UseGeneralUploaderMethods => {
    const addFile = useAddFile(postId);
    const removeFile = useRemoveFile(postId);
    return { addFile, removeFile };
};

export default useMETHODS;
