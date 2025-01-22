import ICarouselImage from "@/components/Carousel/types";
import CarouselWithLightbox from "@/components/Carousel/WithLightbox";
import { IProperties } from "src/types/properties";
import PanelWithQuickView from "../PanelWithQuickView";

interface ImageSectionProps {
    data: IProperties;
}

const ImageSection: React.FC<ImageSectionProps> = ({
    data: { active, images },
}) => (
    <PanelWithQuickView label={ImageSection.name}>
        <CarouselWithLightbox
            isActive={active}
            data={images as ICarouselImage[]}
        />
    </PanelWithQuickView>
);

export default ImageSection;
