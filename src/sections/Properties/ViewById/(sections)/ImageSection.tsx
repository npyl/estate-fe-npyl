import ICarouselImage from "@/components/Carousel/types";
import CarouselWithLightbox from "@/components/Carousel/WithLightbox";
import { IProperties } from "src/types/properties";
import PanelWithQuickView from "../PanelWithQuickView";
import { getBorderColor2 } from "@/theme/borderColor";
import { SxProps, Theme } from "@mui/material";

const toggleSx: SxProps<Theme> = {
    ".ToggleButton": {
        bgcolor: "background.paper",
        pb: 0.5,
        border: "1px solid",
        top: 5,
        right: 5,
        borderColor: getBorderColor2,
        boxShadow: 20,
    },
};

interface ImageSectionProps {
    data: IProperties;
}

const ImageSection: React.FC<ImageSectionProps> = ({
    data: { active, images },
}) => (
    <PanelWithQuickView hideHeader label="ImageSection" toggleSx={toggleSx}>
        <CarouselWithLightbox
            isActive={active}
            data={images as ICarouselImage[]}
        />
    </PanelWithQuickView>
);

export default ImageSection;
