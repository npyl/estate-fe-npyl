const SEARCH_HISTORY_KEY = "search_history";

const getSearchHistory = (): string[] => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parseSafe(history) || [] : [];
};

const addSearchHistory = (searchTerm: string) => {
    const history = getSearchHistory();
    if (!history.includes(searchTerm)) {
        history.unshift(searchTerm); // Add to the beginning of the list
        if (history.length > 10) {
            // Limit the history to 10 items
            history.pop();
        }
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    }
};

const removeSearchHistoryItem = (searchTerm: string) => {
    const history = getSearchHistory();
    const updatedHistory = history.filter((item) => item !== searchTerm);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
};

export { getSearchHistory, addSearchHistory, removeSearchHistoryItem };
