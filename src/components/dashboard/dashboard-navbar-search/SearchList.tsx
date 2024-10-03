import {
    Box,
    Grid,
    Paper,
    PopperProps,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { StyledPopper } from "../styles";
import { useEffect, useMemo, useRef } from "react";
import useClickOutside from "./useClickOutside";
import { CustomerSearchItem } from "./CustomerSearchItem";
import { PropertySearchItem } from "./PropertySearchItem";
import { ScrollBox } from "src/components/ScrollBox";
import { useTranslation } from "react-i18next";
import Pagination, { usePagination } from "@/components/Pagination";
import { useSearchPropertyQuery } from "@/services/properties";
import { useSearchCustomerQuery } from "@/services/customers";
import { SearchCategory } from "./types";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AgreementItems from "./AgreementItems";
import useScreenWidth from "./hook";
import { addSearchHistory, getSearchHistory } from ".";
// import { useTheme } from "@emotion/react";

const PAGE_SIZE = 20;

interface PropertiesSubListProps {
    searchString: string;
    onItemClick: (value: string) => void;
}

const PropertiesSubList = ({
    searchString,
    onItemClick,
}: PropertiesSubListProps) => {
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

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [pagination.page]);

    return (
        <ScrollBox ref={scrollRef} scrollbarWidth="15px">
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
        </ScrollBox>
    );
};

interface SearchListProps extends Omit<PopperProps, "direction" | "results"> {
    searchText: string;
    searchCategory: SearchCategory;
    onClickOutside: () => void;
    updateSearchHistory: (history: string[]) => void;
}

export const SearchList = ({
    searchText,
    searchCategory,
    open,
    onClickOutside,
    anchorEl,
    updateSearchHistory,
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

    const handleItemClick = (value: string) => {
        addSearchHistory(value);
        updateSearchHistory(getSearchHistory());
    };

    const customers = useMemo(
        () => (searchCategory !== "properties" ? customersResults || [] : []),
        [searchCategory, customersResults]
    );

    const screenWidth = useScreenWidth();

    const paperWidth = useMemo(() => {
        if (screenWidth > 1400 && screenWidth <= 1600) return "185%";
        if (screenWidth > 1600 && screenWidth <= 2100) return "155%";
        if (screenWidth > 2100) return "160%";
        return "100%";
    }, [screenWidth]);

    return (
        <div ref={ref}>
            <StyledPopper
                open={open}
                anchorEl={anchorEl}
                searchCategory={searchCategory}
                placement={
                    isMobile
                        ? "bottom-start"
                        : searchCategory === "all"
                        ? "top"
                        : "bottom-start"
                }
            >
                <Paper
                    sx={{
                        maxHeight: "91vh",
                        width: isMobile
                            ? "140%"
                            : searchCategory === "properties"
                            ? "100%"
                            : searchCategory === "customers"
                            ? "100%"
                            : paperWidth,
                        overflowX: "hidden",
                        overflowY: isMobile ? "auto" : "hidden",
                    }}
                >
                    <Grid container>
                        {searchCategory === "properties" && (
                            <PropertiesSubList
                                searchString={searchText}
                                onItemClick={handleItemClick}
                            />
                        )}

                        {searchCategory === "all" && (
                            <Stack
                                direction={isMobile ? "column" : "row"}
                                width="100%"
                            >
                                <Grid item xs={12} md={7}>
                                    {isMobile ? (
                                        <PropertiesSubList
                                            searchString={searchText}
                                            onItemClick={handleItemClick}
                                        />
                                    ) : (
                                        <PropertiesSubList
                                            searchString={searchText}
                                            onItemClick={handleItemClick}
                                        />
                                    )}
                                </Grid>
                                {customers.length > 0 && (
                                    <Grid
                                        item
                                        xs={12}
                                        md={5}
                                        sx={{
                                            marginY: "10px",

                                            borderLeft: "1px solid grey",
                                        }}
                                    >
                                        {isMobile ? (
                                            <>
                                                <Typography
                                                    variant="h6"
                                                    display="flex"
                                                    justifyContent="center"
                                                    gap={1}
                                                    alignItems="center"
                                                    // width="100%"
                                                    sx={{
                                                        borderBottom:
                                                            "1px solid lightgrey",
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
                                                <Box
                                                    width="100%"
                                                    sx={{ overflowX: "hidden" }}
                                                >
                                                    {customers.map(
                                                        (option, index) => (
                                                            <CustomerSearchItem
                                                                key={index}
                                                                option={option}
                                                                searchText={
                                                                    searchText
                                                                }
                                                                onClick={
                                                                    handleItemClick
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Box>
                                            </>
                                        ) : (
                                            <ScrollBox scrollbarWidth="15px">
                                                <Typography
                                                    variant="h6"
                                                    display="flex"
                                                    justifyContent="center"
                                                    gap={1}
                                                    alignItems="center"
                                                    // width="100%"
                                                    sx={{
                                                        borderBottom:
                                                            "1px solid lightgrey",
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
                                                <Box
                                                    width="100%"
                                                    sx={{ overflowX: "hidden" }}
                                                >
                                                    {customers.map(
                                                        (option, index) => (
                                                            <CustomerSearchItem
                                                                key={index}
                                                                option={option}
                                                                searchText={
                                                                    searchText
                                                                }
                                                                onClick={
                                                                    handleItemClick
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Box>
                                            </ScrollBox>
                                        )}
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
                                    <ScrollBox scrollbarWidth="15px">
                                        <Typography
                                            variant="h6"
                                            display="flex"
                                            justifyContent="center"
                                            gap={1}
                                            alignItems="center"
                                            width="100%"
                                            sx={{
                                                borderBottom:
                                                    "1px solid lightgrey",
                                            }}
                                        >
                                            <PersonOutlineOutlinedIcon
                                                sx={{
                                                    // color: "black",
                                                    width: "22px",
                                                    height: "22px",
                                                }}
                                            />
                                            {t("Customers")}
                                        </Typography>

                                        {customers.map((option, index) => (
                                            <CustomerSearchItem
                                                key={index}
                                                option={option}
                                                searchText={searchText}
                                                onClick={handleItemClick}
                                            />
                                        ))}
                                    </ScrollBox>
                                </Grid>
                            )}
                    </Grid>

                    {searchCategory === "all" ||
                    searchCategory === "agreements" ? (
                        <AgreementItems search={searchText} />
                    ) : null}
                </Paper>
            </StyledPopper>
        </div>
    );
};
