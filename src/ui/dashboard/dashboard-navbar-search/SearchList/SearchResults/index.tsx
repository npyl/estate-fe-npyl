import AgreementItems from "./AgreementItems";
import PropertiesSubList from "./PropertiesSubList";
import useSearchHistory from "../SearchHistory/useSearchHistory";
import CustomersSubList from "./CustomersSubList";
import { SearchCategory } from "../../types";
import Stack from "@mui/material/Stack";
import { FC } from "react";

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

    const width = { xs: 1, sm: properties && customers ? "50%" : 1 };

    return (
        <Stack>
            <Stack direction={{ xs: "column", sm: "row" }}>
                {properties ? (
                    <PropertiesSubList
                        width={width}
                        searchString={searchString}
                        onItemClick={addSearchHistoryItem}
                        sortBy="code"
                    />
                ) : null}

                {customers ? (
                    <CustomersSubList
                        width={width}
                        searchCategory={searchCategory}
                        searchString={searchString}
                        onItemClick={addSearchHistoryItem}
                    />
                ) : null}
            </Stack>

            {agreements ? <AgreementItems search={searchString} /> : null}
        </Stack>
    );
};

export default SearchResults;
