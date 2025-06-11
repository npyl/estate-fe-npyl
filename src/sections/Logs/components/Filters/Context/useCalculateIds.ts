import { INITIAL_STATE } from "./constants";
import _useCalculateIds from "@/sections/Filters/useCalculateIds";
import { Filters } from "./types";

const useCalculateIds = (filters: Filters) =>
    _useCalculateIds(INITIAL_STATE, filters);

export default useCalculateIds;
