import { IThreadAttachmentShortRes } from "@/types/email";
import { useGetAttachmentQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";

// Helper function to convert base64url to standard base64
const convertBase64UrlToBase64 = (base64url: string) =>
    base64url.replace(/-/g, "+").replace(/_/g, "/");

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

    // Convert base64url format (used by Gmail API) to standard base64
    const standardBase64 = convertBase64UrlToBase64(base64);

    // Create the appropriate data URL with the correct MIME type
    const url = `data:${mimeType};base64,${standardBase64}`;

    return [url, { isLoading }] as const;
};

export default useAttachmentDataUrl;
