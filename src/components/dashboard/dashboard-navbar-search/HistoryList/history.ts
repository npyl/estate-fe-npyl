const SEARCH_HISTORY_KEY = "search_history";

interface SearchHistoryItem {
    term: string;
    date: string;
}

// Get search history from local storage
const getSearchHistory = (): SearchHistoryItem[] => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
};

const addSearchHistory = (searchTerm: string) => {
    const history = getSearchHistory();

    // Check if term already exists and remove if found
    const existingIndex = history.findIndex((item) => item.term === searchTerm);
    if (existingIndex !== -1) {
        history.splice(existingIndex, 1); // Remove existing entry
    }

    // Add entry with timestamp
    history.unshift({ term: searchTerm, date: new Date().toISOString() });

    if (history.length > 10) {
        history.pop();
    }

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
};

const removeSearchHistoryItem = (searchTerm: string) => {
    const history = getSearchHistory().filter(
        (item) => item.term !== searchTerm
    );
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    return history;
};

export { getSearchHistory, addSearchHistory, removeSearchHistoryItem };
