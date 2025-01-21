import ICarouselImage from "@/components/Carousel/types";
import CarouselWithLightbox from "@/components/Carousel/WithLightbox";
import { IProperties } from "src/types/properties";

interface ImageSectionProps {
    data: IProperties;
}

const ImageSection: React.FC<ImageSectionProps> = ({
    data: { active, images },
}) => (
    <CarouselWithLightbox isActive={active} data={images as ICarouselImage[]} />
);

export default ImageSection;
