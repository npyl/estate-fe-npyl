import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { PaperProps } from "@mui/material/Paper";

const StyledIconButton = styled(IconButton)({
    position: "absolute",
    left: "-30px",
    bottom: "-5px",
    zIndex: 5000,

    width: "30px",
    height: "30px",
});

const PopoverSlotProps: {
    paper: Omit<PaperProps, "children">;
} = {
    paper: {
        sx: {
            display: "flex",
            flexDirection: "row",
            gap: 1,
            p: 1,
            borderRadius: "25px",
        },
    },
};

export { StyledIconButton, PopoverSlotProps };
