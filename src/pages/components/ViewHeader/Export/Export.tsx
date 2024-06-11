import { IconButton, Typography } from "@mui/material";
import { useState, MouseEvent, useCallback } from "react";
import DocumentSvg from "@/assets/Document";
import { exportPDF } from "@/services/exports";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Popover from "./popover";
import { SharePopover } from "../ShareExport";

// TODO: introduce helper
const downloadBlob = (blob: Blob): void => {
    const filename = "PropertyExport.pdf";

    // Convert the blob to a URL
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element and attach the blob URL to it
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = filename;

    // Append the anchor to the document and trigger a click on it
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up by removing the anchor and revoking the blob URL
    document.body.removeChild(anchor);
    URL.revokeObjectURL(blobUrl);
};

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
            .then(downloadBlob)
            .catch((error) => {
                console.error("Download failed:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [blueprints, version]);

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
                <Typography mr={1}>{t("Export")}</Typography>
                <DocumentSvg />
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

            <SharePopover
                open={isShareOpen}
                anchorEl={shareAnchorEl}
                onClose={handleShareClose}
                shareUrl={window.location.href}
            />
        </>
    );
};

export default ExportButton;
