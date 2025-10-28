import { StateType } from "./BulkEdit/types";

const defaultValues: StateType = {
    managerId: "",
    ownerId: "",
    zipCode: "",
    area: "",
    labels: [],
    bedrooms: "",
    state: "",
    exclusive: false,
    publicSites: [],
    integrations: [],
    extras: [],
};

export { defaultValues };
