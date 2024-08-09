import { useMemo, useState } from "react";
// @mui
import { Box, Button, Divider, Grid, Stack, Tab, Tabs } from "@mui/material";
import { LabeledImage } from "src/components/image";

import { useRouter } from "next/router";
import { downloadImages as downloadZip } from "src/services/exports";
import PreviewImage from "@/components/image/PreviewImage";
import useDialog from "@/hooks/useDialog";
import { useTranslation } from "react-i18next";
import { IPropertyImage } from "@/types/file";
import dynamic from "next/dynamic";

const Lightbox = dynamic(() => import("@/components/Lightbox"));
const DownloadDialog = dynamic(() => import("./Dialog"));

const downloadBlob = (blob: Blob, hidden: boolean): void => {
    const filename = hidden ? "AllImages.zip" : "PublicImages.zip";

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

type Props = {
    data: IPropertyImage[];
};

function OnlyPhotosCarousel({ data }: Props) {
    const { t } = useTranslation();

    const router = useRouter();

    const { propertyId } = router.query;

    const [loading, setLoading] = useState(false);

    // -1: closed, >= 0: open
    const [clickedImageIndex, setClickedImageIndex] = useState(-1);
    const closeLightbox = () => setClickedImageIndex(-1);
    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const handleExport = async (hidden: boolean) => {
        setLoading(true);
        downloadZip({
            propertyId: +propertyId!,
            hidden,
        }).then((e) => {
            downloadBlob(e, hidden);
            setLoading(false);
        });
    };

    const [selectedTab, setSelectedTab] = useState(0);

    const filtered = useMemo(
        () =>
            selectedTab === 0 // all
                ? data
                : selectedTab === 1 // public
                ? data.filter(({ hidden }) => !hidden)
                : data.filter(({ hidden }) => !!hidden),
        [selectedTab, data]
    );

    const IMAGES = useMemo(
        () =>
            filtered.map(({ id, url, title, hidden }, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                    {url ? (
                        <LabeledImage
                            alt={title}
                            src={url}
                            hidden={hidden}
                            ratio="16/9"
                            onClick={() => setClickedImageIndex(index)}
                        />
                    ) : (
                        <PreviewImage />
                    )}
                </Grid>
            )),
        [filtered]
    );

    const handleTabChange = (_: any, t: number) => setSelectedTab(t);

    return (
        <>
            <Box
                sx={{
                    "& .slick-slide": {
                        float: (theme) =>
                            theme.direction === "rtl" ? "right" : "left",
                    },
                }}
            >
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    variant="fullWidth"
                >
                    <Tab label={t("All Photos")} />
                    <Tab label={t("Public Photos")} />
                    <Tab label={t("Private Photos")} />
                </Tabs>

                <Grid container spacing={1} py={1}>
                    {IMAGES}
                </Grid>

                <Divider />

                <Stack width={1} mt={1} alignItems="flex-end">
                    <Button onClick={openDialog}>{t("Download")}</Button>
                </Stack>
            </Box>

            {/* Lightbox */}
            {clickedImageIndex > -1 ? (
                <Lightbox
                    open
                    index={clickedImageIndex}
                    images={filtered}
                    onClose={closeLightbox}
                />
            ) : null}

            {/* Dialog */}
            {isDialogOpen ? (
                <DownloadDialog
                    open={isDialogOpen}
                    onClose={closeDialog}
                    // ...
                    loading={loading}
                    onExportAll={() => handleExport(true)}
                    onExportPublic={() => handleExport(false)}
                />
            ) : null}
        </>
    );
}

export default OnlyPhotosCarousel;
