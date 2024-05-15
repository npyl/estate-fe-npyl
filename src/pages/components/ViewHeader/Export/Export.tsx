import { IconButton } from "@mui/material";
import { useState, MouseEvent, useCallback } from "react";
import DocumentSvg from "@/assets/Document";
import { useLazyDownloadPDFQuery } from "@/services/exports";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Popover from "./popover";

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
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    // Popper
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();
    const isOpen = Boolean(anchorEl);
    const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(undefined);

    // Download Options
    const [blueprints, setBlueprints] = useState(false);
    const [version, setVersion] = useState<"LONG" | "SHORT">("LONG");

    const [downloadPDF] = useLazyDownloadPDFQuery();

    const handleDownload = useCallback(() => {
        downloadPDF({
            propertyId: +propertyId!,
            qrPath: "",
            blueprints,
            publicImages: false,
        })
            .unwrap()
            .then(downloadBlob);
    }, []);

    return (
        <>
            <IconButton onClick={handleOpen}>
                <DocumentSvg />
            </IconButton>

            {isOpen ? (
                <Popover
                    open={isOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    // ...
                    onShare={() => {}}
                    onDownload={handleDownload}
                    // ...
                    blueprints={blueprints}
                    setBlueprints={setBlueprints}
                    version={version}
                    setVersion={setVersion}
                />
            ) : null}
        </>
    );
};

export default ExportButton;
