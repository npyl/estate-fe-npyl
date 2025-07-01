import { TSorting } from "@/ui/Filters/SortBy/types";
import { BoardFiltersReq } from "@/types/tasks";

type TFilters = Omit<BoardFiltersReq, "search"> & {
    search: string; // INFO: required to avoid undefined as initial value
    sorting?: TSorting;
};

export type { TFilters };
