import {
    Box,
    Grid,
    Paper,
    PopperProps,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { StyledPopper } from "../styles";
import { FC, useEffect, useMemo, useRef } from "react";
import { CustomerSearchItem } from "./CustomerSearchItem";
import { PropertySearchItem } from "./PropertySearchItem";
import { ScrollBox } from "src/components/ScrollBox";
import { useTranslation } from "react-i18next";
import Pagination, { usePagination } from "@/components/Pagination";
import { useSearchPropertyQuery } from "@/services/properties";
import { useSearchCustomerQuery } from "@/services/customers";
import { SearchCategory } from "../types";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AgreementItems from "./AgreementItems";
import useScreenWidth from "./useScreenWidth";
import useSearchHistory from "../HistoryList/useSearchHistory";

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

interface CustomerSearchListProps {
    searchCategory: SearchCategory;
    searchString: string;
    onItemClick: (value: string) => void;
}

const CustomersSearchList: FC<CustomerSearchListProps> = ({
    searchCategory,
    searchString,
    onItemClick,
}) => {
    const { t } = useTranslation();

    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm")
    );

    const b2b = searchCategory === "b2b" || searchCategory === "all";

    // non-b2b Customers
    const { data: data0 } = useSearchCustomerQuery(
        { searchString, b2b: false },
        {
            skip: searchString === "" || searchCategory === "b2b",
        }
    );
    // b2b-only Customers
    const { data: b2bOnly } = useSearchCustomerQuery(
        { searchString, b2b: true },
        {
            skip: searchString === "" || !b2b,
        }
    );

    const all = useMemo(
        () => [...(data0 ?? []), ...(b2bOnly ?? [])],
        [data0, b2bOnly]
    );

    return (
        <>
            {isMobile ? (
                <>
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
                    <Box width="100%" sx={{ overflowX: "hidden" }}>
                        {all.map((option) => (
                            <CustomerSearchItem
                                key={option.id}
                                option={option}
                                searchText={searchString}
                                onClick={onItemClick}
                            />
                        ))}
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
                    <Box width="100%" sx={{ overflowX: "hidden" }}>
                        {all.map((option) => (
                            <CustomerSearchItem
                                key={option.id}
                                option={option}
                                searchText={searchString}
                                onClick={onItemClick}
                            />
                        ))}
                    </Box>
                </ScrollBox>
            )}
        </>
    );
};

interface SearchListProps extends Omit<PopperProps, "direction" | "results"> {
    searchString: string;
    searchCategory: SearchCategory;
}

const SearchList = ({
    searchString,
    searchCategory,
    open,
    anchorEl,
}: SearchListProps) => {
    const { addSearchHistoryItem } = useSearchHistory();

    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm")
    );

    const screenWidth = useScreenWidth();

    const paperWidth = useMemo(() => {
        if (screenWidth > 1400 && screenWidth <= 1600) return "185%";
        if (screenWidth > 1600 && screenWidth <= 2100) return "155%";
        if (screenWidth > 2100) return "160%";
        return "100%";
    }, [screenWidth]);

    return (
        <StyledPopper
            open={open}
            anchorEl={anchorEl}
            searchCategory={searchCategory}
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
                            searchString={searchString}
                            onItemClick={addSearchHistoryItem}
                            sortBy="code"
                        />
                    )}

                    {searchCategory === "all" && (
                        <Stack
                            direction={isMobile ? "column" : "row"}
                            width="100%"
                        >
                            <Grid item xs={12} md={7}>
                                <PropertiesSubList
                                    searchString={searchString}
                                    onItemClick={addSearchHistoryItem}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={5}
                                sx={{
                                    marginY: "10px",
                                    borderLeft: "1px solid grey",
                                }}
                            >
                                <CustomersSearchList
                                    searchCategory={searchCategory}
                                    searchString={searchString}
                                    onItemClick={addSearchHistoryItem}
                                />
                            </Grid>
                        </Stack>
                    )}

                    {searchCategory === "customers" ||
                    searchCategory === "b2b" ? (
                        <CustomersSearchList
                            searchCategory={searchCategory}
                            searchString={searchString}
                            onItemClick={addSearchHistoryItem}
                        />
                    ) : null}
                </Grid>

                {searchCategory === "all" || searchCategory === "agreements" ? (
                    <AgreementItems search={searchString} />
                ) : null}
            </Paper>
        </StyledPopper>
    );
};

export default SearchList;
