import { useRouter } from "next/router";
import Content from "./content";
import { useOwnedPropertiesQuery } from "@/services/customers";
import { useCallback, useState } from "react";

const pageSize = 5;

const OwnedCustomerPropertiesSection = () => {
    const [page, setPage] = useState(0);

    const router = useRouter();
    const { customerId } = router.query;
    const { data, isLoading } = useOwnedPropertiesQuery([+customerId!]);

    const onChange = useCallback((_: any, p: number) => setPage(p), []);

    return (
        <Content
            page={page}
            onChange={onChange}
            pageSize={pageSize}
            properties={(data as any) ?? []}
            isLoading={isLoading}
        />
    );
};

export default OwnedCustomerPropertiesSection;
