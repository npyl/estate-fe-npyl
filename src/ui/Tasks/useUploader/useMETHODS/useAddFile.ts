import { UseGeneralUploaderMethods } from "@/ui/useGeneralUploader";
import { useCallback } from "react";
import { useAddAttachmentMutation } from "@/services/tasks";
import { IAddAttachmentReq } from "@/services/tasks/types";

// INFO: For task attachments we have taken a slightly different approach: id is used instead of key;
//       Inside useGeneralUpdate, this doesn't cause a problem, so keep everything sane by still using key instead of id
//       (type explicitly casted to string, but not a string actually)
const idAsKey = (id: number) => id as unknown as string;

const useAddFile = (cardId?: number) => {
    const [addAttachment] = useAddAttachmentMutation(); // BE

    const addFileCb: UseGeneralUploaderMethods["addFile"] = useCallback(
        async (f) => {
            const { name, size, type } = f;

            const body: IAddAttachmentReq = {
                card: cardId,
                contentType: type,
                filename: name,
                size,
            };

            const res = await addAttachment(body);
            if ("error" in res) return { error: "error" };

            return {
                data: { ...res.data, key: idAsKey(res.data.id), f },
            };
        },
        [cardId]
    );

    return addFileCb;
};

export default useAddFile;
