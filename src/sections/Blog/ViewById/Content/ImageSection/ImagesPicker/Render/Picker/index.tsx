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
    onChange: (f: File[]) => void;
    onSet: (f: File[]) => void;
}

const Picker: FC<PickerProps> = ({
    files,
    onChange,
    onSet,
    loading,
    ...props
}) => {
    const src = useSrc(files);

    // ---------------------------------------------------------------------------

    /**
     * Remove 1st element (used as thumbnail); the rest are middlepage images
     * Call onSet which directly talks to the editor to add images to container after removing any existing ones
     */
    const setImages = useCallback(
        (f: File[]) => {
            // update hook-form
            onChange(f);

            // set editor's (middlepage) images
            const newF = f.slice(1);
            onSet(newF);
        },
        [onChange, onSet]
    );

    // ------------------------------------------------------------------------

    const onDrop = useCallback(
        (f: File[]) => {
            // prevent from adding more than 3 images
            if (f.length > 3) {
                errorToast(FULL_LITERAL);
                return;
            }

            setImages(f);
        },
        [setImages]
    );

    const onRemove = useCallback(
        (key: string) => {
            const filtered = files.filter(({ name }) => name !== key);
            setImages(filtered);
        },
        [files, setImages]
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
                    <Item files={files} onChange={setImages} {...itemProps} />
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
