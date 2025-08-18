import { IPropertyImage } from "@/types/file";
import { FC, useCallback, useState } from "react";
import { Upload } from "src/components/upload";
import { errorToast } from "@/components/Toaster";
import uuidv4 from "@/utils/uuidv4";

const getImageFromFile = (f: File): IPropertyImage => {
    const id = Math.random();
    return {
        id,
        description: "",
        filename: f.name,
        hidden: false,
        key: uuidv4(),
        thumbnail: false,
        title: "",
        url: URL.createObjectURL(f),
    };
};

const FULL_LITERAL = "BLOG_MIDDLE_IMAGES_FULL";

interface Props {
    images: IPropertyImage[];
}

const MiddleImagesPicker: FC<Props> = ({}) => {
    // const [uploadFiles, { isUploading }] = useBlogUpload();

    const [images, setImages] = useState<IPropertyImage[]>([]);
    const uploadFiles = useCallback(
        (f: File[]) => {
            if (images.length === 2) {
                errorToast(FULL_LITERAL);
                return;
            }

            if (images.length + f.length > 2) {
                errorToast(FULL_LITERAL);
                return;
            }

            setImages((old) => [...old, ...f.map(getImageFromFile)]);
        },
        [images]
    );
    const onRemove = useCallback(
        (k: string) => setImages((old) => old.filter(({ key }) => key !== k)),
        []
    );

    return (
        <Upload
            compact
            multiple
            variant="image"
            files={images}
            // disabled={isUploading}
            onDrop={uploadFiles}
            onRemove={onRemove}
        />
    );
};

export default MiddleImagesPicker;
