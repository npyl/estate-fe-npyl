import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/material";

const ProgressSx: SxProps<Theme> = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    bgcolor: "rgba(255, 255, 255, 0.8)",

    zIndex: 1,
};

const LoadingIndicator = () => <CircularProgress size={24} sx={ProgressSx} />;

export default LoadingIndicator;
