import {
    createContext,
    FC,
    forwardRef,
    PropsWithChildren,
    RefObject,
    useContext,
    useRef,
} from "react";
import { Editor } from "@tiptap/core";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";

type State = {
    editorRef: RefObject<Editor>;
    onRef: (node: Editor | null) => void;
};

const EditorHandleContext = createContext<State | undefined>(undefined);

export const useEditorHandleContext = () => {
    const context = useContext(EditorHandleContext);
    if (context === undefined) {
        throw new Error(
            "EditorHandleContext value is undefined. Make sure you use the EditorHandleContext before using the context."
        );
    }
    return context;
};

interface EditorHandleProps extends PropsWithChildren {}

export const EditorHandleProvider = forwardRef<Editor, EditorHandleProps>(
    (props, ref) => {
        const [editorRef, { onRef }] = useForwardedLocalRef<Editor>(ref);

        return (
            <EditorHandleContext.Provider
                value={{
                    editorRef,
                    onRef,
                }}
                {...props}
            />
        );
    }
);
