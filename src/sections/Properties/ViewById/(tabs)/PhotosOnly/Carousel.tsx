import { useMemo, useState } from "react";
// @mui
import { Box, Button, Divider, Grid, Stack, Tab, Tabs } from "@mui/material";
import { LabeledImage } from "@/components/image";
import { useRouter } from "next/router";
import { useDownloadImages } from "src/services/exports";
import PreviewImage from "@/components/image/PreviewImage";
import useDialog from "@/hooks/useDialog";
import { useTranslation } from "react-i18next";
import { IPropertyImage } from "@/types/file";
import dynamic from "next/dynamic";
import PropertyTabCounter from "../../TabCounter";

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

    // -1: closed, >= 0: open
    const [clickedImageIndex, setClickedImageIndex] = useState(-1);
    const closeLightbox = () => setClickedImageIndex(-1);
    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const [downloadZip, { isLoading }] = useDownloadImages();

    const handleExport = async (hidden: boolean) => {
        const res = await downloadZip({
            propertyId: +propertyId!,
            hidden,
        });
        if (!res) return;
        downloadBlob(res, hidden);
    };

    const [selectedTab, setSelectedTab] = useState(0);

    const filtered = useMemo(
        () =>
            selectedTab === 0 // public
                ? data.filter(({ hidden }) => !hidden)
                : selectedTab === 1 // private
                  ? data.filter(({ hidden }) => !!hidden)
                  : data, // all
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

    // Count for public, private and all images
    const publicCount = data.filter((img) => !img.hidden).length;
    const privateCount = data.filter((img) => img.hidden).length;
    const totalCount = data.length;

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
                <Stack direction="row" justifyContent="space-between" px={2}>
                    <Tabs value={selectedTab} onChange={handleTabChange}>
                        <Tab
                            label={
                                <PropertyTabCounter
                                    label={t("Public Photos")}
                                    count={publicCount}
                                />
                            }
                        />
                        <Tab
                            label={
                                <PropertyTabCounter
                                    label={t("Private Photos")}
                                    count={privateCount}
                                />
                            }
                        />
                        <Tab
                            label={
                                <PropertyTabCounter
                                    label={t("All Photos")}
                                    count={totalCount}
                                />
                            }
                        />
                    </Tabs>
                    <Button
                        onClick={openDialog}
                        sx={{
                            mt: 1,
                        }}
                    >
                        {t("Download")}
                    </Button>
                </Stack>

                <Grid container spacing={1} py={1}>
                    {IMAGES}
                </Grid>

                <Divider />
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
                    loading={isLoading}
                    onExportAll={() => handleExport(true)}
                    onExportPublic={() => handleExport(false)}
                />
            ) : null}
        </>
    );
}

export default OnlyPhotosCarousel;
