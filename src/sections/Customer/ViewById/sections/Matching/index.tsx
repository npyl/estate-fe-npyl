import Content from "./content";
import { useSuggestForCustomerQuery } from "@/services/customers";
import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";
import { useCallback, useState } from "react";

const pageSize = 5;

const MatchingPropertiesSection = () => {
    const [page, setPage] = useState(0);

    const router = useRouter();
    const { customerId } = router.query;
    const iCustomerId = toNumberSafe(customerId);

    const { data } = useSuggestForCustomerQuery({
        page,
        pageSize,
        customerId: iCustomerId,
    });

    const onChange = useCallback((_: any, p: number) => setPage(p), []);

    if (iCustomerId === -1) return null;

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
