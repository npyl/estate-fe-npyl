import { ILabel } from "./label";

export interface IFileResponse {
    key: string;
    url: string; // amazon to PUT image
    cdnUrl: string; // where image **WILL** be downloadable from when PUT finishes
}

export interface IPropertyImagePOST {
    id?: number;
    filename?: string;
    size?: number;
    contentType?: string;
    hidden?: boolean;
    description?: string;
    title?: string;
    key?: string;
}

export interface IPropertyImage {
    id: number;
    hidden: boolean;
    description: string;
    title: string;
    orderNumber: number;
    url: string | null;
    key: string;
    thumbnail: boolean;
    filename: string;
}

export interface IPropertyDocument {
    id: number;
    url: string | null;
    key: string;
    filename: string;
    labels: ILabel[];
}

export interface IPropertyBlueprint {
    id: number;
    url: string | null;
    filename: string;
    key: string;
}

export interface IPropertyDocumentPOST {
    id?: number;
    key?: string;
    filename: string;
    contentType: string;
}

export interface IPropertyBlueprintPOST extends IPropertyDocumentPOST {}

export interface IFileModel {
    filename: string;
    contentType: string;
    url: string;
}
