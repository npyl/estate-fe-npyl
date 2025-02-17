import { useRef } from "react";
import { IconButton, Tooltip } from "@mui/material";
const Popover = dynamic(() => import("./Popover"));
import ExportImage from "./ExportImage";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const ExportButton = () => {
    const { t } = useTranslation();

    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <Tooltip title={t("Export")}>
                <IconButton ref={anchorRef} onClick={openPopover}>
                    <ExportImage />
                </IconButton>
            </Tooltip>

            {isOpen && anchorRef.current ? (
                <Popover anchorEl={anchorRef.current} onClose={closePopover} />
            ) : null}
        </>
    );
};

export default ExportButton;
