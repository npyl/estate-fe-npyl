import { useCallback } from "react";
import {
    tasks,
    useAddAttachmentMutation,
    useDeleteAttachmentMutation,
} from "@/services/tasks";
import executeSequentially from "@/utils/executeSequentially";
import { uploadWithProgress } from "@/ui/useGeneralUploader/file";
import { useDispatch } from "react-redux";
import { IAddAttachmentReq, IAddAttachmentRes } from "@/services/tasks/types";
import useDialog from "@/hooks/useDialog";

type Step0Res = IAddAttachmentRes & { f: File };

const useUploadAttachment = (
    cardId: number | undefined,
    onAddDone?: (res: IAddAttachmentRes[]) => void
) => {
    const dispatch = useDispatch();

    const [addAttachment] = useAddAttachmentMutation(); // BE
    const [deleteAttachment] = useDeleteAttachmentMutation();

    const [isUploading, startUploading, stopUploading] = useDialog();

    const step0 = useCallback(
        async (f: File): Promise<Step0Res> => {
            const body: IAddAttachmentReq = {
                card: cardId,
                contentType: f.type,
                filename: f.name,
                size: f.size,
            };

            return { ...(await addAttachment(body).unwrap()), f };
        },
        [cardId]
    );

    const step1 = useCallback(
        ({ id, url, f }: Step0Res) =>
            async () => {
                const res = await uploadWithProgress(url, f);

                // INFO: delete from BE if upload was not successful
                if (!res.ok) {
                    await deleteAttachment(id);
                    return;
                }

                return id;
            },
        []
    );

    const upload = useCallback(
        async (files: File[]) => {
            startUploading();

            const fileResponses = await Promise.all(files.map(step0));

            /* Upload Sequentially */
            const uploadPromises = fileResponses.map(step1);

            const ids = await executeSequentially(uploadPromises);

            // INFO: make sure we call this here (a.k.a. after upload) because directly after fileResponses means the cdnUrl is not valid yet.
            onAddDone?.(fileResponses);

            stopUploading();

            dispatch(tasks.util.invalidateTags(["Attachments"]));

            return ids;
        },
        [step0, step1, onAddDone]
    );

    return { upload, isUploading };
};

export default useUploadAttachment;
