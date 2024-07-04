import Panel from "@/components/Panel";
import { SoftButton } from "@/components/SoftButton";
import UploadImages from "@/components/upload/UploadImages";
import useDialog from "@/hooks/useDialog";
import { IPropertyImage } from "@/types/file";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Gallery from "./Gallery";
import usePropertyImages from "./hook";
import { PREVIEW_IMAGES_COUNT } from "./constants";

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

const ImagesSection = () => {
    const { t } = useTranslation();

    const { images, previewImages } = usePropertyImages();

    const [isSeeMoreOpen, openSeeMore, closeSeeMore] = useDialog();

    const [galleryImage, setGalleryImage] = useState("");
    const openGallery = (f: IPropertyImage) => setGalleryImage(f.key);
    const closeGallery = () => setGalleryImage("");

    return (
        <>
            <Panel
                label={t("Upload Images")}
                endNode={
                    <SoftButton onClick={openSeeMore}>
                        {`${t("Edit")} (${images?.length || 0} images)`}
                    </SoftButton>
                }
            >
                <UploadImages
                    files={previewImages}
                    onImageClick={openGallery}
                    // onDrop={handleDropMultiFile}
                    placeholder={
                        <Placeholder imagesLength={images.length || 0} />
                    }
                />
            </Panel>

            {!!galleryImage ? (
                <Gallery
                    open={!!galleryImage}
                    currentImageKey={galleryImage}
                    onClose={closeGallery}
                />
            ) : null}
        </>
    );
};

export default ImagesSection;
