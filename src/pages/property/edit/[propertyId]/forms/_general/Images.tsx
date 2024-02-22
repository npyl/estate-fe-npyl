import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { SoftButton } from "src/components/SoftButton";
import {
    properties,
    useAddPropertyImageMutation,
    useDeletePropertyImageMutation,
    useGetPropertyByIdQuery,
    useReorderPropertyImagesMutation,
    useSetPropertyThumbailMutation,
    useUploadPropertyFileMutation,
} from "src/services/properties";
import {
    IFileResponse,
    IPropertyImage,
    IPropertyImagePOST,
} from "src/types/file";
import { GalleryManager } from "../components/GalleryManager";
import { SeeMore } from "../components/SeeMore";
import UploadImages from "src/components/upload/UploadImages";
import { useDispatch } from "react-redux";
import { useUploadFileContext } from "src/contexts/uploadFile";

const PREVIEW_IMAGES_COUNT = 5;

interface UploadResponse {
    key: string;
    cdnUrl: string;
}

type PromiseFunction<T> = () => Promise<T>;

async function executeSequentially<T>(
    promises: PromiseFunction<T>[]
): Promise<T[]> {
    const results: T[] = [];

    for (const promise of promises) {
        const result = await promise();
        results.push(result);
    }

    return results;
}

const ImagesSection: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const files = useMemo(() => property?.images || [], [property]);

    /* gallery */
    const [galleryManagerOpen, setGalleryManagerOpen] = useState(false);
    const [openFromSeeMore, setOpenFromSeeMore] = useState(false);
    const [currentGalleryImage, setCurrentGalleryImage] =
        useState<IPropertyImage>();
    const [moreOpen, setMoreOpen] = useState(false);

    /* progress */
    const { setUploadProgress } = useUploadFileContext();

    const previewImages = useMemo(
        () => files.slice(0, PREVIEW_IMAGES_COUNT),
        [files]
    );

    /* mutations */
    const [addImage] = useAddPropertyImageMutation();
    const [uploadImage] = useUploadPropertyFileMutation();
    const [setThumbnail] = useSetPropertyThumbailMutation();
    const [reorderImages] = useReorderPropertyImagesMutation();
    const [deleteImage, { isLoading: isDeleteOnGoing }] =
        useDeletePropertyImageMutation();

    const invalidateTags = () =>
        dispatch(
            properties.util.invalidateTags(["Properties", "PropertyById"])
        );

    const addFile = async (image: File): Promise<IFileResponse> => {
        const { name: filename, type: contentType, size } = image;

        if (!filename || !contentType)
            throw new Error("filename or contentType cannot be null");

        const body: IPropertyImagePOST = {
            filename,
            // size, TODO
            contentType,
        };

        // get amazon url
        const response = await addImage({
            id: +propertyId!,
            body: body,
        });

        if ("error" in response) return Promise.reject(response.error);

        return Promise.resolve(response.data);
    };

    const uploadFile = async (
        image: File | undefined,
        fileResponse: IFileResponse
    ): Promise<UploadResponse> => {
        if (!image) throw new Error("null image!");

        const { type: contentType, name: filename, size } = image;
        const { key, url, cdnUrl } = fileResponse;

        if (!contentType) throw new Error("contentType cannot be null");
        if (!key || !url || !cdnUrl) throw new Error("checks2 nulls");

        // PUT to amazon url
        const response = await uploadImage({
            url,
            file: image,
            onProgressUpdate: (progress) =>
                setUploadProgress({
                    filename,
                    progress,
                }),
        });

        if (!response)
            throw new Error("Uploading the image failed: ", response);

        return { cdnUrl, key };
    };

    const handleDropMultiFile = useCallback(
        async (acceptedFiles: File[]) => {
            if (files.length === 0) {
                // this is the first image we are adding; therefore it is the mainImage
                addFile(acceptedFiles[0])
                    .then((fileResponse) =>
                        uploadFile(acceptedFiles[0], fileResponse)
                    )
                    .then(({ key }) =>
                        setThumbnail({
                            propertyId: +propertyId!,
                            imageKey: key,
                        })
                    )
                    // Invalidate *ONLY* if user has uploaded only one image
                    .then(() => acceptedFiles.length === 1 && invalidateTags())
                    .catch((reason) =>
                        console.error("uploadThumbnail: ", reason)
                    );

                const addPromises = acceptedFiles.slice(1).map(addFile);

                /* Add All */
                const fileResponses = await Promise.all(addPromises);

                // TODO: error handling here!

                /* Upload Sequentially */
                const uploadPromises = fileResponses.map(
                    (fileResponse, i) => () =>
                        uploadFile(acceptedFiles.slice(1).at(i), fileResponse)
                );

                executeSequentially(uploadPromises)
                    .then(invalidateTags)
                    .catch((error) =>
                        console.error("SequentialUploadError:", error)
                    );
            } else {
                const addPromises = acceptedFiles.map(addFile);
                /* Add All */
                const fileResponses = await Promise.all(addPromises);

                // TODO: error checks

                /* Upload Sequentially */
                const uploadPromises = fileResponses.map(
                    (fileResponse, i) => () =>
                        uploadFile(acceptedFiles.at(i), fileResponse)
                );

                executeSequentially(uploadPromises)
                    .then(invalidateTags)
                    .catch((error) =>
                        console.error("SequentialUploadError:", error)
                    );
            }
        },
        [files]
    );

    // INFO: backend requires a list with reordered keys like:  [key, key, ...]
    const handleReorder = (items: string[]) =>
        reorderImages({ id: +propertyId!, body: items }).then(invalidateTags);

    const handleCloseGalleryManager = () => {
        setGalleryManagerOpen(false);

        /* return to SeeMore */
        if (openFromSeeMore) setMoreOpen(true);
    };

    const handleOpenMore = () => setMoreOpen(true);
    const handleCloseMore = () => setMoreOpen(false);

    const handleImageClick = useCallback(
        (image: IPropertyImage) => {
            setCurrentGalleryImage(image);

            /* return to SeeMore if opened from */
            if (moreOpen) setOpenFromSeeMore(true);
            else setOpenFromSeeMore(false);

            setMoreOpen(false);
            setGalleryManagerOpen(true);
        },
        [moreOpen]
    );
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

            const newThumbnailKey = files[0]?.key === key ? files[1]?.key : "";

            // Prepare Next Image to avoid jumping
            const index = files.findIndex((f) => f.key === key);
            if (index < 0) return;

            // Normalize if we are hitting last index
            const nextIndex =
                index === files.length - 1 ? files.length - 2 : index + 1;
            const nextImage = files.at(nextIndex);

            deleteImage({
                propertyId: +propertyId!,
                imageKey: key,
                newThumbnailKey,
            })
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
                    onImageClick={handleImageClick}
                    onReorder={handleReorder}
                    onClose={handleCloseMore}
                />
            )}
        </>
    );
};
export default ImagesSection;
