import CarouselThumbnail from "src/components/CarouselThumbnail";
import ICarouselImage from "src/components/carousel/types";
import { IProperties } from "src/types/properties";

interface ImageSectionProps {
    data: IProperties;
}

const ImageSection: React.FC<ImageSectionProps> = ({ data: { images } }) => {
    if (images.length === 0) return null;
    return <CarouselThumbnail data={images as ICarouselImage[]} />;
};

export default ImageSection;
