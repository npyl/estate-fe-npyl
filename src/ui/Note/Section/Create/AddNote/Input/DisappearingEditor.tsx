import Editor, { EditorRef } from "@/components/Editor";
import { forwardRef, PropsWithChildren, useEffect } from "react";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";

interface DisappearingEditorProps extends PropsWithChildren {}

const DisappearingEditor = forwardRef<EditorRef, DisappearingEditorProps>(
    ({ children, ...props }, ref) => {
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
