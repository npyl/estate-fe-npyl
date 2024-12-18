import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ColorPickerWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

const ColorSlider = styled(Box)({
    width: "100%",
    height: "24px",
    background:
        "linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
    position: "relative",
    cursor: "pointer",
});

interface SliderHandleProps {
    left: number;
}

const SliderHandle = styled(Box)<SliderHandleProps>(({ theme, left }) => ({
    position: "absolute",
    width: "16px",
    height: "24px",
    background: "white",
    border: "2px solid white",
    borderRadius: "100%",
    padding: theme.spacing(1),
    top: "0",
    left: `${left}%`,
    transform: "translateX(-50%)",
    cursor: "grab",
    "&:active": {
        cursor: "grabbing",
    },
}));

const SegmentBar = styled(Box)({
    display: "flex",
    width: "100%",
    height: "32px",
});

interface ColorSegmentProps {
    selected: boolean;
}

const ColorSegment = styled(Box)<ColorSegmentProps>(({ selected }) => ({
    flex: 1,
    cursor: "pointer",
    transition: "all 0.2s",
    position: "relative",
    "&:hover": {
        opacity: 0.8,
    },
    height: "10px",
    transform: selected ? "scaleY(2)" : "scale(1)",
    zIndex: selected ? 1 : 0,
}));

export {
    ColorPickerWrapper,
    ColorSegment,
    ColorSlider,
    SegmentBar,
    SliderHandle,
};
