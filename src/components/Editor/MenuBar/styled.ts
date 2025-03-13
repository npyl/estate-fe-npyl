import { getBorderColor2 } from "@/theme/borderColor";
import { SxProps, Theme } from "@mui/material";

const getBubbleSx = (bubble: boolean): SxProps<Theme> => ({
    bgcolor: bubble ? "background.paper" : "transparent",
    border: "1px solid",
    borderColor: bubble ? getBorderColor2 : "transparent",
    borderRadius: 5,
    // ...
    p: bubble ? 1 : 0,
});

export { getBubbleSx };
