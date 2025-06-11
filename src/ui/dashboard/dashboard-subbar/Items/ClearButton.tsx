import Clear from "@mui/icons-material/Clear";
import useTabStorage from "./useTabStorage";
import { useCallback } from "react";
import RoundIconButton from "@/components/RoundIconButton";

const ClearButton = () => {
    const { clearTabState } = useTabStorage();
    const onClick = useCallback(() => clearTabState(), []);
    return (
        <RoundIconButton size="small" onClick={onClick}>
            <Clear fontSize="small" />
        </RoundIconButton>
    );
};

export default ClearButton;
