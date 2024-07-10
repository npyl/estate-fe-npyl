import { ILabel } from "./label";

// ----------------------------------------------------------------------------------------
// Used when calling BE (See notion.so 1st. step)
// ----------------------------------------------------------------------------------------

export interface IPropertyFileReq {
    contentType: string;
    filename: string;
    size: number;
}

export interface IPropertyFileRes {
    key: string;
    url: string; // amazon to PUT image
    cdnUrl: string; // where image **WILL** be downloadable from when PUT finishes
}

// ----------------------------------------------------------------------------------------

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

interface IPropertyFile {
    id: number;
    url: string | null;
    key: string;
    filename: string;
}

export interface IPropertyImage extends IPropertyFile {
    hidden: boolean;
    description: string;
    title: string;
    orderNumber: number;
    thumbnail: boolean;
}

export interface IPropertyDocument extends IPropertyFile {
    labels: ILabel[];
}

export interface IPropertyBlueprint extends IPropertyFile {}

export interface IPropertyDocumentPOST {
    id?: number;
    key?: string;
    filename: string;
    contentType: string;
}

export interface IPropertyBlueprintPOST extends IPropertyDocumentPOST {}
