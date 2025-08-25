import useFilterStorage from "@/ui/Filters/useFilterStorage";
import { initialState } from "./constants";

const getStorageKey = (b2b: boolean) =>
    b2b ? "customerb2b-filters-key" : "customer-filters-key";

const useFilterState = (b2b: boolean) =>
    useFilterStorage(getStorageKey(b2b), initialState.filters);

export default useFilterState;
