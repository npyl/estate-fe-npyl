import { IEmailFilters } from "@/types/email";
import { INITIAL_STATE } from "./constants";
import { useCalculateIds as _useCalculateIds } from "@/ui/Filters/useCalculateIds";

const useCalculateIds = (filters: IEmailFilters) =>
    _useCalculateIds<IEmailFilters>(INITIAL_STATE, filters);

export default useCalculateIds;
