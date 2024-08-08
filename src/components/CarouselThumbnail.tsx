import { useEffect, useRef, useState } from "react";
// @mui
import { Box, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

// utils
import { bgGradient } from "src/utils/cssStyles";
// components
import Carousel, { CarouselArrowIndex } from "@/components/carousel";
import Image from "@/components/image";

import Lightbox from "./Lightbox";

import ICarouselImage from "./carousel/types";
import PreviewImage from "./image/PreviewImage";

// ----------------------------------------------------------------------

const THUMB_SIZE = 150;
const THUMB_SIZEy = 100;

type Props = {
    data: ICarouselImage[];
};

type StyledThumbnailsContainerProps = {
    length: number;
};

const StyledThumbnailsContainer = styled("div", {
    shouldForwardProp: (prop) => prop !== "length",
})<StyledThumbnailsContainerProps>(({ length, theme }) => ({
    margin: theme.spacing(0, "auto"),

    position: "relative",

    "& .slick-slide": {
        opacity: 0.48,
        "&.slick-current": {
            opacity: 1,
        },
        "& > div": {
            padding: theme.spacing(0, 0.15),
            paddingBottom: 0.5,
        },
    },

    ...(length === 1 && {
        maxWidth: THUMB_SIZE * 1 + 16,
    }),
    ...(length === 2 && {
        maxWidth: THUMB_SIZE * 2 + 32,
    }),
    ...((length === 3 || length === 4) && {
        maxWidth: THUMB_SIZE * 3 + 48,
    }),
    ...(length >= 5 && {
        maxWidth: THUMB_SIZE * length,
    }),
    ...(length > 2 && {
        "&:before, &:after": {
            ...bgGradient({
                direction: "to left",
                startColor: `${alpha(theme.palette.background.default, 0)} 0%`,
                endColor: `${theme.palette.background.default} 100%`,
            }),
            top: 0,
            zIndex: 9,
            content: "''",
            height: "100%",
            position: "absolute",
            width: (THUMB_SIZE * 2) / 3,
        },
        "&:after": {
            right: 0,
            transform: "scaleX(-1)",
        },
    }),
}));

// ----------------------------------------------------------------------

export default function CarouselThumbnail({ data }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Lightbox
    const [clickedImageIndex, setClickedImageIndex] = useState(-1);
    const closeLightbox = () => setClickedImageIndex(-1);

    const [nav1, setNav1] = useState<Carousel | undefined>(undefined);
    const [nav2, setNav2] = useState<Carousel | undefined>(undefined);

    const carousel1 = useRef<Carousel | null>(null);
    const carousel2 = useRef<Carousel | null>(null);

    const carouselSettings1 = {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        draggable: false,
        slidesToScroll: 1,
        adaptiveHeight: true,
        beforeChange: (current: number, next: number) => setCurrentIndex(next),
    };

    const carouselSettings2 = {
        dots: false,
        arrows: false,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        variableWidth: true,
        centerPadding: "0px",
        slidesToShow: data.length > 1 ? 1 : data.length,
    };

    useEffect(() => {
        if (carousel1.current) {
            setNav1(carousel1.current);
        }
        if (carousel2.current) {
            setNav2(carousel2.current);
        }
    }, []);

    const handlePrev = () => {
        carousel2.current?.slickPrev();
    };

    const handleNext = () => {
        carousel2.current?.slickNext();
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
            <Carousel {...carouselSettings1} asNavFor={nav2} ref={carousel1}>
                {data.map(({ id, title, url }, index) =>
                    url ? (
                        <Image
                            key={id}
                            alt={title}
                            src={url}
                            ratio="16/9"
                            onClick={() => setClickedImageIndex(index)}
                        />
                    ) : (
                        // eslint-disable-next-line react/jsx-key
                        <PreviewImage />
                    )
                )}
            </Carousel>

            <CarouselArrowIndex
                index={currentIndex}
                total={data.length}
                onNext={handleNext}
                onPrevious={handlePrev}
            />
        </Box>
    );

    const renderThumbnails = (
        <Box sx={{ overflowX: "hidden", maxWidth: "100%" }}>
            <StyledThumbnailsContainer length={data.length}>
                <Carousel
                    {...carouselSettings2}
                    asNavFor={nav1}
                    ref={carousel2}
                >
                    {data.map(({ id, title, url }, index) =>
                        url ? (
                            <Image
                                key={id}
                                alt={title}
                                src={url}
                                sx={{
                                    width: THUMB_SIZE,
                                    height: THUMB_SIZEy,
                                    borderRadius: 0,
                                    cursor: "pointer",
                                    ...(currentIndex === index && {
                                        border: (theme) =>
                                            `solid 2px ${theme.palette.primary.main}`,
                                    }),
                                }}
                            />
                        ) : (
                            // eslint-disable-next-line react/jsx-key
                            <PreviewImage
                                sx={{
                                    width: THUMB_SIZE,
                                    height: THUMB_SIZEy,
                                    borderRadius: 0,
                                    cursor: "pointer",
                                    ...(currentIndex === index && {
                                        border: (theme) =>
                                            `solid 2px ${theme.palette.primary.main}`,
                                    }),
                                }}
                            />
                        )
                    )}
                </Carousel>
            </StyledThumbnailsContainer>
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
            <Grid>{renderLargeImg}</Grid>
            <Grid>{renderThumbnails}</Grid>

            {clickedImageIndex !== -1 ? (
                <Lightbox
                    open
                    index={clickedImageIndex}
                    images={data}
                    onClose={closeLightbox}
                />
            ) : null}
        </Box>
    );
}
