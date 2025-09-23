import Editor, { EditorProps, EditorRef } from "@/components/Editor";
import { forwardRef, useEffect } from "react";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";

interface DisappearingEditorProps extends EditorProps {}

const DisappearingEditor = forwardRef<EditorRef, DisappearingEditorProps>(
    (props, ref) => {
        const [localRef, { onRef }] = useForwardedLocalRef(ref);

        // Focus on editor appear
        useEffect(() => {
            requestAnimationFrame(() => {
                localRef.current?.commands.focus();
            });
        }, [localRef]);

        return <Editor ref={onRef} {...props} />;
    }
);

DisappearingEditor.displayName = "DisappearingEditor";

export default DisappearingEditor;
