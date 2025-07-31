import { ICustomerFilter } from "@/types/customer";
import { Filters } from "./constants";

type TSetters = {
    setStatus: (status?: number) => void;
    setLeaser: (leaser: boolean) => void;
    setLessor: (lessor: boolean) => void;
    setSeller: (seller: boolean) => void;
    setBuyer: (buyer: boolean) => void;
    setManagerId: (managerId?: number) => void;
    setLabels: (labels: number[]) => void;
    setCategories: (categories: string[]) => void;
    setParentCategories: (parentCategories: string[]) => void;
    setMaxPrice: (maxPrice?: number) => void;
    setMinPrice: (minPrice?: number) => void;
    setMinArea: (minArea?: any) => void;
    setMaxArea: (maxArea?: number) => void;
    setStates: (states: string[]) => void;
    setSorting: (sorting: string) => void;
    setB2B: (b2b?: boolean) => void;
    deleteFilter: (key: keyof ICustomerFilter) => void;
    resetState: () => void;
};

type FiltersState = Filters & TSetters;

export type { FiltersState };
