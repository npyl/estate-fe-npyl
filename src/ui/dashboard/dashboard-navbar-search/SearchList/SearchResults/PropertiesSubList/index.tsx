import { Stack, StackProps, Typography } from "@mui/material";
import { FC, useMemo, useRef } from "react";
import { PropertySearchItem } from "./PropertySearchItem";
import { useTranslation } from "react-i18next";
import Pagination, { usePagination } from "@/components/Pagination";
import { useSearchPropertyQuery } from "@/services/properties";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const PAGE_SIZE = 5;

interface ContentProps {
    searchString: string;
    sortBy?: string;
    onItemClick: (value: string) => void;
}

const Content: FC<ContentProps> = ({
    onItemClick,
    searchString,
    sortBy = "code",
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

    const properties = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );

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
            totalItems={data?.totalElements ?? 0}
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

interface PropertiesSubListProps extends ContentProps, StackProps {}

const PropertiesSubList: FC<PropertiesSubListProps> = ({
    searchString,
    sortBy,
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
                width="100%"
                p={1}
                // ...
                position="sticky"
                top={0}
                bgcolor="background.default"
                zIndex={1}
            >
                <HomeOutlinedIcon
                    sx={{
                        width: "22px",
                        height: "22px",
                    }}
                />
                {t("Properties")}
            </Typography>

            <Content
                searchString={searchString}
                sortBy={sortBy}
                onItemClick={onItemClick}
            />
        </Stack>
    );
};

export default PropertiesSubList;
