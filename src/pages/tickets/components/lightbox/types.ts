import { ILightBoxProps } from "react-image-lightbox";

// ----------------------------------------------------------------------

export interface LightBoxProps extends ILightBoxProps {
    open: boolean;
    images: string[];
    photoIndex: number;
    mainSrc: string;
    setPhotoIndex: (index: number) => void;
    onCloseRequest: () => void;
}
