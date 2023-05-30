import { useEffect, useRef, useState } from "react";
// @mui
import { Box, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// utils
import { bgGradient } from "src/utils/cssStyles";
// components
import Carousel, { CarouselArrowIndex } from "src/components/carousel";
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
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/styles.css";

import { FullscreenRef } from "yet-another-react-lightbox";

// ----------------------------------------------------------------------
const data = [
  {
    id: "1",
    title: "Image 1",
    image: "image1.jpg",
    description: "Description 1",
  },
  {
    id: "2",
    title: "Image 2",
    image: "image2.jpg",
    description: "Description 2",
  },
  {
    id: "3",
    title: "Image 3",
    image: "image3.jpg",
    description: "Description 3",
  },
  {
    id: "4",
    title: "Image 4",
    image: "image4.jpg",
    description: "Description 4",
  },
  {
    id: "5",
    title: "Image 5",
    image: "image5.jpg",
    description: "Description 5",
  },
  {
    id: "6",
    title: "Image 6",
    image: "image6.jpg",
    description: "Description 6",
  },
  {
    id: "7",
    title: "Image 7",
    image: "image7.jpg",
    description: "Description 7",
  },
  {
    id: "8",
    title: "Image 8",
    image: "image8.jpg",
    description: "Description 8",
  },
];
const THUMB_SIZE = 150;
const THUMB_SIZEy = 100;

type Props = {
  data: {
    id: string;
    title: string;
    image: string;
    description: string;
  }[];
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
        {data.map((item) => (
          <Image
            key={item.id}
            alt={item.title}
            src={item.image}
            ratio="16/9"
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

  const renderThumbnails = (
    <StyledThumbnailsContainer length={data.length}>
      <Carousel {...carouselSettings2} asNavFor={nav1} ref={carousel2}>
        {data.map((item, index) => (
          <Image
            key={item.id}
            disabledEffect
            alt={item.title}
            src={item.image}
            sx={{
              width: THUMB_SIZE,
              height: THUMB_SIZEy,
              borderRadius: 0,
              cursor: "pointer",
              ...(currentIndex === index && {
                border: (theme) => `solid 2px ${theme.palette.primary.main}`,
              }),
            }}
          />
        ))}
      </Carousel>
    </StyledThumbnailsContainer>
  );

  const _images = data.map((item, index) => {
    return { src: item.image };
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
          float: (theme) => (theme.direction === "rtl" ? "right" : "left"),
        },
      }}
    >
      <Grid>{renderLargeImg}</Grid>
      <Grid>{renderThumbnails}</Grid>

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
