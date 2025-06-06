export interface MatchResult {
    [key: string]: string;
}

export type SearchCategory =
    | "all"
    | "properties"
    | "customers"
    | "b2b"
    | "agreements";
