import { Upload, UploadProps } from "@/components/upload";
import { FC, useCallback } from "react";
import useSrc from "./useSrc";
import Item from "./Item";

interface PickerProps
    extends Omit<
        UploadProps,
        "multiple" | "compact" | "variant" | "files" | "onDrop" | "onRemove"
    > {
    files: File[];
    onChange: (files?: File[]) => void;
}

const Picker: FC<PickerProps> = ({ files, onChange, ...props }) => {
    const src = useSrc(files);

    const onRemove = useCallback(
        (key: string) => {
            const filtered = files.filter(({ name }) => name !== key);
            onChange(filtered);
        },
        [files, onChange]
    );

    return (
        <Upload
            multiple
            compact
            variant="image"
            ItemComponent={({ onChange: _i0, onClick: _i1, ...itemProps }) => (
                <Item files={files} onChange={onChange} {...itemProps} />
            )}
            // ...
            files={src}
            onDrop={onChange}
            onRemove={onRemove}
            {...props}
        />
    );
};

export default Picker;
