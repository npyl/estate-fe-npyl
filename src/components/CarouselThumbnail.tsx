import { useEffect, useRef, useState } from "react";
// @mui
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Tab,
    Tabs,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

// utils
import { bgGradient } from "src/utils/cssStyles";
// components
import Carousel, { CarouselArrowIndex } from "src/components/carousel";
import Image, { LabeledImage } from "src/components/image";

import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

// INFO: This is a custom implementation of yet-another-react-lightbox/plugins/fullscreen that triggers the events: fullscreen and fullscreenExited
import Fullscreen from "./lightbox-plugins/fullscreen";
import HideGallery from "./lightbox-plugins/hideGallery";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import { useRouter } from "next/router";
import { useLazyDownloadImagesQuery } from "src/services/exports";
import { FullscreenRef } from "yet-another-react-lightbox";
import { CloseIcon } from "yet-another-react-lightbox/core";
import ICarouselImage from "./carousel/types";
import PreviewImage from "./image/PreviewImage";
import { display } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
    const [clickedImageIndex, setClickedImageIndex] = useState(0);
    const [nav1, setNav1] = useState<Carousel | undefined>(undefined);

    const [nav2, setNav2] = useState<Carousel | undefined>(undefined);

    const carousel1 = useRef<Carousel | null>(null);

    const carousel2 = useRef<Carousel | null>(null);

    const [galleryOpen, setGalleryOpen] = useState(false);

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
                            onClick={() => {
                                setClickedImageIndex(index);
                                setGalleryOpen(true);
                            }}
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
                                disabledEffect
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

    const _images = data.map((item) => {
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
            <Grid>{renderLargeImg}</Grid>
            <Grid>{renderThumbnails}</Grid>

            <Lightbox
                open={galleryOpen}
                close={() => setGalleryOpen(false)}
                slides={_images
                    .slice(clickedImageIndex)
                    .concat(_images.slice(0, clickedImageIndex))} // Re-order images so clicked image is first
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

const downloadBlob = (blob: Blob, hidden: boolean): void => {
    const filename = hidden ? "AllImages.zip" : "PublicImages.zip";

    // Convert the blob to a URL
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element and attach the blob URL to it
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = filename;

    // Append the anchor to the document and trigger a click on it
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up by removing the anchor and revoking the blob URL
    document.body.removeChild(anchor);
    URL.revokeObjectURL(blobUrl);
};

///////////////////////////////// only Photos
export function OnlyPhotosCarousel({ data }: Props) {
    const router = useRouter();
    const { propertyId } = router.query;
    const [loading, setLoading] = useState(false);
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

    const [nav1, setNav1] = useState<Carousel | undefined>(undefined);
    const [nav2, setNav2] = useState<Carousel | undefined>(undefined);

    const [clickedImageIndex, setClickedImageIndex] = useState(0);

    const carousel1 = useRef<Carousel | null>(null);
    const carousel2 = useRef<Carousel | null>(null);

    const [galleryOpen, setGalleryOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const [plugins, setPlugins] = useState(initialPluginList);

    const fullscreenRef = useRef<FullscreenRef>(null);
    const thumbnailsRef = useRef<ThumbnailsRef>(null);

    const [downloadZip] = useLazyDownloadImagesQuery();

    useEffect(() => {
        if (carousel1.current) {
            setNav1(carousel1.current);
        }
        if (carousel2.current) {
            setNav2(carousel2.current);
        }
    }, []);

    const _images = data.map((item) => {
        return { src: item.url || "" };
    });

    const handleExport = async (hidden: boolean) => {
        setLoading(true);
        downloadZip({
            propertyId: +propertyId!,
            hidden,
        })
            .unwrap()
            .then((e) => {
                downloadBlob(e, hidden);
                setLoading(false);
            });
    };

    const handleDownload = () => {
        setOpenDialog(true);
    };

    const [selectedTab, setSelectedTab] = useState(0);
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const renderAllImages = (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(5, 1fr)",
                gap: "16px",
                mb: 1,
                zIndex: 0,
                overflow: "hidden",
                position: "relative",
            }}
        >
            {data.map(
                (
                    item,
                    index // Here is the inclusion of the index
                ) =>
                    item.url ? (
                        <LabeledImage
                            key={item.id}
                            hidden={item.hidden}
                            alt={item.title}
                            src={item.url}
                            ratio="16/9"
                            onClick={() => {
                                setClickedImageIndex(index);
                                setGalleryOpen(true);
                            }}
                        />
                    ) : (
                        // eslint-disable-next-line react/jsx-key
                        <PreviewImage />
                    )
            )}
        </Box>
    );
    const renderPublicImages = (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(5, 1fr)",
                gap: "16px",
                mb: 1,
                zIndex: 0,
                overflow: "hidden",
                position: "relative",
            }}
        >
            {data
                .filter((image) => !image.hidden)
                .map(
                    (
                        item,
                        index // Here is the inclusion of the index
                    ) =>
                        item.url ? (
                            <Image
                                key={item.id}
                                alt={item.title}
                                src={item.url}
                                ratio="16/9"
                                onClick={() => {
                                    setClickedImageIndex(index);
                                    setGalleryOpen(true);
                                }}
                            />
                        ) : (
                            // eslint-disable-next-line react/jsx-key
                            <PreviewImage />
                        )
                )}
        </Box>
    );
    const renderPrivateImages = (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: isMobile
                    ? "repeat(2, 1fr)"
                    : "repeat(5, 1fr)",
                gap: "16px",
                mb: 1,
                zIndex: 0,
                overflow: "hidden",
                position: "relative",
            }}
        >
            {data
                .filter((image) => image.hidden)
                .map(
                    (
                        item,
                        index // Here is the inclusion of the index
                    ) =>
                        item.url ? (
                            <Image
                                key={item.id}
                                alt={item.title}
                                src={item.url}
                                ratio="16/9"
                                onClick={() => {
                                    setClickedImageIndex(index);
                                    setGalleryOpen(true);
                                }}
                            />
                        ) : (
                            // eslint-disable-next-line react/jsx-key
                            <PreviewImage />
                        )
                )}
        </Box>
    );
    const handleTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: number
    ) => {
        setSelectedTab(newValue);
    };

    return (
        <Box
            sx={{
                "& .slick-slide": {
                    float: (theme) =>
                        theme.direction === "rtl" ? "right" : "left",
                },
            }}
        >
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="fullWidth"
            >
                <Tab label="All Photos" />
                <Tab label="Public Photos" />
                <Tab label="Private Photos" />
            </Tabs>

            <Grid>
                {selectedTab === 0 && renderAllImages}
                {selectedTab === 1 && renderPublicImages}
                {selectedTab === 2 && renderPrivateImages}
            </Grid>
            <Divider></Divider>
            <Button
                sx={{
                    position: isMobile ? "static" : "absolute",
                    left: isMobile ? "0" : "90%",
                    width: isMobile ? "100%" : "auto",
                }}
                onClick={handleDownload}
            >
                Download images
            </Button>
            <Lightbox
                open={galleryOpen}
                close={() => setGalleryOpen(false)}
                slides={_images
                    .slice(clickedImageIndex)
                    .concat(_images.slice(0, clickedImageIndex))} // Re-order images so clicked image is first
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
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box
                    style={{
                        position: "absolute",
                        top: -1,
                        left: 363,
                        paddingTop: "3px",
                    }}
                >
                    <Button
                        color="primary"
                        onClick={() => setOpenDialog(false)}
                    >
                        <CloseIcon />
                    </Button>
                </Box>
                <DialogTitle
                    sx={{
                        paddingTop: "30px",
                    }}
                    id="alert-dialog-title"
                >
                    {"Choose download option"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please select which photos you want to download.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {loading && <CircularProgress size={"24px"} />}
                    <Button
                        color="primary"
                        disabled={loading}
                        onClick={() => handleExport(true)}
                    >
                        All photos
                    </Button>
                    <Button
                        color="primary"
                        disabled={loading}
                        onClick={() => handleExport(false)}
                    >
                        Public photos
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
