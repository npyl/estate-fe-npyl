import { useCallback, useMemo } from "react";
import {
    tasks,
    useAddAttachmentMutation,
    useGetAttachmentsQuery,
} from "@/services/tasks";
import executeSequentially from "@/utils/executeSequentially";
import { uploadWithProgress } from "@/services/file";
import { useDispatch } from "react-redux";
import { IAddAttachmentReq, IAddAttachmentRes } from "@/services/tasks/types";
import useDialog from "@/hooks/useDialog";

type Step0Res = IAddAttachmentRes & { f: File };

const useUploadAttachment = (cardId?: number) => {
    const dispatch = useDispatch();

    const [addAttachment] = useAddAttachmentMutation(); // BE

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
                await uploadWithProgress(url, f);

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

            stopUploading();

            dispatch(tasks.util.invalidateTags(["Attachments"]));

            return ids;
        },
        [step0, step1]
    );

    return { upload, isUploading };
};

export default useUploadAttachment;
