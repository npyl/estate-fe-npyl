import { ICustomerFilter } from "@/types/customer";
import { Filters } from "./constants";

type TSetters = {
    setStatus: (status?: number) => void;
    setLeaser: (leaser: boolean) => void;
    setLessor: (lessor: boolean) => void;
    setSeller: (seller: boolean) => void;
    setBuyer: (buyer: boolean) => void;
    setManagerId: (managerId?: number) => void;
    setLabels: (labels: any[]) => void;
    setCategories: (categories: any[]) => void;
    setParentCategories: (parentCategories: any[]) => void;
    setMaxPrice: (maxPrice: any) => void;
    setMinPrice: (minPrice: any) => void;
    setMinArea: (minArea: any) => void;
    setMaxArea: (maxArea: any) => void;
    setStates: (states: any[]) => void;
    setSorting: (sorting: string) => void;
    deleteFilter: (key: keyof ICustomerFilter) => void;
    resetState: () => void;
};

type FiltersState = Filters & TSetters;

export type { FiltersState };
