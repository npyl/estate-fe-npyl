import Content from "./content";
import { useCallback, useState } from "react";
import useGetCustomer from "@/sections/Customer/hooks/useGetCustomer";

const pageSize = 5;

const OwnedCustomerPropertiesSection = () => {
    const [page, setPage] = useState(0);

    const { customer, isLoading } = useGetCustomer();

    const onChange = useCallback((_: any, p: number) => setPage(p), []);

    return (
        <Content
            page={page}
            onChange={onChange}
            pageSize={pageSize}
            properties={customer?.ownedProperties ?? []}
            isLoading={isLoading}
        />
    );
};

export default OwnedCustomerPropertiesSection;
