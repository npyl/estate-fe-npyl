import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { use, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { SoftButton } from "src/components/SoftButton";
import {
    properties,
    useAddPropertyImageMutation,
    useDeletePropertyImageMutation,
    useReorderPropertyImagesMutation,
    useSetPropertyThumbailMutation,
    useUploadPropertyImageMutation,
} from "src/services/properties";
import { IPropertyImage, IPropertyImagePOST } from "src/types/file";
import { GalleryManager } from "./components/GalleryManager";
import { SeeMore } from "./components/SeeMore";
import UploadImages from "src/components/upload/UploadImages";
import { useSelector } from "react-redux";
import { selectPropertyImages } from "src/slices/property/files";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const PREVIEW_IMAGES_COUNT = 5;

const ImagesSection: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { propertyId } = router.query;

    const files = useSelector(selectPropertyImages);

    /* gallery */
    const [galleryManagerOpen, setGalleryManagerOpen] = useState(false);
    const [currentGalleryImage, setCurrentGalleryImage] =
        useState<IPropertyImage>();
    const [moreOpen, setMoreOpen] = useState(false);

    /* progress */
    const [progress, setProgress] = useState<number>();
    const resetProgress = useDebouncedCallback(
        () => setProgress(undefined),
        500
    );
    const incrementProgress = (s: number) =>
        setProgress((progress) => progress! + s);

    const previewImages = useMemo(
        () => files.slice(0, PREVIEW_IMAGES_COUNT),
        [files]
    );

    /* mutations */
    const [addImage] = useAddPropertyImageMutation();
    const [uploadImage] = useUploadPropertyImageMutation();
    const [setThumbnail] = useSetPropertyThumbailMutation();
    const [reorderImages] = useReorderPropertyImagesMutation();
    const [deleteImage, { isLoading: isDeleteOnGoing }] =
        useDeletePropertyImageMutation();

    const invalidateTags = () =>
        dispatch(
            properties.util.invalidateTags(["Properties", "PropertyById"])
        );

    const uploadFile = async (
        image: File,
        step: number
    ): Promise<{ cdnUrl: string; key: string }> => {
        const filename = image.name;
        const contentType = image.type;
        const size = image.size;

        if (!filename || !contentType)
            throw new Error("filename or contentType cannot be null");

        const body: IPropertyImagePOST = {
            filename,
            // size, TODO
            contentType,
        };

        // get amazon url
        const fileResponse = await addImage({
            id: +propertyId!,
            body: body,
        }).unwrap();

        if (!fileResponse)
            throw new Error("Error: FileResponse: " + fileResponse);

        const key = fileResponse.key;
        const url = fileResponse.url;
        const cdnUrl = fileResponse.cdnUrl;

        // PUT to amazon url
        const response = await uploadImage({
            url,
            contentType,
            image,
        });

        if (!response)
            throw new Error("Uploading the image failed: ", response);

        incrementProgress(step);

        return { cdnUrl, key };
    };

    const handleDropMultiFile = useCallback(
        (acceptedFiles: File[]) => {
            setProgress(0.1);

            const step = 100 / acceptedFiles.length;

            if (files.length === 0) {
                // this is the first image we are adding; therefore it is the mainImage
                uploadFile(acceptedFiles[0], step)
                    .then(({ key }) => {
                        setThumbnail({
                            propertyId: +propertyId!,
                            imageKey: key,
                        });
                    })
                    .catch((reason) =>
                        console.error("uploadThumbnail: ", reason)
                    );

                const uploadPromises = acceptedFiles
                    .slice(1)
                    .map((f) => uploadFile(f, step));

                Promise.all(uploadPromises)
                    .then(invalidateTags)
                    .then(resetProgress)
                    .catch((error) =>
                        console.error("Error in Promise.all:", error)
                    );
            } else {
                // treat every file as secondary image

                const uploadPromises = acceptedFiles.map((f) =>
                    uploadFile(f, step)
                );

                Promise.all(uploadPromises)
                    .then(invalidateTags)
                    .then(resetProgress)
                    .catch((error) => {
                        console.error("uploadImage:", error);
                    });
            }
        },
        [files]
    );

    const handleReorder = (items: string[]) => {
        // INFO: backend requires a list with reordered keys like:  [key, key, ...]
        reorderImages({ id: +propertyId!, body: items }).then(() =>
            setThumbnail({ propertyId: +propertyId!, imageKey: items[0] }).then(
                invalidateTags
            )
        );
    };

    const handleCloseGalleryManager = () => setGalleryManagerOpen(false);

    const handleOpenMore = () => setMoreOpen(true);
    const handleCloseMore = () => setMoreOpen(false);

    const handleImageClick = (image: IPropertyImage) => {
        setCurrentGalleryImage(image);
        setMoreOpen(false);
        setGalleryManagerOpen(true);
    };
    const handleImageChange = useCallback(
        (key: string) => {
            /*
                INFO: the indexes used inside the carousel are not updated in a consistent manner,
                this is why we receive the currentImage on "afterChange", and we get the index that
                translates to our array.
            */
            setCurrentGalleryImage(files.find((f) => f.key === key));
        },
        [files]
    );
    const handleImageDelete = useCallback(
        (key?: string) => {
            if (!key) return;

            // Prepare Next Image to avoid jumping
            const index = files.findIndex((f) => f.key === key);
            if (index < 0) return;

            // Normalize if we are hitting last index
            const nextIndex =
                index === files.length - 1 ? files.length - 2 : index + 1;
            const nextImage = files.at(nextIndex);

            deleteImage({ propertyId: +propertyId!, imageKey: key })
                // .then(() => deleteFile(key))
                .then(() => setCurrentGalleryImage(nextImage))
                .catch((reason) => console.error("deleteImage: ", reason));
        },
        [files]
    );

    // const handleRemoveAllFiles = () => {
    //     files.forEach((file) => handleRemoveFile(file));
    // };

    if (!propertyId) return null;

    return (
        <>
            <Card>
                <CardHeader
                    title={t("Upload Images")}
                    action={
                        files.length > 0 && (
                            <SoftButton
                                onClick={handleOpenMore}
                                sx={{
                                    mt: -1,
                                    mr: 1,
                                }}
                            >
                                {t("Edit")}
                                {` (${files.length} images)`}
                            </SoftButton>
                        )
                    }
                    sx={{
                        display: "flex",
                        justifyContent: "left",
                        "& .MuiCardHeader-action": {
                            position: "absolute",
                            alignSelf: "flex-end",
                        },
                    }}
                />
                <CardContent>
                    <UploadImages
                        files={previewImages}
                        onImageClick={handleImageClick}
                        onDrop={handleDropMultiFile}
                        placeholder={
                            files.length > PREVIEW_IMAGES_COUNT && (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                    height="100%"
                                    mt={1}
                                >
                                    <Typography variant="h6">
                                        {`+${
                                            files.length - PREVIEW_IMAGES_COUNT
                                        } image${
                                            files.length -
                                                PREVIEW_IMAGES_COUNT >
                                            1
                                                ? "s"
                                                : ""
                                        } ...`}
                                    </Typography>
                                </Box>
                            )
                        }
                    />
                </CardContent>
            </Card>

            {files && files.length > 0 && galleryManagerOpen && (
                <GalleryManager
                    open={galleryManagerOpen}
                    deleteOnGoing={isDeleteOnGoing}
                    currentImage={currentGalleryImage}
                    images={files}
                    onChange={handleImageChange}
                    onClose={handleCloseGalleryManager}
                    onDelete={handleImageDelete}
                />
            )}

            {/* Dialog for See More */}
            {moreOpen && (
                <SeeMore
                    open={moreOpen}
                    files={files}
                    progress={progress}
                    onImageClick={handleImageClick}
                    onReorder={handleReorder}
                    onClose={handleCloseMore}
                />
            )}
        </>
    );
};
export default ImagesSection;
