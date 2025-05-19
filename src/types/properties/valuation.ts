import { IPropertyResultResponse } from "@/types/properties";

interface IValuationRes {
    minPrice: number;
    averagePrice: number;
    maxPrice: number;
    propertyMinPrice: IPropertyResultResponse;
    propertyMaxPrice: IPropertyResultResponse;

    minArea: number;
    averageArea: number;
    maxArea: number;
    propertyMinArea: IPropertyResultResponse;
    propertyMaxArea: IPropertyResultResponse;
}

export type { IValuationRes };
