export interface IFilterOption {
    label: string;
    checked: boolean;
}

export interface IFilterOptions {
    [key: string]: IFilterOption;
}
