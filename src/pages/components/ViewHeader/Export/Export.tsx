import { IconButton, Typography } from "@mui/material";
import { useState, MouseEvent, useCallback } from "react";
import DocumentSvg from "@/assets/Document";
import { exportPDF } from "@/services/exports";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Popover from "./popover";
import SharePopover from "@/components/Share";
import downloadBlob from "@/utils/downloadBlob";
import ExportImage from "./ExportImage";

const filename = "PropertyExport.pdf";

const downloadBlob0 = (b: Blob) => downloadBlob(b, filename);

const ExportButton = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { propertyId } = router.query;

    // Popper
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const isOpen = Boolean(anchorEl);
    const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    // Download Options
    const [blueprints, setBlueprints] = useState(false);
    const [version, setVersion] = useState<"LONG" | "SHORT">("LONG");

    const [loading, setLoading] = useState(false);

    const handleDownload = useCallback(() => {
        setLoading(true);
        exportPDF({
            propertyId: +propertyId!,
            qrPath: "",
            blueprints,
            publicImages: version === "LONG",
            lang: i18n.language as "en" | "el",
        })
            .then(downloadBlob0)
            .finally(() => {
                setLoading(false);
            });
    }, [blueprints, version, propertyId]);

    // Share Popover state
    const [shareAnchorEl, setShareAnchorEl] =
        useState<HTMLButtonElement | null>(null);
    const isShareOpen = Boolean(shareAnchorEl);
    const handleShareOpen = () => {
        handleClose(); // Close the main Popover
        setShareAnchorEl(anchorEl);
    };
    const handleShareClose = () => setShareAnchorEl(null);

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Typography mr={1} variant="body2">
                    {t("Export")}
                </Typography>
                <ExportImage />
            </IconButton>

            {isOpen ? (
                <Popover
                    open={isOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    onShare={handleShareOpen}
                    onDownload={handleDownload}
                    blueprints={blueprints}
                    setBlueprints={setBlueprints}
                    version={version}
                    setVersion={setVersion}
                    loading={loading}
                />
            ) : null}

            {isShareOpen ? (
                <SharePopover
                    open={isShareOpen}
                    anchorEl={shareAnchorEl}
                    onClose={handleShareClose}
                    shareUrl={window.location.href}
                />
            ) : null}
        </>
    );
};

export default ExportButton;
