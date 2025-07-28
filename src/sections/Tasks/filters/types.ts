import { BoardFiltersReq } from "@/types/tasks";

type TFilters = Omit<BoardFiltersReq, "search"> & {
    search: string; // INFO: required to avoid undefined as initial value
};

export type { TFilters };
