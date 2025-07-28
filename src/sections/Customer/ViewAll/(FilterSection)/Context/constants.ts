import { ICustomerFilter } from "@/types/customer";

type Filters = {
    filters: ICustomerFilter;
    sorting: string;
};

const initialState: Filters = {
    filters: {
        labels: [],
        categories: [],
        parentCategories: [],
        leaser: false,
        lessor: false,
        buyer: false,
        seller: false,
        b2b: false,
        status: undefined,
        managerId: undefined,
        maxPrice: undefined,
        minPrice: undefined,
        minCovered: undefined,
        maxCovered: undefined,
        states: [],
    },
    sorting: "default",
};

export type { Filters };
export { initialState };
