import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { styled } from "@mui/material";

interface SlideImage {
    url: string;
}

interface styledSlideProps {
    images: SlideImage[];
    arrows: boolean;
}

const SlideContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "35vh",
});

const SlideshowContainer = styled("div")(({ theme }) => ({
    overflow: "hidden",
    borderRadius: theme.shape.borderRadius,
}));

const StyledSlide = ({ images, arrows }: styledSlideProps) => (
    <SlideshowContainer>
        <Slide arrows={arrows}>
            {images.map((image, index) => (
                <div key={index}>
                    <SlideContainer
                        style={{ backgroundImage: `url(${image.url})` }}
                    />
                </div>
            ))}
        </Slide>
    </SlideshowContainer>
);

export default StyledSlide;
