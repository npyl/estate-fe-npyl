import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";
import { parseAsInteger, useQueryState } from "nuqs";

const useResourceId = () => {
    const router = useRouter();

    const [taskId] = useQueryState("taskId", parseAsInteger.withDefault(-1));

    const { agreementId, propertyId, customerId, userId } = router.query;

    if (Boolean(agreementId)) return toNumberSafe(agreementId);
    if (Boolean(propertyId)) return toNumberSafe(propertyId);
    if (Boolean(customerId)) return toNumberSafe(customerId);
    if (Boolean(userId)) return toNumberSafe(userId);
    if (taskId !== -1) return taskId;

    // INFO: it is ok to return nothing if we found nothing!
    return;
};

export default useResourceId;
