import { Editor, useEditor } from "@tiptap/react";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { extensions } from "./config";

type EditorState = {
    editor: Editor | null;
};

const EditorContext = createContext<EditorState | undefined>(undefined);

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error(
            "EditorContext value is undefined. Make sure you use the EditorContext before using the context."
        );
    }
    return context;
};

interface EditorProviderProps extends PropsWithChildren {
    content?: string;
    editable?: boolean;
}

export const EditorProvider: FC<EditorProviderProps> = ({
    content,
    editable,
    ...props
}) => {
    const editor = useEditor({
        extensions,
        content,
        editable,
        immediatelyRender: false, // INFO: documentation states that this needs to be false in Next.js applications to prevent Hydration errors
    });

    return (
        <EditorContext.Provider
            value={{
                editor,
            }}
            {...props}
        />
    );
};
