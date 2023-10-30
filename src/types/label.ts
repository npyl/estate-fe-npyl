export type LabelResourceType = "property" | "customer" | "document";

export interface ILabel {
    id: number;
    color: string;
    name: string;
}

export interface ILabelPOST {
    id?: number;
    color: string;
    name: string;
}

export interface ILabels {
    customerLabels: ILabel[];
    propertyLabels: ILabel[];
    documentLabels: ILabel[];
}
