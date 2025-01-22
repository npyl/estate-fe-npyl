import React from "react";
import { IProperties } from "src/types/properties";
import CarouselWithLightbox from "@/components/Carousel/WithLightbox";
import ICarouselImage from "@/components/Carousel/types";
import PanelWithQuickView from "../PanelWithQuickView";

interface BlueprintsSectionProps {
    data: IProperties;
}

const BlueprintsSection: React.FC<BlueprintsSectionProps> = ({
    data: { blueprints },
}) => (
    <PanelWithQuickView label="BlueprintsSection">
        <CarouselWithLightbox data={blueprints as ICarouselImage[]} />
    </PanelWithQuickView>
);

export default BlueprintsSection;
