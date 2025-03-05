import {
    createContext,
    FC,
    PropsWithChildren,
    RefObject,
    useContext,
    useRef,
} from "react";
import { Editor } from "@tiptap/core";

type State = {
    editorRef: RefObject<Editor>;
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

export const EditorHandleProvider: FC<EditorHandleProps> = (props) => {
    const editorRef = useRef<Editor>(null);

    return (
        <EditorHandleContext.Provider
            value={{
                editorRef,
            }}
            {...props}
        />
    );
};
