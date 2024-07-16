import { ILabel } from "./label";

export type TFileVariant = "image" | "blueprint" | "document" | "OTHER";

export type UploadProgress = {
    key: string;
    p: number;
};

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
    thumbnail: boolean;
}

export interface IPropertyDocument extends IPropertyFile {
    labels: ILabel[];
}

export interface IPropertyBlueprint extends IPropertyFile {}

export interface IPropertyImageReq extends Partial<IPropertyImage> {}

export interface IPropertyDocumentPOST {
    id?: number;
    key?: string;
    filename: string;
    contentType: string;
}

export interface IPropertyBlueprintPOST extends IPropertyDocumentPOST {}
