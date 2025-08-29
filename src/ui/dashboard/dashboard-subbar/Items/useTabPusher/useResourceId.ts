import { useRouter } from "next/router";
import toNumberSafe from "@/utils/toNumberSafe";

const useResourceId = () => {
    const router = useRouter();

    const { agreementId, propertyId, customerId, taskId, userId, postId } =
        router.query;

    if (Boolean(agreementId)) return toNumberSafe(agreementId);
    if (Boolean(propertyId)) return toNumberSafe(propertyId);
    if (Boolean(customerId)) return toNumberSafe(customerId);
    if (Boolean(userId)) return toNumberSafe(userId);
    if (Boolean(taskId)) return toNumberSafe(taskId);
    if (Boolean(postId)) return toNumberSafe(postId);

    // INFO: it is ok to return nothing if we found nothing!
    return;
};

export default useResourceId;
