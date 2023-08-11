import { Divider, Grid, Paper, PopperProps, Typography } from "@mui/material";
import { IPropertyResultResponse } from "src/types/properties";
import SearchNotFound from "src/components/search-not-found/SearchNotFound";
import { StyledPopper } from "../styles";
import { useRef } from "react";
import useClickOutside from "./useClickOutside";
import { ICustomerResultResponse } from "src/types/customer";
import { CustomerSearchItem } from "./CustomerSearchItem";
import { PropertySearchItem } from "./PropertySearchItem";
import { ScrollBox } from "src/components/ScrollBox";

interface SearchListProps extends Omit<PopperProps, "direction" | "results"> {
    properties: IPropertyResultResponse[];
    customers: ICustomerResultResponse[];
    searchText: string;
    onClickOutside: () => void;
}

export const SearchList = ({
    properties,
    customers,
    searchText,
    open,
    onClickOutside,
    anchorEl,
}: SearchListProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => onClickOutside && onClickOutside());

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
                        {properties?.length === 0 &&
                            customers?.length === 0 && (
                                <SearchNotFound query={searchText} />
                            )}

                        {properties?.length > 0 && (
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
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
                                        Properties
                                    </Typography>
                                    {properties.map((option, index: number) => (
                                        <PropertySearchItem
                                            key={index}
                                            option={option}
                                            searchText={searchText}
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        )}

                        {properties?.length > 0 && customers?.length > 0 && (
                            <Divider />
                        )}

                        {customers?.length > 0 && (
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
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
                                        Customers
                                    </Typography>
                                    {customers.map((option, index: number) => (
                                        <CustomerSearchItem
                                            key={index}
                                            option={option}
                                            searchText={searchText}
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        )}
                    </ScrollBox>
                </Paper>
            </StyledPopper>
        </div>
    );
};
