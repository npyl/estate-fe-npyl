import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

const StyledIconButton = styled(IconButton)({
    position: "absolute",
    left: "-30px",
    bottom: "-5px",
    zIndex: 5000,

    width: "30px",
    height: "30px",
});

export { StyledIconButton };
