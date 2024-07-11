import Panel from "@/components/Panel";
import { SoftButton } from "@/components/SoftButton";
import UploadImages from "./Upload";
import useDialog from "@/hooks/useDialog";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import usePropertyImages from "./hook";
import { PREVIEW_IMAGES_COUNT } from "./constants";
import dynamic from "next/dynamic";
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

    const [galleryImage, setGalleryImage] = useState("");
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
                    onImageClick={setGalleryImage}
                    placeholder={
                        <Placeholder imagesLength={images.length || 0} />
                    }
                />
            </Panel>

            <Gallery
                open={!!galleryImage && images.length > 0}
                openImageKey={galleryImage}
                onClose={closeGallery}
            />

            {isSeeMoreOpen ? (
                <SeeMore open={isSeeMoreOpen} onClose={closeSeeMore} />
            ) : null}
        </>
    );
};

export default ImagesSection;
