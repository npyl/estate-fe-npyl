import { ILogFilterPOST } from "@/types/logs";

interface Filters extends ILogFilterPOST {
    [key: string]: any;
}

export type { Filters };
