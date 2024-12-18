import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ColorPickerWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

const ColorSlider = styled(Box)({
    width: "100%",
    height: "20px",
    background:
        "linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)",
    position: "relative",
    cursor: "pointer",
    borderRadius: "10px",
});

interface SliderHandleProps {
    left: number;
}

const SliderHandle = styled(Box)<SliderHandleProps>(({ theme, left }) => ({
    position: "absolute",
    width: "24px",
    height: "24px",
    background: "white",
    borderRadius: "100%",
    border: "1px solid #dede",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    top: -2,
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
