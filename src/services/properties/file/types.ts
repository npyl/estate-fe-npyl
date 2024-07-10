export interface IPropertyAddFileParams<T> {
    id: number;
    variant: "image" | "blueprint" | "document";
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
export interface IDeleteImageProps extends IDeleteFileProps {
    newThumbnailKey: string;
}

export interface BulkDeletePropertyImagesParams {
    propertyId: number;
    imageKeys: string[];
    newThumbnailKey: string;
}
