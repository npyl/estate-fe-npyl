import { FC, useCallback } from "react";
import {
    useRemoveBlogPostImageMutation,
    useUploadBlogPostImageMutation,
} from "@/services/company";
import Box from "@mui/material/Box";
import BaseImagePicker from "@/ui/ImagePicker";

const IMAGE_HEIGHT = "400px";

// -----------------------------------------------------------------------------------------

interface AvatarPickerProps {
    siteId: number;
    postId: number;
    image?: string;
}

const ImagePicker: FC<AvatarPickerProps> = ({ siteId, postId, image }) => {
    const [uploadImage, { isLoading: isUploading }] =
        useUploadBlogPostImageMutation();
    const [removeImage, { isLoading: isRemoving }] =
        useRemoveBlogPostImageMutation();

    const isLoading = isUploading || isRemoving;

    const onSelect = useCallback(
        (file: File) => uploadImage({ file, siteId, postId }),
        [siteId, postId]
    );

    const onDelete = useCallback(
        () => removeImage({ siteId, postId }),
        [siteId, postId]
    );

    return (
        <Box height={IMAGE_HEIGHT}>
            <BaseImagePicker
                isLoading={isLoading}
                // ...
                src={image}
                // ...
                onSelect={onSelect}
                onDelete={onDelete}
                imgStyle={{
                    height: IMAGE_HEIGHT,
                }}
                height={IMAGE_HEIGHT}
            />
        </Box>
    );
};

export default ImagePicker;
