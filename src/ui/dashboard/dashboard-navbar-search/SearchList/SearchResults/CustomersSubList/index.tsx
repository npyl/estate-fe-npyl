import { Stack, StackProps, Typography } from "@mui/material";
import { FC, useMemo, useRef } from "react";
import { CustomerSearchItem } from "./CustomerSearchItem";
import { useTranslation } from "react-i18next";
import { useSearchCustomerQuery } from "@/services/customers";
import { SearchCategory } from "../../../types";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Pagination from "@/components/Pagination/client";
import { usePagination } from "@/components/Pagination";

const PAGE_SIZE = 5;

interface ContentProps {
    searchCategory: SearchCategory;
    searchString: string;
    onItemClick: (value: string) => void;
}

const Content: FC<ContentProps> = ({
    onItemClick,
    searchCategory,
    searchString,
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
        >
            {all.map((option) => (
                <CustomerSearchItem
                    key={option.id}
                    option={option}
                    searchText={searchString}
                    onClick={onItemClick}
                />
            ))}
        </Pagination>
    );
};

interface CustomersSubListProps extends ContentProps, StackProps {}

const CustomersSubList: FC<CustomersSubListProps> = ({
    searchString,
    searchCategory,
    onItemClick,
    ...props
}) => {
    const { t } = useTranslation();

    return (
        <Stack {...props}>
            <Typography
                variant="h6"
                display="flex"
                justifyContent="center"
                gap={1}
                alignItems="center"
                sx={{
                    borderBottom: "1px solid lightgrey",
                }}
            >
                <PersonOutlineOutlinedIcon
                    sx={{
                        width: "22px",
                        height: "22px",
                    }}
                />
                {t("Customers")}
            </Typography>

            <Content
                searchString={searchString}
                searchCategory={searchCategory}
                onItemClick={onItemClick}
            />
        </Stack>
    );
};

export default CustomersSubList;
