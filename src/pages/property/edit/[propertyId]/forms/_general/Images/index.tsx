import Panel from "@/components/Panel";
import SoftButton from "@/components/SoftButton";
import UploadImages from "./Upload";
import useDialog from "@/hooks/useDialog";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import usePropertyImages from "./hook";
import { PREVIEW_IMAGES_COUNT } from "./constants";
import dynamic from "next/dynamic";
import { UploadFileProvider } from "./context/UploadProgress";
import { ImageOperationsProvider } from "./context/ImageOperations";
import { IntegrationsOperationsProvider } from "./context/IntegrationsOperations";
const Lightbox = dynamic(() => import("@/components/Lightbox"));
const SeeMore = dynamic(() => import("./SeeMore"));
const Gallery = dynamic(() => import("./Gallery"));

// ---------------------------------------------------------------

interface PlaceholderProps {
    imagesLength: number;
}

const Placeholder = ({ imagesLength }: PlaceholderProps) =>
    imagesLength > PREVIEW_IMAGES_COUNT ? (
        <Typography
            variant="h6"
            alignItems="center"
            justifyContent="center"
            mt={1}
        >
            {`+${imagesLength - PREVIEW_IMAGES_COUNT} image${
                imagesLength - PREVIEW_IMAGES_COUNT > 1 ? "s" : ""
            } ...`}
        </Typography>
    ) : null;

// ---------------------------------------------------------------

const ImagesSection = () => {
    const { t } = useTranslation();

    const { images, previewImages } = usePropertyImages();

    const [isSeeMoreOpen, openSeeMore, closeSeeMore] = useDialog();

    // Gallery
    const [galleryImage, setGalleryImage] = useState("");
    const closeGallery = () => setGalleryImage("");

    // Lightbox
    const [lightboxImage, setLightboxImage] = useState("");
    const lightboxIndex = images.findIndex(({ key }) => key === lightboxImage);
    const closeLightbox = () => setLightboxImage("");

    return (
        <UploadFileProvider>
            <ImageOperationsProvider>
                <IntegrationsOperationsProvider>
                    <Panel
                        label={t("Upload Images")}
                        endNode={
                            <SoftButton onClick={openSeeMore}>
                                {`${t("Edit")} (${images?.length || 0} ${t(
                                    "images"
                                )})`}
                            </SoftButton>
                        }
                    >
                        <UploadImages
                            files={previewImages}
                            onImageClick={setGalleryImage}
                            placeholder={
                                <Placeholder
                                    imagesLength={images.length || 0}
                                />
                            }
                        />
                    </Panel>

                    {/* Gallery */}
                    <Gallery
                        open={!!galleryImage && images.length > 0}
                        openImageKey={galleryImage}
                        onClose={closeGallery}
                    />

                    {/* SeeMore */}
                    {isSeeMoreOpen ? (
                        <SeeMore
                            open={isSeeMoreOpen}
                            onOpenLightbox={setLightboxImage}
                            onClose={closeSeeMore}
                        />
                    ) : null}

                    {/* Lightbox */}
                    {lightboxIndex !== -1 ? (
                        <Lightbox
                            open
                            images={images}
                            index={lightboxIndex}
                            onClose={closeLightbox}
                        />
                    ) : null}
                </IntegrationsOperationsProvider>
            </ImageOperationsProvider>
        </UploadFileProvider>
    );
};

export default ImagesSection;
