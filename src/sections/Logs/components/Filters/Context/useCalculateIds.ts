import { INITIAL_STATE } from "./constants";
import { useCalculateIds as _useCalculateIds } from "@/ui/Filters/useCalculateIds";
import { Filters } from "./types";

const useCalculateIds = (filters: Filters) =>
    _useCalculateIds<Filters>(INITIAL_STATE, filters);

export default useCalculateIds;
