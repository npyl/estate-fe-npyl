import { useTabCountQuery } from "@/services/customers";
import { toNumberSafe } from "@/utils/toNumber";
import { useRouter } from "next/router";

const useOrganizationTabCounts = () => {
    const router = useRouter();
    const { organizationId } = router.query;
    const iOrganizationId = toNumberSafe(organizationId);
    return useTabCountQuery(iOrganizationId, { skip: iOrganizationId === -1 });
};

export default useOrganizationTabCounts;
