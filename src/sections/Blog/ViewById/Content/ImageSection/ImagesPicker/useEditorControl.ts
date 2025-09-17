import { RefObject, useCallback, useRef } from "react";
import { Editor } from "@tiptap/react";
import { IPropertyImage } from "@/types/file";
import { getAllContainers } from "@/components/Editor/extensions/Image";
import uuidv4 from "@/utils/uuidv4";

const IMG_CONTAINER_STYLE =
    "display: flex; flex-direction: row; gap: 8px; height: fit-content; width: 100%;";
const IMG_STYLE =
    "width: 50%; height: auto; object-fit: fit; border-radius: 8px;";

interface IPropertyImageSafe extends Omit<IPropertyImage, "src"> {
    url: string;
}

const getImageFromFile = (f: File): IPropertyImageSafe => {
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

const useContainer = (editorRef: RefObject<Editor>) => {
    const containerRef = useRef(-1);

    const createContainer = useCallback(() => {
        const editor = editorRef.current;
        if (!editor) return;

        // INFO: created a container only if necessary!
        if (containerRef.current !== -1) return;

        editor.commands.createContainer({
            HTMLAttributes: {
                style: IMG_CONTAINER_STYLE,
            },
        });

        const containers = getAllContainers(editor.state);
        const latestContainer = containers[containers.length - 1];

        containerRef.current = latestContainer.pos;
    }, []);

    const addImages = useCallback((i: IPropertyImageSafe[]) => {
        const editor = editorRef.current;
        editor?.commands.addImageToContainer(containerRef.current, i, {
            style: IMG_STYLE,
        });
    }, []);

    const removeAllImages = useCallback(() => {
        const editor = editorRef.current;
        editor?.commands.removeAllImages(containerRef.current);
    }, []);

    return { createContainer, addImages, removeAllImages };
};

// ---------------------------------------------------------------------------------

const useEditorControl = (editorRef: RefObject<Editor>) => {
    const { createContainer, addImages, removeAllImages } =
        useContainer(editorRef);

    const setImages = useCallback((f: File[]) => {
        createContainer();

        removeAllImages();

        const i = f.map(getImageFromFile);
        if (i.length === 0) return;
        addImages(i);
    }, []);

    return { setImages };
};

export default useEditorControl;
