import { RootState } from "@/store";
import { IPropertyFilterCounters } from "@/types/properties";

type SelectorType = ({ filters }: RootState) => string[];
type SetterType = (payload: any) => {
    payload: any;
    type: any;
};

type TOptionMapper = (
    optionKey: string,
    counters?: IPropertyFilterCounters
) => number;

export type { SelectorType, SetterType, TOptionMapper };
