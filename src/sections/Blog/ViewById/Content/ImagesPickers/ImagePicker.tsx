import { FC } from "react";
import BaseImagePicker from "@/ui/ImagePicker";
import { Controller, useFormContext } from "react-hook-form";
import { CreateOrUpdateBlogPostReq } from "@/services/blog";

const IMAGE_HEIGHT = "600px";

// -----------------------------------------------------------------------------------------

interface AvatarPickerProps {
    image?: string;
}

const ImagePicker: FC<AvatarPickerProps> = ({ image }) => {
    const { control } = useFormContext<CreateOrUpdateBlogPostReq>();

    return (
        <Controller
            name="thumbnail"
            control={control}
            render={({ field: { onChange } }) => (
                <BaseImagePicker
                    // ...
                    src={image}
                    // ...
                    onSelect={onChange}
                    onDelete={() => onChange(undefined)}
                    ContainerProps={{
                        height: IMAGE_HEIGHT,
                    }}
                    style={{ maxHeight: IMAGE_HEIGHT, objectFit: "contain" }}
                />
            )}
        />
    );
};

export default ImagePicker;
