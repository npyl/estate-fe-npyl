import { useGetOrganizationQuery } from "@/services/organization";
import { toNumberSafe } from "@/utils/toNumber";
import { useRouter } from "next/router";

const useOrganization = () => {
    const router = useRouter();
    const { organizationId } = router.query;
    const iOrganizationId = toNumberSafe(organizationId);
    return useGetOrganizationQuery(iOrganizationId, {
        skip: iOrganizationId === -1,
    });
};

export default useOrganization;
