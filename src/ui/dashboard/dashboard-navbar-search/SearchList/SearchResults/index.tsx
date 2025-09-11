import { Grid, Stack } from "@mui/material";
import AgreementItems from "./AgreementItems";
import PropertiesSubList from "./PropertiesSubList";
import useSearchHistory from "../SearchHistory/useSearchHistory";
import CustomersSubList from "./CustomersSubList";
import { FC } from "react";
import { SearchCategory } from "../../types";

interface Props {
    searchCategory: SearchCategory;
    searchString: string;
}

const SearchResults: FC<Props> = ({ searchCategory, searchString }) => {
    const { addSearchHistoryItem } = useSearchHistory();

    return (
        <>
            <Grid container>
                {searchCategory === "properties" && (
                    <PropertiesSubList
                        searchString={searchString}
                        onItemClick={addSearchHistoryItem}
                        sortBy="code"
                    />
                )}

                {searchCategory === "all" && (
                    <Stack direction={{ xs: "column", md: "row" }} width="100%">
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
                            <CustomersSubList
                                searchCategory={searchCategory}
                                searchString={searchString}
                                onItemClick={addSearchHistoryItem}
                            />
                        </Grid>
                    </Stack>
                )}

                {searchCategory === "customers" || searchCategory === "b2b" ? (
                    <CustomersSubList
                        searchCategory={searchCategory}
                        searchString={searchString}
                        onItemClick={addSearchHistoryItem}
                    />
                ) : null}
            </Grid>

            {searchCategory === "all" || searchCategory === "agreements" ? (
                <AgreementItems search={searchString} />
            ) : null}
        </>
    );
};

export default SearchResults;
