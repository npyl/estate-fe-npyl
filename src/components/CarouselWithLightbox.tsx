import { useEffect, useRef, useState } from "react";
// @mui
import { Box } from "@mui/material";

import CarouselArrowIndex from "./carousel/CarouselArrowIndex";
import Carousel from "./carousel";
import Image from "src/components/image";

import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";

// INFO: This is a custom implementation of yet-another-react-lightbox/plugins/fullscreen that triggers the events: fullscreen and fullscreenExited
import Fullscreen from "./lightbox-plugins/fullscreen";
import HideGallery from "./lightbox-plugins/hideGallery";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";

import { FullscreenRef } from "yet-another-react-lightbox";
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

    const [galleryOpen, setGalleryOpen] = useState(false);

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
                        onClick={() => setGalleryOpen(true)}
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

    const _images = data.map((item, index) => {
        return { src: item.url || "" };
    });

    const fullscreenRef = useRef<FullscreenRef>(null);
    const thumbnailsRef = useRef<ThumbnailsRef>(null);

    const initialPluginList = [
        Captions,
        Fullscreen,
        Thumbnails,
        Video,
        Zoom,
        Counter,
    ];

    const pluginListWithHideGallery = [
        Captions,
        Fullscreen,
        Thumbnails,
        Video,
        Zoom,
        Counter,
        HideGallery,
    ];

    const [plugins, setPlugins] = useState(initialPluginList);

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

            <Lightbox
                open={galleryOpen}
                close={() => setGalleryOpen(false)}
                slides={_images}
                plugins={plugins}
                carousel={{ finite: true }}
                fullscreen={{ ref: fullscreenRef }}
                thumbnails={{ ref: thumbnailsRef }}
                on={{
                    fullscreen() {
                        // add HideGallery to the plugins
                        setPlugins(pluginListWithHideGallery);
                    },
                    fullscreenExit() {
                        // remove HideGallery
                        setPlugins(initialPluginList);
                    },

                    hideGalleryEntered() {
                        thumbnailsRef.current?.hide();
                    },
                    hideGalleryExited() {
                        thumbnailsRef.current?.show();
                    },
                }}
            />
        </Box>
    );
}
