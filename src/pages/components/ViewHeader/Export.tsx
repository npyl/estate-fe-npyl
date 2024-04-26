import {
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    Popover,
    Stack,
    Divider,
    Chip,
    Typography,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import MailIcon from "@mui/icons-material/Mail";
import DocumentSvg from "@/assets/Document";
import { useLazyDownloadPDFQuery } from "@/services/exports";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

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
    const router = useRouter();
    const { propertyId } = router.query;

    const [downloadPDF] = useLazyDownloadPDFQuery();

    const [anchorElDoc, setAnchorElDoc] = useState<HTMLButtonElement>();
    const openDoc = Boolean(anchorElDoc);
    const handleClickDoc = (event: MouseEvent<HTMLButtonElement>) =>
        setAnchorElDoc(event.currentTarget);
    const handleCloseDoc = () => setAnchorElDoc(undefined);

    const [selectedAllPhotos, setSelectedAllPhotos] = useState(false);
    const [selectedBlueprints, setSelectedBlueprints] = useState(false);

    const { t } = useTranslation();

    const handleDownload = () => {
        downloadPDF({
            propertyId: +propertyId!,
            qrPath: "", // TODO: wtvr?
            // TODO: take us from checkboxes
            blueprints: false,
            allImages: false,
        })
            .unwrap()
            .then(downloadBlob);
    };

    return (
        <>
            <IconButton onClick={handleClickDoc}>
                <DocumentSvg />
            </IconButton>

            <Popover
                open={openDoc}
                anchorEl={anchorElDoc}
                onClose={handleCloseDoc}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Typography
                    sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    {t("Export property")}
                </Typography>
                <Stack alignItems="center" p={1} spacing={1}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant={
                                selectedAllPhotos ? "contained" : "outlined"
                            }
                            color={selectedAllPhotos ? "primary" : "secondary"} // Change the color values to valid options
                            onClick={() =>
                                setSelectedAllPhotos(!selectedAllPhotos)
                            }
                        >
                            {t("All Photos")}
                        </Button>
                        <Button
                            variant={
                                selectedBlueprints ? "contained" : "outlined"
                            }
                            color={selectedBlueprints ? "primary" : "secondary"}
                            onClick={() =>
                                setSelectedBlueprints(!selectedBlueprints)
                            }
                        >
                            {t("Blueprints")}
                        </Button>
                    </Stack>
                    <Divider
                        sx={{
                            width: 1,
                        }}
                    >
                        <Chip label={t("Options")} />
                    </Divider>
                    <Stack direction="row" spacing={1}>
                        <Button
                            endIcon={<DownloadIcon />}
                            onClick={handleDownload}
                            variant="outlined"
                        >
                            {t("Download")}
                        </Button>
                        <Button endIcon={<MailIcon />} variant="outlined">
                            {t("Share")}
                        </Button>
                    </Stack>
                </Stack>
            </Popover>
        </>
    );
};

export default ExportButton;
