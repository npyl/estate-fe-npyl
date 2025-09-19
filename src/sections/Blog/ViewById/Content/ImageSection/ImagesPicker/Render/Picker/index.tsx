import { Upload, UploadProps } from "@/components/upload";
import { FC, useCallback } from "react";
import useSrc from "./useSrc";
import Item from "./Item";
import Stack from "@mui/material/Stack";
import LoadingIndicator from "./LoadingIndicator";
import { errorToast } from "@/components/Toaster";

const FULL_LITERAL = "BLOG_MIDDLE_IMAGES_FULL";

interface PickerProps
    extends Omit<
        UploadProps,
        "multiple" | "compact" | "variant" | "files" | "onDrop" | "onRemove"
    > {
    loading: boolean;
    files: File[];
    // ...
    onSetImages: (f: File[]) => void;
}

const Picker: FC<PickerProps> = ({ files, onSetImages, loading, ...props }) => {
    const src = useSrc(files);

    // ------------------------------------------------------------------------

    const onDrop = useCallback(
        (f: File[]) => {
            // prevent from adding more than 3 images
            if (f.length > 3) {
                errorToast(FULL_LITERAL);
                return;
            }

            onSetImages(f);
        },
        [onSetImages]
    );

    const onRemove = useCallback(
        (key: string) => {
            const filtered = files.filter(({ name }) => name !== key);
            onSetImages(filtered);
        },
        [files, onSetImages]
    );

    return (
        <Stack position="relative">
            <Upload
                disabled={loading}
                multiple
                compact
                variant="image"
                ItemComponent={({
                    onChange: _i0,
                    onClick: _i1,
                    ...itemProps
                }) => (
                    <Item files={files} onChange={onSetImages} {...itemProps} />
                )}
                // ...
                files={src}
                onDrop={onDrop}
                onRemove={onRemove}
                {...props}
            />

            {loading ? <LoadingIndicator /> : null}
        </Stack>
    );
};

export default Picker;
