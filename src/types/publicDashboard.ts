import { IProperties } from "./properties";

export interface IView {
    date: string;
    parentCategories: Record<string, number>;
}

export interface IPublicDashboard {
    popularProperties: IProperties[];
    parentCategoryViews: IView[];
    propertyViews: IView[];
}
