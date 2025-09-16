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

const useContainer = () => {
    const containerRef = useRef(-1);

    const createContainer = useCallback((editor: Editor) => {
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

    return { containerRef, createContainer };
};

// ---------------------------------------------------------------------------------

const useEditorControl = (editorRef: RefObject<Editor>) => {
    const { containerRef, createContainer } = useContainer();

    const addImages = useCallback((f: File[]) => {
        const editor = editorRef.current;
        if (!editor) return;

        const i = f.map(getImageFromFile);

        createContainer(editor);

        editor.commands.addImageToContainer(containerRef.current, i, {
            style: IMG_STYLE,
        });
    }, []);

    const removeImage = useCallback((k: string) => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.commands.removeImageByKey(k);
    }, []);

    return { addImages, removeImage };
};

export default useEditorControl;
