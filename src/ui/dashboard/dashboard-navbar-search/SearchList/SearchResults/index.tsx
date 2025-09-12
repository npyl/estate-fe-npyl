import AgreementItems from "./AgreementItems";
import PropertiesSubList from "./PropertiesSubList";
import useSearchHistory from "../SearchHistory/useSearchHistory";
import CustomersSubList from "./CustomersSubList";
import { SearchCategory } from "../../types";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";

interface Props {
    searchCategory: SearchCategory;
    searchString: string;
    onClose: VoidFunction;
}

const SearchResults: FC<Props> = ({
    searchCategory,
    searchString,
    onClose,
}) => {
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

    const onItemClick = useCallback((value: string) => {
        addSearchHistoryItem(value);
        onClose();
    }, []);

    return (
        <Stack spacing={1}>
            <Stack direction={{ xs: "column", sm: "row" }}>
                {properties ? (
                    <PropertiesSubList
                        width={width}
                        searchString={searchString}
                        onItemClick={onItemClick}
                        sortBy="code"
                    />
                ) : null}

                {customers ? (
                    <CustomersSubList
                        width={width}
                        searchCategory={searchCategory}
                        searchString={searchString}
                        onItemClick={onItemClick}
                    />
                ) : null}
            </Stack>

            {agreements ? <AgreementItems search={searchString} /> : null}
        </Stack>
    );
};

export default SearchResults;
