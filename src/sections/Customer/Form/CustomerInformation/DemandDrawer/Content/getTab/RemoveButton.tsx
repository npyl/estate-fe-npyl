import { alpha, SxProps, Theme } from "@mui/material";
import { MouseEvent, useCallback } from "react";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";

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
    removeTab: (index: number) => void;
}

const RemoveButton: FC<RemoveButtonProps> = ({ index, removeTab }) => {
    const handleRemove = useCallback(
        (e: MouseEvent<SVGSVGElement>) => {
            // IMPORTANT: do not trigger a tab click
            e.stopPropagation();
            removeTab(index);
        },
        [index, removeTab]
    );

    return <CloseIcon fontSize="small" onClick={handleRemove} sx={CloseSx} />;
};

export default RemoveButton;
