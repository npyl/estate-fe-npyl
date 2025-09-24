type TSorting = {
    sortBy: string;
    direction: "ASC" | "DESC";
};

type TSortByOption = {
    value: string;
    label: string;
    sorting: TSorting;
    icon: string;
};

type TSortByOptions = TSortByOption[];

export type { TSorting, TSortByOption, TSortByOptions };
