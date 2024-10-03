import { RootState } from "@/store";

type SelectorType = ({ filters }: RootState) => string[];
type SetterType = (payload: any) => {
    payload: any;
    type: any;
};

export type { SelectorType, SetterType };
