import { Divider, Grid, Paper, PopperProps, Typography } from "@mui/material";
import { StyledPopper } from "../styles";
import { useMemo, useRef } from "react";
import useClickOutside from "./useClickOutside";
import { CustomerSearchItem } from "./CustomerSearchItem";
import { PropertySearchItem } from "./PropertySearchItem";
import { ScrollBox } from "src/components/ScrollBox";
import { useTranslation } from "react-i18next";
import Pagination, { usePagination } from "@/components/Pagination";
import { useSearchPropertyQuery } from "@/services/properties";
import { useSearchCustomerQuery } from "@/services/customers";
import { SearchCategory } from "./types";

const PAGE_SIZE = 5;

interface PropertiesSubListProps {
    searchString: string;
}

const PropertiesSubList = ({ searchString }: PropertiesSubListProps) => {
    const { t } = useTranslation();

    const pagination = usePagination();

    const { data, isLoading } = useSearchPropertyQuery(
        {
            searchString,
            page: pagination.page,
            pageSize: PAGE_SIZE,
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

    return (
        <Grid
            item
            xs={12}
            sx={{
                borderRight: {
                    lg: "1px solid blue",
                    md: 0,
                },
                marginY: "10px",
            }}
        >
            <Typography variant="h6" textAlign="center">
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
                    />
                ))}
            </Pagination>
        </Grid>
    );
};

interface SearchListProps extends Omit<PopperProps, "direction" | "results"> {
    searchText: string;
    searchCategory: SearchCategory;
    onClickOutside: () => void;
}

export const SearchList = ({
    searchText,
    searchCategory,
    open,
    onClickOutside,
    anchorEl,
}: SearchListProps) => {
    const { t } = useTranslation();

    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => {
        onClickOutside && onClickOutside();
    });

    const { data: customersResults } = useSearchCustomerQuery(searchText, {
        skip: searchText === "",
    });

    const customers = useMemo(
        () => (searchCategory !== "properties" ? customersResults || [] : []),
        [searchCategory, customersResults]
    );

    return (
        <div ref={ref}>
            <StyledPopper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
            >
                <Paper
                    sx={{
                        maxHeight: "90vh",
                        width: "100%",
                        overflowX: "hidden",
                    }}
                >
                    <ScrollBox scrollbarWidth="15px">
                        <Grid container>
                            {searchCategory === "properties" && (
                                <PropertiesSubList searchString={searchText} />
                            )}

                            {searchCategory === "all" && (
                                <>
                                    <PropertiesSubList
                                        searchString={searchText}
                                    />
                                    {customers.length > 0 && (
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{
                                                marginY: "10px",
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                textAlign={"center"}
                                            >
                                                {t("Customers")}
                                            </Typography>
                                            {customers.map((option, index) => (
                                                <CustomerSearchItem
                                                    key={index}
                                                    option={option}
                                                    searchText={searchText}
                                                />
                                            ))}
                                        </Grid>
                                    )}
                                </>
                            )}

                            {searchCategory === "customers" &&
                                customers.length > 0 && (
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{
                                            marginY: "10px",
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            textAlign={"center"}
                                        >
                                            {t("Customers")}
                                        </Typography>
                                        {customers.map((option, index) => (
                                            <CustomerSearchItem
                                                key={index}
                                                option={option}
                                                searchText={searchText}
                                            />
                                        ))}
                                    </Grid>
                                )}
                        </Grid>
                    </ScrollBox>
                </Paper>
            </StyledPopper>
        </div>
    );
};
