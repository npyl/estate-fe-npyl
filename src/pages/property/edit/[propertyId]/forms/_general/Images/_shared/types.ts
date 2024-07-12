import { IPropertyImage } from "@/types/file";

export interface ImageItemProps {
    image: IPropertyImage;
    onImageClick: (key: string) => void;
}
