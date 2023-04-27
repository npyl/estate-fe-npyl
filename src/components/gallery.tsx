import { Grid } from "@mui/material";

import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Image from "src/components/image/Image";

interface GalleryProps {
  mainImage: string;
}
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Gallery(props: GalleryProps) {
  const { mainImage } = props;

  const [galleryOpen, setGalleryOpen] = useState(false);

  const images = [
    {
      src: mainImage,
    },
    {
      src: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1550686041-366ad85a1355?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHJhbmRvbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <Grid container height={"90%"}>
      <Grid item xs={12}>
        <Carousel responsive={responsive}>
          {images?.map((image, index) => {
            return (
              <Image
                src={image.src}
                key={index}
                alt="main"
                ratio="16/9"
                style={{
                  maxWidth: "inherit",
                  maxHeight: "inherit",
                }}
                onClick={() => setGalleryOpen(true)}
              />
            );
          })}
        </Carousel>

        <Lightbox
          open={galleryOpen}
          close={() => setGalleryOpen(false)}
          slides={images}
          plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container height={"100%"} flex={1} width={"100%"}>
          {images?.slice(0, 4).map((image, index) => {
            return (
              <Grid item key={index} xs={3} p={2}>
                <Image
                  src={image.src}
                  ratio="16/9"
                  style={{
                    objectFit: "contain",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                  onClick={() => setGalleryOpen(true)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

{
  /* <Grid item container xs={8} direction={"row"} spacing={2}>
        <Grid item xs={8}>
          <Carousel responsive={responsive}>
            {images?.map((image, index) => {
              return (
                <Image
                  src={image.src}
                  key={index}
                  alt="main"
                  ratio="16/9"
                  style={{
                    maxWidth: "inherit",
                    maxHeight: "inherit",
                  }}
                  onClick={() => setGalleryOpen(true)}
                />
              );
            })}
          </Carousel>

          <Lightbox
            open={galleryOpen}
            close={() => setGalleryOpen(false)}
            slides={images}
            plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
          />
        </Grid>
        <Grid item container xs={4} direction={"column"}>
          {/* Take 4 only pictures and create grid items for them */
}
//     {images?.slice(0, 4).map((image, index) => {
//       return (
//         <Grid item key={index} xs={3}>
//           <Image
//             src={image.src}
//             ratio="1/1"
//             style={{
//               objectFit: "fill",
//               maxHeight: "100%",
//               maxWidth: "100%",
//             }}
//             onClick={() => setGalleryOpen(true)}
//           />
//         </Grid>
//       );
//     })}
//   </Grid>
// </Grid>
