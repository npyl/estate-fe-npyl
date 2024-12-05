import { FC, useState } from "react";
import Carousel, { CarouselProps } from "@/components/carousel";
import dynamic from "next/dynamic";
const Lightbox = dynamic(() => import("@/components/Lightbox"));

// ----------------------------------------------------------------------

const CarouselWithLightbox: FC<Omit<CarouselProps, "onImageClick">> = (
    props
) => {
    // Lightbox
    const [clickedImageIndex, setClickedImageIndex] = useState(-1);
    const closeLightbox = () => setClickedImageIndex(-1);

    return (
        <>
            <Carousel onImageClick={setClickedImageIndex} {...props} />

            {clickedImageIndex !== -1 ? (
                <Lightbox
                    open
                    images={props.data}
                    index={clickedImageIndex}
                    onClose={closeLightbox}
                />
            ) : null}
        </>
    );
};

export default CarouselWithLightbox;
