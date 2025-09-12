import useLocalStorage from "@/hooks/useLocalStorage";
import { THistoryItem } from "./types";
import { useCallback } from "react";

const SEARCH_HISTORY_KEY = "search_history";

const doAddSearchHistoryItem = (term: string) => (old: THistoryItem[]) => {
    const newItems = [...old];

    // INFO: only keep a history of 10 items
    if (newItems.length + 1 === 10) newItems.pop();

    return [...newItems, { term, date: new Date().toISOString() }];
};

const useSearchHistory = () => {
    const [searchHistory, setSearchHistory] = useLocalStorage<THistoryItem[]>(
        SEARCH_HISTORY_KEY,
        []
    );
    const addSearchHistoryItem = useCallback(
        (term: string) => setSearchHistory(doAddSearchHistoryItem(term)),
        []
    );
    return { searchHistory, setSearchHistory, addSearchHistoryItem } as const;
};

export default useSearchHistory;
