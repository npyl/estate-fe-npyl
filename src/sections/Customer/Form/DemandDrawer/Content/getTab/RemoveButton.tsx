import { alpha, SxProps, Theme } from "@mui/material";
import { MouseEvent, RefObject, useCallback } from "react";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TabsRef } from "../types";

const CloseSx: SxProps<Theme> = {
    borderRadius: "100%",

    color: "text.secondary",

    "&:hover": {
        color: "error.main",
        bgcolor: ({
            palette: {
                error: { main },
            },
        }) => alpha(main, 0.1),
    },
};

interface RemoveButtonProps {
    index: number;
    tabsRef: RefObject<TabsRef>;
}

const RemoveButton: FC<RemoveButtonProps> = ({ index, tabsRef }) => {
    const handleRemove = useCallback(
        (e: MouseEvent<SVGSVGElement>) => {
            // IMPORTANT: do not trigger a tab click
            e.stopPropagation();
            tabsRef.current?.remove(index);
        },
        [index]
    );

    return <CloseIcon fontSize="small" onClick={handleRemove} sx={CloseSx} />;
};

export default RemoveButton;
