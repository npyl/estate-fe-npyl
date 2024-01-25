import { styled } from "@mui/material/styles";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface SlideImage {
    url: string;
    code: string;
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

const SlideCaption = styled("div")({
    position: "absolute",
    left: "0",
    bottom: "0",
    padding: "0 10px",
    background: "rgba(0,0,0,0.1)",
    fontSize: "1rem",
    zIndex: "1000",
});

const SlideshowContainer = styled("div")(({ theme }) => ({
    overflow: "hidden",
    borderRadius: theme.shape.borderRadius,
}));

const StyledSlide = ({ images, arrows }: styledSlideProps) => (
    <SlideshowContainer>
        <Slide arrows={arrows} duration={1500}>
            {images.map((image, index) => (
                <div style={{ position: "relative" }} key={index}>
                    <SlideContainer
                        style={{ backgroundImage: `url(${image.url})` }}
                    />
                    <SlideCaption>{image.code}</SlideCaption>
                </div>
            ))}
        </Slide>
    </SlideshowContainer>
);

export default StyledSlide;
