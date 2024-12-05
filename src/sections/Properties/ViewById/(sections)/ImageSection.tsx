import ICarouselImage from "@/components/Carousel/types";
import CarouselWithLightbox from "@/components/carousel/WithLightbox";
import { IProperties } from "src/types/properties";

interface ImageSectionProps {
    data: IProperties;
}

const ImageSection: React.FC<ImageSectionProps> = ({ data: { images } }) => (
    <CarouselWithLightbox data={images as ICarouselImage[]} />
);

export default ImageSection;
