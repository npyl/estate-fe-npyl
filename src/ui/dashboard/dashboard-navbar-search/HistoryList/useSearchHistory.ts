import useLocalStorage from "@/hooks/useLocalStorage";
import { THistoryItem } from "./types";
import { useCallback } from "react";

const SEARCH_HISTORY_KEY = "search_history";

const useSearchHistory = () => {
    const [searchHistory, setSearchHistory] = useLocalStorage<THistoryItem[]>(
        SEARCH_HISTORY_KEY,
        []
    );
    const addSearchHistoryItem = useCallback(
        (term: string) =>
            setSearchHistory((old) => [
                ...old,
                { term, date: new Date().toISOString() },
            ]),
        []
    );
    return { searchHistory, setSearchHistory, addSearchHistoryItem } as const;
};

export default useSearchHistory;
