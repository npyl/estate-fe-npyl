import { FC, useCallback } from "react";
import { EditorState } from "draft-js";
import HistoryIcon from "@mui/icons-material/History";
import Button from "@mui/material/Button";

interface RevertButtonProps {
    revertContent: EditorState;
    onClick: (e: EditorState) => void;
}

const RevertButton: FC<RevertButtonProps> = ({ revertContent, onClick }) => {
    const handleClick = useCallback(
        () => onClick(revertContent),
        [revertContent, onClick]
    );

    return (
        <Button onClick={handleClick}>
            <HistoryIcon />
        </Button>
    );
};

export default RevertButton;
