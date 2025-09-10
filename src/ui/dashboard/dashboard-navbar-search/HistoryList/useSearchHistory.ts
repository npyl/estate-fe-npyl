import useLocalStorage from "@/hooks/useLocalStorage";
import { THistoryItem } from "./types";

const SEARCH_HISTORY_KEY = "search_history";

const useSearchHistory = () =>
    useLocalStorage<THistoryItem[]>(SEARCH_HISTORY_KEY, []);

export default useSearchHistory;
