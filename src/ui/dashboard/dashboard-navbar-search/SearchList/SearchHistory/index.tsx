import { List } from "@mui/material";
import useSearchHistory from "./useSearchHistory";
import getItem from "./getItem";
import { FC } from "react";

interface Props {
    onSelect: (v: string) => void;
}

const SearchHistory: FC<Props> = ({ onSelect }) => {
    const { searchHistory } = useSearchHistory();
    return <List>{searchHistory.map(getItem(onSelect))}</List>;
};

export default SearchHistory;
