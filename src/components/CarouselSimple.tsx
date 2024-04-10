import { useCallback, useEffect, useRef, useState, MouseEvent } from "react";
// @mui
import { Box } from "@mui/material";
// components
import Carousel from "./carousel";
import CarouselArrowIndex from "./carousel/CarouselArrowIndex";

import { ImageRatio, LabeledImage } from "src/components/image";
import ICarouselImage from "./carousel/types";

// ----------------------------------------------------------------------

type Props = {
    initialIndex?: number;
    ratio?: string;
    size?: {
        width: string;
        height: string;
    };
    data: ICarouselImage[];
    mainLabel?: string;
    onImageChange?: (newImage: ICarouselImage) => void;
    onImageClick?: () => void;
};

// ----------------------------------------------------------------------

export default function CarouselSimple({
    data,
    initialIndex,
    onImageChange,
    onImageClick,
    mainLabel,
    ratio = "16/9",
    size,
}: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [nav1, setNav1] = useState<Carousel | undefined>(undefined);

    const carousel1 = useRef<Carousel | null>(null);

    const carouselSettings1 = {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        draggable: false,
        slidesToScroll: 1,
        adaptiveHeight: true,
        beforeChange: (current: number, next: number) => setCurrentIndex(next),
        afterChange: (currentSlide: number) =>
            onImageChange && onImageChange(data[currentSlide]),
    };

    useEffect(() => {
        if (carousel1.current) {
            setNav1(carousel1.current);
        }
    }, []);

    useEffect(() => {
        if (!initialIndex) return;

        carousel1.current?.slickGoTo(initialIndex, false);
    }, [initialIndex]);

    const handlePrev = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        carousel1.current?.slickPrev();
    }, []);
    const handleNext = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        carousel1.current?.slickNext();
    }, []);

    const renderLargeImg = (
        <Box
            sx={{
                zIndex: 0,
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Box
                onClick={() => {
                    onImageClick && onImageClick();
                }}
            >
                <Carousel
                    {...carouselSettings1}
                    asNavFor={nav1}
                    ref={carousel1}
                >
                    {data.map(({ id, title, url, hidden }, index) => (
                        <LabeledImage
                            key={id}
                            alt={title}
                            src={url || ""}
                            hidden={hidden}
                            label={mainLabel && index === 0 ? mainLabel : ""}
                            onClick={() => {
                                onImageClick && onImageClick();
                            }}
                            size={size}
                            ratio={ratio! as ImageRatio}
                        />
                    ))}
                </Carousel>
            </Box>
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
        </Box>
    );
}
