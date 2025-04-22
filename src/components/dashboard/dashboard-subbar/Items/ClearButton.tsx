import { getBorderColor2 } from "@/theme/borderColor";
import Clear from "@mui/icons-material/Clear";
import { SxProps, Theme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useTabStorage from "./useTabStorage";
import { useCallback } from "react";

const ButtonSx: SxProps<Theme> = {
    position: "absolute",
    right: 1,

    top: "50%",
    transform: "translateY(-50%)",

    border: "1px solid",
    borderColor: getBorderColor2,
    borderRadius: "100%",

    backgroundColor: "background.paper",
    "&:hover": {
        backgroundColor: "background.default",
    },
};

const ClearButton = () => {
    const { clearTabState } = useTabStorage();
    const onClick = useCallback(() => clearTabState(), []);
    return (
        <IconButton size="small" sx={ButtonSx} onClick={onClick}>
            <Clear fontSize="small" />
        </IconButton>
    );
};

export default ClearButton;
