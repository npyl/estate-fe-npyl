import { IDemandFiltersPOST, IDemandPOST } from "@/types/demand";

const demandName = (name: keyof IDemandPOST, index: number) =>
    `demands.${index}.${name}` as const;

const filterName = (name: keyof IDemandFiltersPOST, index: number) =>
    `demands.${index}.filters.${name}` as const;

export { demandName, filterName };
