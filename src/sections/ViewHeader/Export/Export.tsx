import { IconButton, Typography } from "@mui/material";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
const Popover = dynamic(() => import("./popover"));
import ExportImage from "./ExportImage";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";

const ExportButton = () => {
    const { t } = useTranslation();

    // Popper
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <IconButton ref={anchorRef} onClick={openPopover}>
                <Typography mr={1} variant="body2">
                    {t("Export")}
                </Typography>
                <ExportImage />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Popover anchorEl={anchorRef.current} onClose={closePopover} />
            ) : null}
        </>
    );
};

export default ExportButton;
