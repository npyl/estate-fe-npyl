import { Upload, UploadProps } from "@/components/upload";
import { FC, useCallback } from "react";
import useSrc from "./useSrc";
import Item from "./Item";
import Stack from "@mui/material/Stack";
import LoadingIndicator from "./LoadingIndicator";

interface PickerProps
    extends Omit<
        UploadProps,
        "multiple" | "compact" | "variant" | "files" | "onDrop" | "onRemove"
    > {
    loading: boolean;
    files: File[];
    onChange: (files?: File[]) => void;
}

const Picker: FC<PickerProps> = ({ files, onChange, loading, ...props }) => {
    const src = useSrc(files);

    const onRemove = useCallback(
        (key: string) => {
            const filtered = files.filter(({ name }) => name !== key);
            onChange(filtered);
        },
        [files, onChange]
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
                }) => <Item files={files} onChange={onChange} {...itemProps} />}
                // ...
                files={src}
                onDrop={onChange}
                onRemove={onRemove}
                {...props}
            />

            {loading ? <LoadingIndicator /> : null}
        </Stack>
    );
};

export default Picker;
