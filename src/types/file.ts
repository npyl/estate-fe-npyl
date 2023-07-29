export interface IFileResponse {
    key: string;
    url: string; // amazon to PUT image
    cdnUrl: string; // where image **WILL** be downloadable from when PUT finishes
}

export interface IPropertyImagePOST {
    id?: number;
    filename?: string;
    contentType?: string;
    hidden?: boolean;
    description?: string;
    title?: string;
    orderNumber?: number;
    key?: string;
    thumbnail?: boolean;
}

export interface IPropertyImage {
    id: number;
    hidden: boolean;
    description: string;
    title: string;
    orderNumber: number;
    url: string;
    key: string;
    thumbnail: boolean;
}

export interface IPropertyDocument {
    id: number;
    url: string;
    key: string;
}

export interface IPropertyDocumentPOST {
    id?: number;
    key?: string;
    filename: string;
    contentType: string;
}

export interface IPropertyBlueprint extends IPropertyDocument {}
export interface IExtendedPropertyBlueprint extends IPropertyBlueprint {
    filename: string;
}
export interface IPropertyBlueprintPOST extends IPropertyDocumentPOST {}

export interface IFileModel {
    filename: string;
    contentType: string;
    url: string;
}
