import { IEmailFilters } from "@/types/email";

const INITIAL_STATE: Required<IEmailFilters> = {
    search: "",
    from: "",
    to: [],
    propertyIds: [],
};

export { INITIAL_STATE };
