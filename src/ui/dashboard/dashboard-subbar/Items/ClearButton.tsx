import Clear from "@mui/icons-material/Clear";
import useTabStorage from "./useTabStorage";
import { useCallback } from "react";
import RoundIconButton from "@/components/RoundIconButton";
import { SxProps, Theme } from "@mui/material";

const ButtonSx: SxProps<Theme> = {
    backgroundColor: "background.paper",
};

const ClearButton = () => {
    const { clearTabState } = useTabStorage();
    const onClick = useCallback(() => clearTabState(), []);
    return (
        <RoundIconButton size="small" onClick={onClick} sx={ButtonSx}>
            <Clear fontSize="small" />
        </RoundIconButton>
    );
};

export default ClearButton;
