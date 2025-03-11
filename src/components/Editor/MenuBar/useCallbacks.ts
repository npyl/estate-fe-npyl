import { useMemo } from "react";
import { useEditorContext } from "../context";

const useCallbacks = () => {
    const { editor } = useEditorContext();

    return useMemo(
        () => ({
            toggleBold: () => editor!.chain().focus().toggleBold().run(),
            toggleItalic: () => editor!.chain().focus().toggleItalic().run(),
            toggleUnderline: () =>
                editor!.chain().focus().toggleUnderline().run(),
            toggleStrike: () => editor!.chain().focus().toggleStrike().run(),
            toggleBulletList: () =>
                editor!.chain().focus().toggleBulletList().run(),
            toggleOrderedList: () =>
                editor!.chain().focus().toggleOrderedList().run(),
        }),
        []
    );
};

export default useCallbacks;
