import IconButton from "@mui/material/IconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { FC, RefObject, useCallback } from "react";
import {
    COLLAPSE_ICON_CLASSNAME,
    COLLAPSED_CLASSNAME,
    GROW_ICON_CLASSNAME,
} from "./constant";

interface Props {
    viewRef: RefObject<HTMLDivElement>;
}

const CollapseToggle: FC<Props> = ({ viewRef }) => {
    const toggle = useCallback(() => {
        const el = viewRef.current;
        if (!el) return;

        if (el.classList.contains(COLLAPSED_CLASSNAME)) {
            el.classList.remove(COLLAPSED_CLASSNAME);
        } else {
            el.classList.add(COLLAPSED_CLASSNAME);
        }
    }, []);

    return (
        <IconButton onClick={toggle}>
            <OpenInFullIcon
                className={GROW_ICON_CLASSNAME}
                sx={{ display: "none" }}
            />
            <CloseFullscreenIcon
                className={COLLAPSE_ICON_CLASSNAME}
                sx={{ display: "none" }}
            />
        </IconButton>
    );
};

export default CollapseToggle;
