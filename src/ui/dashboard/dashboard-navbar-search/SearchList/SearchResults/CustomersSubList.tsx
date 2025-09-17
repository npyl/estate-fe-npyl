import { Stack, StackProps } from "@mui/material";
import { FC, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSearchCustomerQuery } from "@/services/customers";
import { SearchCategory } from "../../types";
import Pagination from "@/components/Pagination/client";
import { usePagination } from "@/components/Pagination";
import CustomerIcon from "@/assets/icons/customers";
import CustomerCard from "@/ui/Cards/CustomerCard";
import Head, { useHeadControl } from "./Head";

const PAGE_SIZE = 5;

interface Props {
    searchCategory: SearchCategory;
    searchString: string;
    onItemClick: (value: string) => void;
}

interface ContentProps extends Props {
    onCountChange: (c: number) => void;
}

const Content: FC<ContentProps> = ({
    onItemClick,
    searchCategory,
    searchString,
    onCountChange,
}) => {
    const pagination = usePagination();

    const b2b = searchCategory === "b2b" || searchCategory === "all";

    // non-b2b Customers
    const { data: data0, isLoading: isLoading0 } = useSearchCustomerQuery(
        { searchString, b2b: false },
        {
            skip: searchString === "" || searchCategory === "b2b",
        }
    );
    // b2b-only Customers
    const { data: b2bOnly, isLoading: isLoading1 } = useSearchCustomerQuery(
        { searchString, b2b: true },
        {
            skip: searchString === "" || !b2b,
        }
    );

    const isLoading = isLoading0 || isLoading1;

    const all = useMemo(
        () => [...(data0 ?? []), ...(b2bOnly ?? [])],
        [data0, b2bOnly]
    );
    useEffect(() => {
        onCountChange(all.length);
    }, [all.length, onCountChange]);

    const handlePageChange = (event: any, page: number) => {
        event.stopPropagation();
        pagination.onChange(event, page);

        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = 0;
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <Pagination
            {...pagination}
            isLoading={isLoading}
            pageSize={PAGE_SIZE}
            onChange={handlePageChange}
            Container={Stack}
            ContainerProps={{ spacing: 1, p: 1 }}
        >
            {all.map((c) => (
                <CustomerCard
                    key={c.id}
                    c={c}
                    onClick={() => onItemClick(`${c.firstName} ${c.lastName}`)}
                />
            ))}
        </Pagination>
    );
};

interface CustomersSubListProps extends Props, StackProps {}

const CustomersSubList: FC<CustomersSubListProps> = ({
    searchString,
    searchCategory,
    onItemClick,
    ...props
}) => {
    const { t } = useTranslation();

    const { headRef, onCountChange } = useHeadControl();

    return (
        <Stack {...props}>
            <Head ref={headRef} Icon={CustomerIcon}>
                {t("Customers")}
            </Head>

            <Content
                searchString={searchString}
                searchCategory={searchCategory}
                onItemClick={onItemClick}
                onCountChange={onCountChange}
            />
        </Stack>
    );
};

export default CustomersSubList;
