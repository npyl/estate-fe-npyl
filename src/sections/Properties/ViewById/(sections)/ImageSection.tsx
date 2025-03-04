import ICarouselImage from "@/components/Carousel/types";
import CarouselWithLightbox from "@/components/Carousel/WithLightbox";
import PanelWithQuickView from "../PanelWithQuickView";
import { getBorderColor2 } from "@/theme/borderColor";
import { SxProps, Theme } from "@mui/material";
import { useGetProperty } from "@/hooks/property";

const toggleSx: SxProps<Theme> = {
    ".ToggleButton": {
        bgcolor: "background.paper",
        pb: 0.5,
        border: "1px solid",
        top: 5,
        right: 5,
        borderColor: getBorderColor2,
        boxShadow: 20,
        ":hover": {
            bgcolor: "background.paper",
        },
    },
};

const ImageSection = () => {
    const { property } = useGetProperty();
    const { active, images } = property || {};

    return (
        <PanelWithQuickView hideHeader label="ImageSection" toggleSx={toggleSx}>
            <CarouselWithLightbox
                isActive={active}
                data={images as ICarouselImage[]}
            />
        </PanelWithQuickView>
    );
};

export default ImageSection;
