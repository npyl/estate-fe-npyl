import { Divider, Grid, Paper, PopperProps, Typography } from "@mui/material";
import SearchNotFound from "src/components/search-not-found/SearchNotFound";
import { StyledPopper } from "../styles";
import { useMemo, useRef } from "react";
import useClickOutside from "./useClickOutside";
import { CustomerSearchItem } from "./CustomerSearchItem";
import { PropertySearchItem } from "./PropertySearchItem";
import { LocationSearchItem } from "./LocationSearchItem";
import { ScrollBox } from "src/components/ScrollBox";
import { useTranslation } from "react-i18next";
import Pagination, { usePagination } from "@/components/Pagination";
import { useSearchPropertyQuery } from "@/services/properties";
import { useSearchCustomerQuery } from "@/services/customers";
import { useSearchLocationsQuery } from "@/services/location";
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
                totalItems={data?.totalElements ?? 5}
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

    useClickOutside(ref, () => onClickOutside && onClickOutside());

    const { data: customersResults } = useSearchCustomerQuery(searchText, {
        skip: searchText === "",
    });
    const { data: locationsResults } = useSearchLocationsQuery(searchText, {
        skip: searchText === "" && searchText.length < 4,
    });

    const customers = useMemo(
        () => (searchCategory !== "properties" ? customersResults || [] : []),
        [searchCategory, customersResults]
    );
    const locations = useMemo(
        () => (searchCategory !== "locations" ? locationsResults || [] : []),
        [searchCategory, locationsResults]
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
                        overflowX: "hidden",
                    }}
                >
                    <ScrollBox scrollbarWidth="15px">
                        {/* {properties?.length === 0 &&
                            customers?.length === 0 &&
                            locations?.length === 0 && (
                                <SearchNotFound query={searchText} />
                            )} */}

                        <Grid container>
                            <PropertiesSubList searchString={searchText} />

                            {/* {properties?.length > 0 &&
                                customers?.length > 0 && <Divider />}
 */}
                            {customers?.length > 0 && (
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
                                    <Typography
                                        variant="h6"
                                        textAlign={"center"}
                                    >
                                        {t("Customers")}
                                    </Typography>
                                    {customers.map((option, index: number) => (
                                        <CustomerSearchItem
                                            key={index}
                                            option={option}
                                            searchText={searchText}
                                        />
                                    ))}
                                </Grid>
                            )}

                            {customers?.length > 0 && locations?.length > 0 && (
                                <Divider />
                            )}

                            {locations?.length > 0 && (
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
                                        {t("Locations")}
                                    </Typography>
                                    {locations.map((option) => (
                                        <LocationSearchItem
                                            key={option.areaID}
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
