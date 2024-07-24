import {
    Divider,
    Grid,
    Paper,
    PopperProps,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { StyledPopper } from "../styles";
import { useEffect, useMemo, useRef, useState } from "react";
import useClickOutside from "./useClickOutside";
import { CustomerSearchItem } from "./CustomerSearchItem";
import { PropertySearchItem } from "./PropertySearchItem";
import { ScrollBox } from "src/components/ScrollBox";
import { useTranslation } from "react-i18next";
import Pagination, { usePagination } from "@/components/Pagination";
import { useSearchPropertyQuery } from "@/services/properties";
import { useSearchCustomerQuery } from "@/services/customers";
import { SearchCategory } from "./types";
import { Theme } from "@mui/system/createTheme";

const PAGE_SIZE = 25;
//Custom hook to hold the screenWidth for the categoryView ALL
const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return screenWidth;
};

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
                // borderRight: {
                //     lg: "1px solid blue",
                //     md: 0,
                // },
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

export default useScreenWidth;

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
    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm")
    );
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
    const screenWidth = useScreenWidth();

    const paperWidth = useMemo(() => {
        if (screenWidth > 1400 && screenWidth <= 1600) return "192%";
        if (screenWidth > 1600 && screenWidth <= 2100) return "154%";
        if (screenWidth > 2100) return "145%";
        return "100%";
    }, [screenWidth]);

    return (
        <div ref={ref}>
            <StyledPopper
                open={open}
                anchorEl={anchorEl}
                style={{ position: "absolute", left: 10 }}
                searchCategory={searchCategory}
                placement={
                    isMobile
                        ? "top"
                        : searchCategory === "all"
                        ? "top"
                        : "bottom-start"
                }
            >
                <Paper
                    sx={{
                        maxHeight: "85vh",
                        width: isMobile
                            ? "130%"
                            : searchCategory === "properties"
                            ? "100%"
                            : searchCategory === "customers"
                            ? "100%"
                            : paperWidth,
                        overflowX: "hidden",
                    }}
                >
                    {/* <ScrollBox scrollbarWidth="15px"> */}
                    <Grid container>
                        {searchCategory === "properties" && (
                            <PropertiesSubList searchString={searchText} />
                        )}

                        {searchCategory === "all" && (
                            <Stack direction={isMobile ? "column" : "row"}>
                                <Grid item xs={12} md={7.5}>
                                    <PropertiesSubList
                                        searchString={searchText}
                                    />
                                </Grid>
                                {customers.length > 0 && (
                                    <Grid
                                        item
                                        xs={12}
                                        md={5.5}
                                        sx={{
                                            marginY: "10px",

                                            borderLeft: "1px solid grey",
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
                            </Stack>
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
                    {/* </ScrollBox> */}
                </Paper>
            </StyledPopper>
        </div>
    );
};
