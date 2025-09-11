import { Grid } from "@mui/material";
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

    const properties =
        searchCategory === "properties" || searchCategory === "all";

    const customers =
        searchCategory === "customers" ||
        searchCategory === "b2b" ||
        searchCategory === "all";

    const agreements =
        searchCategory === "agreements" || searchCategory === "all";

    return (
        <Grid container>
            {properties ? (
                <Grid item xs={12} md={7}>
                    <PropertiesSubList
                        searchString={searchString}
                        onItemClick={addSearchHistoryItem}
                        sortBy="code"
                    />
                </Grid>
            ) : null}

            {customers ? (
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
            ) : null}

            {agreements ? (
                <Grid item xs={12}>
                    <AgreementItems search={searchString} />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default SearchResults;
