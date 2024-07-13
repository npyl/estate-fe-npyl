import { TFileVariant } from "@/types/file";

export interface IPropertyAddFileParams<T> {
    id: number;
    variant: TFileVariant;
    body: T;
}

export interface IPropertyFileManipulation<T> {
    id: number;
    body: T;
}

export interface ReorderImagesWithSetImageVisibility {
    propertyId: number;
    imageKeys: string[];
    imageKey: string;
    hidden: boolean;
}

export interface IDeleteFileProps {
    propertyId: number;
    imageKey: string;
}

export interface BulkDeletePropertyImagesParams {
    propertyId: number;
    imageKeys: string[];
}

export interface BulkEditPropertyImagesParams {
    propertyId: number;
    body: {
        imageKeys: string[];
        hidden: boolean;
    };
}
