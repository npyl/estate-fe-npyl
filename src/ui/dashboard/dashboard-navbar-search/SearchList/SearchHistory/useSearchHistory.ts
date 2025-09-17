import useLocalStorage from "@/hooks/useLocalStorage";
import { THistoryItem } from "./types";
import { useCallback } from "react";
import uuidv4 from "@/utils/uuidv4";

const SEARCH_HISTORY_KEY = "search_history";

const doAddSearchHistoryItem = (term: string) => (old: THistoryItem[]) => {
    const newItems = [...old];

    // INFO: only keep a history of 10 items
    if (newItems.length + 1 === 10) newItems.pop();

    return [
        ...newItems,
        { id: uuidv4(), term, date: new Date().toISOString() },
    ];
};

const doRemoveSearchHistoryItem = (id: string) => (old: THistoryItem[]) =>
    old.filter(({ id: _id }) => _id !== id);

const useSearchHistory = () => {
    const [searchHistory, setSearchHistory] = useLocalStorage<THistoryItem[]>(
        SEARCH_HISTORY_KEY,
        []
    );
    const addSearchHistoryItem = useCallback(
        (term: string) => setSearchHistory(doAddSearchHistoryItem(term)),
        []
    );

    const removeSearchHistoryItem = useCallback(
        (id: string) => setSearchHistory(doRemoveSearchHistoryItem(id)),
        []
    );

    return {
        searchHistory,
        addSearchHistoryItem,
        removeSearchHistoryItem,
    } as const;
};

export default useSearchHistory;
