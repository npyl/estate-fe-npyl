import { FC, useCallback, MouseEvent } from "react";
import { styled } from "@mui/material/styles";
import MuiClearIcon from "@mui/icons-material/Clear";
import { useTabsContext } from "@/contexts/tabs";

const ClearIcon = styled(MuiClearIcon)({
    height: "20px",
    width: "20px",
    padding: "3px",
    "&:hover": {
        borderRadius: "20px",
        backgroundColor: "white",
        color: "black",
    },
});

interface ClearButtonProps {
    path: string;
}

const ClearButton: FC<ClearButtonProps> = ({ path }) => {
    const { removeTab } = useTabsContext();

    const handleRemove = useCallback((e: MouseEvent) => {
        e.preventDefault();
        removeTab(path);
    }, []);

    return <ClearIcon onClick={handleRemove} />;
};

export default ClearButton;
