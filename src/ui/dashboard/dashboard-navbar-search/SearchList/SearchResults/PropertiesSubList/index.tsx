import { Stack, StackProps } from "@mui/material";
import { FC, useEffect, useMemo, useRef } from "react";
import { PropertySearchItem } from "./PropertySearchItem";
import { useTranslation } from "react-i18next";
import Pagination, { usePagination } from "@/components/Pagination";
import { useSearchPropertyQuery } from "@/services/properties";
import HomeIcon from "@/assets/icons/home";
import Head, { useHeadControl } from "../Head";

const PAGE_SIZE = 5;

interface Props {
    searchString: string;
    sortBy?: string;
    onItemClick: (value: string) => void;
}

interface ContentProps extends Props {
    onCountChange: (c: number) => void;
}

const Content: FC<ContentProps> = ({
    onItemClick,
    searchString,
    sortBy = "code",
    onCountChange,
}) => {
    const pagination = usePagination();

    const { data, isLoading } = useSearchPropertyQuery(
        {
            searchString,
            page: pagination.page,
            pageSize: PAGE_SIZE,
            sortBy,
        },
        {
            skip: searchString === "",
        }
    );

    const totalItems = data?.totalElements ?? 0;
    const properties = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );
    useEffect(() => {
        onCountChange(totalItems);
    }, [totalItems, onCountChange]);

    const handlePageChange = (event: any, page: number) => {
        event.stopPropagation();
        pagination.onChange(event, page);

        if (!scrollRef.current) return;
        scrollRef.current.scrollTop = 0;
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    if (properties.length === 0) return null;

    return (
        <Pagination
            {...pagination}
            isLoading={isLoading}
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            onChange={handlePageChange}
        >
            {properties.map((option) => (
                <PropertySearchItem
                    key={option.id}
                    option={option}
                    searchText={searchString}
                    onClick={onItemClick}
                />
            ))}
        </Pagination>
    );
};

interface PropertiesSubListProps extends Props, StackProps {}

const PropertiesSubList: FC<PropertiesSubListProps> = ({
    searchString,
    sortBy,
    onItemClick,
    ...props
}) => {
    const { t } = useTranslation();

    const { headRef, onCountChange } = useHeadControl();

    return (
        <Stack {...props}>
            <Head ref={headRef} Icon={HomeIcon}>
                {t("Properties")}
            </Head>

            <Content
                searchString={searchString}
                sortBy={sortBy}
                onItemClick={onItemClick}
                onCountChange={onCountChange}
            />
        </Stack>
    );
};

export default PropertiesSubList;
