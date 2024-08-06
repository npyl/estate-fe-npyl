import { useEffect, useRef, useState } from "react";
// @mui
import { Box } from "@mui/material";

import CarouselArrowIndex from "./carousel/CarouselArrowIndex";
import Carousel from "./carousel";
import Image from "src/components/image";

import Lightbox from "@/components/Lightbox";

import ICarouselImage from "./carousel/types";

// ----------------------------------------------------------------------

type Props = {
    data: ICarouselImage[];
};

// ----------------------------------------------------------------------

export default function CarouselWithLightbox({ data }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [nav1, setNav1] = useState<Carousel | undefined>(undefined);

    const carousel1 = useRef<Carousel | null>(null);

    // Lightbox
    const [clickedImageIndex, setClickedImageIndex] = useState(-1);
    const closeLightbox = () => setClickedImageIndex(-1);

    const carouselSettings1 = {
        dots: false,
        arrows: false,
        slidesToShow: data.length > 3 ? 3 : data.length,
        draggable: false,
        slidesToScroll: 1,
        adaptiveHeight: true,
        beforeChange: (current: number, next: number) => setCurrentIndex(next),
    };

    useEffect(() => {
        if (carousel1.current) {
            setNav1(carousel1.current);
        }
    }, []);

    const handlePrev = () => {
        carousel1.current?.slickPrev();
    };

    const handleNext = () => {
        carousel1.current?.slickNext();
    };

    const renderLargeImg = (
        <Box
            sx={{
                mb: 1,
                zIndex: 0,
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Carousel {...carouselSettings1} asNavFor={nav1} ref={carousel1}>
                {data.map(({ id, title, url }, index) => (
                    <Image
                        key={id}
                        alt={title}
                        src={url || ""}
                        ratio="16/9"
                        borderRadius={2}
                        padding={1}
                        paddingRight={index !== data.length - 1 ? 0 : 1}
                        onClick={() => setClickedImageIndex(index)}
                    />
                ))}
            </Carousel>

            <CarouselArrowIndex
                index={currentIndex}
                total={data.length}
                onNext={handleNext}
                onPrevious={handlePrev}
            />
        </Box>
    );

    return (
        <Box
            sx={{
                "& .slick-slide": {
                    float: (theme) =>
                        theme.direction === "rtl" ? "right" : "left",
                },
            }}
        >
            {renderLargeImg}

            {clickedImageIndex !== -1 ? (
                <Lightbox
                    open
                    images={data}
                    index={clickedImageIndex}
                    onClose={closeLightbox}
                />
            ) : null}
        </Box>
    );
}
