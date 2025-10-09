import { FC } from "react";
import useCarouselImages, { TImage } from "./useCarouselImages";
import CarouselSimple, {
    CarouselProps as CarouselSimpleProps,
} from "@/components/Carousel";

interface CarouselProps extends Omit<CarouselSimpleProps, "data"> {
    images: TImage[];
}

const Carousel: FC<CarouselProps> = ({ images, ...props }) => {
    const data = useCarouselImages(images);
    return (
        <CarouselSimple ratio="4/3" borderRadius={2} data={data} {...props} />
    );
};

export default Carousel;
