export type TSorting = {
    sortBy: string;
    direction: "ASC" | "DESC";
};

export type TSortByOptions = {
    value: string;
    label: string;
    sorting: TSorting;
    icon: string;
}[];
