import {
    useCallback,
    useRef,
    useState,
    MouseEvent,
    useLayoutEffect,
    FC,
} from "react";
// @mui
import { Box, BoxProps, styled, SxProps, Theme } from "@mui/material";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
// components
import Slick from "react-slick";
import CarouselArrowIndex from "./CarouselArrowIndex";
import { ImageRatio, LabeledImage } from "@/components/image";
import ICarouselImage from "./types";
import NoImageIcon from "@/assets/icons/no-image";
import WrapperWithRatio from "@/components/image/Image/BaseImage/WrapperWithRatio";

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

type CarouselProps = {
    initialIndex?: number;
    ratio?: string;
    data: ICarouselImage[];
    mainLabel?: string;
    isActive?: boolean;
    onImageChange?: (newImage: ICarouselImage) => void;
    onImageClick?: (i: number) => void;
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

const Carousel: FC<CarouselProps> = ({
    data,
    initialIndex,
    mainLabel,
    ratio = "16/9",
    isActive,
    sx,
    onImageChange,
    onImageClick,
    ...props
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const carousel1 = useRef<Slick | null>(null);

    // INFO: isActive:
    // when false, we need to show indicator (unpublished)
    // when undefined, it means we are on a view that doesn't need to show indicator (we don't care)
    // when true, we don't show indicator (published)
    const isNotPublished = isActive !== undefined && isActive === false;

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
        <Box sx={{ ...BoxSx, ...sx }} {...props}>
            {isNotPublished ? <StyledLinkOffIcon /> : null}

            <Slick
                {...CarouselSettings}
                beforeChange={onBeforeChange}
                afterChange={onAfterChange}
                ref={carousel1}
            >
                {data.map(({ id, title, url, hidden, thumbnail }, index) => (
                    <LabeledImage
                        key={id}
                        alt={title}
                        src={url || ""}
                        hidden={hidden}
                        label={mainLabel && thumbnail ? mainLabel : ""}
                        ratio={ratio! as ImageRatio}
                        onClick={() => onImageClick?.(index)}
                    />
                ))}

                {data.length === 0 ? (
                    <WrapperWithRatio ratio={ratio! as ImageRatio}>
                        <NoImageIcon height="100%" width="100%" />
                    </WrapperWithRatio>
                ) : null}
            </Slick>

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
};

export type { CarouselProps };
export default Carousel;
