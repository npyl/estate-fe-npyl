import {
    useCallback,
    useRef,
    useState,
    MouseEvent,
    useLayoutEffect,
} from "react";
// @mui
import { Box, BoxProps, styled, SxProps, Theme } from "@mui/material";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
// components
import Carousel from "./carousel";
import CarouselArrowIndex from "./carousel/CarouselArrowIndex";
import { ImageRatio, LabeledImage } from "src/components/image";
import ICarouselImage from "./carousel/types";
import NoImageIcon from "@/assets/icons/no-image";
import WrapperWithRatio from "./image/WrapperWithRatio";

const StyledLinkOffIcon = styled(LinkOffOutlinedIcon)(({ theme }) => ({
    color: theme.palette.neutral?.[100],
    backgroundColor: "black",
    opacity: 0.5,
    borderRadius: "16px",
    fontSize: 25,
    position: "absolute",
    top: 5,
    right: 10,
    zIndex: 1,
}));

const BoxSx: SxProps<Theme> = {
    "& .slick-slide": {
        float: (theme) => (theme.direction === "rtl" ? "right" : "left"),
    },

    zIndex: 0,
    overflow: "hidden",
    position: "relative",

    // INFO: important:
    width: "100%",
    height: "100%",
};

// ----------------------------------------------------------------------

type Props = {
    initialIndex?: number;
    ratio?: string;
    data: ICarouselImage[];
    mainLabel?: string;
    onImageChange?: (newImage: ICarouselImage) => void;
    isActive?: boolean;
} & BoxProps;

// ----------------------------------------------------------------------

const CarouselSettings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
};

function CarouselSimple({
    data,
    initialIndex,
    onImageChange,
    mainLabel,
    ratio = "16/9",
    isActive,
    sx,
    ...props
}: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const carousel1 = useRef<Carousel | null>(null);

    const onBeforeChange = useCallback(
        (_: number, next: number) => setCurrentIndex(next),
        []
    );

    const onAfterChange = useCallback(
        (i: number) => onImageChange?.(data[i]),
        [data, onImageChange]
    );

    useLayoutEffect(() => {
        if (!initialIndex) return;
        carousel1.current?.slickGoTo(initialIndex, false);
    }, [initialIndex]);

    const handlePrev = useCallback((e: MouseEvent) => {
        e.preventDefault();
        carousel1.current?.slickPrev();
    }, []);
    const handleNext = useCallback((e: MouseEvent) => {
        e.preventDefault();
        carousel1.current?.slickNext();
    }, []);

    return (
        <Box sx={{ ...(BoxSx as any), ...sx }} {...props}>
            {!isActive ? <StyledLinkOffIcon /> : null}

            <Carousel
                {...CarouselSettings}
                beforeChange={onBeforeChange}
                afterChange={onAfterChange}
                ref={carousel1}
            >
                {data.map(({ id, title, url, hidden, thumbnail }) => (
                    <LabeledImage
                        key={id}
                        alt={title}
                        src={url || ""}
                        hidden={hidden}
                        label={mainLabel && thumbnail ? mainLabel : ""}
                        ratio={ratio! as ImageRatio}
                    />
                ))}

                {data.length === 0 ? (
                    <WrapperWithRatio ratio={ratio! as ImageRatio}>
                        <NoImageIcon height="100%" width="100%" />
                    </WrapperWithRatio>
                ) : null}
            </Carousel>

            {data.length > 1 ? (
                <CarouselArrowIndex
                    index={currentIndex}
                    total={data.length}
                    onNext={handleNext}
                    onPrevious={handlePrev}
                />
            ) : null}
        </Box>
    );
}

export default CarouselSimple;
