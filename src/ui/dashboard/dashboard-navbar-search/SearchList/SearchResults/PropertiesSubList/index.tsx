import { Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { PropertySearchItem } from "./PropertySearchItem";
import { useTranslation } from "react-i18next";
import Pagination, { usePagination } from "@/components/Pagination";
import { useSearchPropertyQuery } from "@/services/properties";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const PAGE_SIZE = 20;

interface PropertiesSubListProps {
    searchString: string;
    sortBy?: string;
    onItemClick: (value: string) => void;
}

const PropertiesSubList = ({
    searchString,
    sortBy = "code", //used for property search only
    onItemClick,
}: PropertiesSubListProps) => {
    const { t } = useTranslation();

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
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [pagination.page]);

    return (
        <Grid
            item
            xs={12}
            sx={{
                marginY: "10px",
            }}
        >
            {properties.length === 0 ? null : (
                <>
                    <Typography
                        variant="h6"
                        display="flex"
                        justifyContent="center"
                        gap={1}
                        alignItems="center"
                        width="100%"
                        sx={{
                            borderBottom: "1px solid lightgrey",
                        }}
                    >
                        <HomeOutlinedIcon
                            sx={{
                                width: "22px",
                                height: "22px",
                            }}
                        />
                        {t("Properties")}
                    </Typography>

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
                </>
            )}
        </Grid>
    );
};

export default PropertiesSubList;
