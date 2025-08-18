import { IPropertyImage } from "@/types/file";
import { FC, RefObject, useCallback, useRef, useState } from "react";
import { Upload } from "src/components/upload";
import { errorToast } from "@/components/Toaster";
import uuidv4 from "@/utils/uuidv4";
import { Editor } from "@tiptap/react";
import { getAllContainers } from "@/components/Editor/extensions/Image";

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

const IMG_CONTAINER_STYLE =
    "display: flex; flex-direction: row; gap: 8px; height: fit-content; width: 100%;";
const IMG_STYLE =
    "width: 50%; height: auto; object-fit: fit; border-radius: 8px;";

interface Props {
    editorRef: RefObject<Editor>;
    images: IPropertyImage[];
}

const MiddleImagesPicker: FC<Props> = ({ editorRef }) => {
    // const [uploadFiles, { isUploading }] = useBlogUpload();

    const containerRef = useRef(-1);

    const addImages = useCallback((i: IPropertyImage[]) => {
        const editor = editorRef.current;
        if (!editor) return;

        // INFO: if we haven't created a container do so!
        if (containerRef.current === -1) {
            editor.commands.createContainer({
                HTMLAttributes: {
                    style: IMG_CONTAINER_STYLE,
                },
            });

            const containers = getAllContainers(editor.state);
            const latestContainer = containers[containers.length - 1];

            containerRef.current = latestContainer.pos;
        }

        const pos = containerRef.current;

        editor.commands.addImageToContainer(pos, i, {
            style: IMG_STYLE,
        });
    }, []);

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

            const i = f.map(getImageFromFile);

            addImages(i);

            setImages((old) => [...old, ...i]);
        },
        [images]
    );
    const onRemove = useCallback((k: string) => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.commands.removeImageByKey(k);

        setImages((old) => old.filter(({ key }) => key !== k));
    }, []);

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
