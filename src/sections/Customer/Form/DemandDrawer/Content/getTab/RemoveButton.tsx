import { IconButton, SxProps, Theme } from "@mui/material";
import { MouseEvent, RefObject, useCallback } from "react";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TabsRef } from "../types";

const CloseButtonSx: SxProps<Theme> = {
    borderRadius: "100%",
};

interface RemoveButtonProps {
    index: number;
    tabsRef: RefObject<TabsRef>;
}

const RemoveButton: FC<RemoveButtonProps> = ({ index, tabsRef }) => {
    const handleRemove = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            // IMPORTANT: do not trigger a tab click
            e.stopPropagation();
            tabsRef.current?.remove(index);
        },
        [index]
    );

    return (
        <IconButton size="small" onClick={handleRemove} sx={CloseButtonSx}>
            <CloseIcon fontSize="small" />
        </IconButton>
    );
};

export default RemoveButton;
