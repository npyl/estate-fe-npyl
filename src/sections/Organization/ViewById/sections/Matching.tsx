import Content from "@/sections/Customer/ViewById/sections/Matching/content";
import { useMatchingPropertiesQuery } from "@/services/organization";
import { toNumberSafe } from "@/utils/toNumber";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const pageSize = 5;

const MatchingPropertiesSection = () => {
    const [page, setPage] = useState(0);

    const router = useRouter();
    const { organizationId } = router.query;
    const iOrganizationId = toNumberSafe(organizationId);
    if (iOrganizationId === -1) return null;

    const { data } = useMatchingPropertiesQuery({
        page,
        pageSize,
        organizationId: iOrganizationId,
    });

    const onChange = useCallback((_: any, p: number) => setPage(p), []);

    return (
        <Content
            pageSize={pageSize}
            page={page}
            onChange={onChange}
            properties={data?.content ?? []}
        />
    );
};

export default MatchingPropertiesSection;
