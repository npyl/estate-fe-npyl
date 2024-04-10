import { IProperties } from "./properties";

export type TTimeFrame =
    | "ALL_TIME"
    | "CUSTOM"
    | "DAY"
    | "MONTH"
    | "WEEK"
    | "YEAR";

export interface IView<T extends string = string> {
    date: string;
    parentCategories: Record<T, number>;
}

export interface IPublicDashboard {
    popularProperties: IProperties[];
    parentCategoryViews: IView[];
    propertyViews: IView[];
}
