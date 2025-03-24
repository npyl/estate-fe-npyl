import { IPropertyFilterCounters } from "@/types/properties";

type SetterType = (payload: any) => void;

type TOptionMapper = (
    optionKey: string,
    counters?: IPropertyFilterCounters
) => number;

export type { SetterType, TOptionMapper };
