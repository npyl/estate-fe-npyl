import { FC, useCallback } from "react";
import {
    useRemoveBlogPostImageMutation,
    useUploadBlogPostImageMutation,
} from "@/services/blog";
import BaseImagePicker from "@/ui/ImagePicker";

const IMAGE_HEIGHT = "600px";

// -----------------------------------------------------------------------------------------

interface AvatarPickerProps {
    postId: number;
    image?: string;
}

const ImagePicker: FC<AvatarPickerProps> = ({ postId, image }) => {
    const [uploadImage, { isLoading: isUploading }] =
        useUploadBlogPostImageMutation();
    const [removeImage, { isLoading: isRemoving }] =
        useRemoveBlogPostImageMutation();

    const isLoading = isUploading || isRemoving;

    const onSelect = useCallback(
        (file: File) => uploadImage({ file, postId }),
        [postId]
    );

    const onDelete = useCallback(() => removeImage(postId), [postId]);

    return (
        <BaseImagePicker
            isLoading={isLoading}
            // ...
            src={image}
            // ...
            onSelect={onSelect}
            onDelete={onDelete}
            overlayContainerProps={{
                height: IMAGE_HEIGHT,
            }}
            style={{ maxHeight: IMAGE_HEIGHT, objectFit: "contain" }}
        />
    );
};

export default ImagePicker;
