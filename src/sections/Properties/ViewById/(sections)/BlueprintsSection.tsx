import CarouselWithLightbox from "@/components/Carousel/WithLightbox";
import ICarouselImage from "@/components/Carousel/types";
import PanelWithQuickView from "../PanelWithQuickView";
import { useGetProperty } from "@/hooks/property";

const BlueprintsSection = () => {
    const { property } = useGetProperty();
    const { blueprints } = property || {};
    return (
        <PanelWithQuickView label="BlueprintsSection">
            <CarouselWithLightbox data={blueprints as ICarouselImage[]} />
        </PanelWithQuickView>
    );
};

export default BlueprintsSection;
