import { IThreadAttachmentShortRes } from "@/types/email";
import { useGetAttachmentQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import { attachmentData2Url } from "@/sections/Emails/utils";

const useAttachmentDataUrl = (
    a: IThreadAttachmentShortRes,
    { skip }: { skip?: boolean }
) => {
    const { messageId, id: attachmentId, mimeType } = a;

    const { user } = useAuth();
    const { data, isLoading } = useGetAttachmentQuery(
        {
            userId: user?.id!,
            messageId,
            attachmentId,
        },
        { skip }
    );

    const { base64 } = data || {};
    if (!base64) return [undefined, { isLoading }] as const;

    const url = attachmentData2Url(base64, mimeType);

    return [url, { isLoading }] as const;
};

export default useAttachmentDataUrl;
