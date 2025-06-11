import { Filters } from "./types";

const INITIAL_STATE: Required<Filters> = {
    resources: [],
    actions: [],
    users: [],
    search: "",
    fromDate: "",
    toDate: "",
    customersIds: [],
    propertiesIds: [],
};

export { INITIAL_STATE };
