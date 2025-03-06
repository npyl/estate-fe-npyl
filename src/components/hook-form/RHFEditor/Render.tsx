import { forwardRef, RefObject, useCallback, useLayoutEffect } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import Editor, { EditorProps, EditorRef } from "@/components/Editor";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import { TCommon } from "./types";

// ---------------------------------------------------------------------------

type RenderProps = Omit<EditorProps, "onChange"> &
    TCommon & {
        field: ControllerRenderProps<FieldValues, string>;
    };

// ---------------------------------------------------------------------------

const useOnChange = (
    editorRef: RefObject<EditorRef>,
    onChange: (...event: any[]) => void,
    onPlainTextChange?: (plain: string) => void
) => {
    const handleUpdate = useCallback(() => {
        const value = editorRef.current?.getHTML() || "";

        const plain = onPlainTextChange
            ? editorRef.current?.getText() || ""
            : "";

        onChange(value);
        onPlainTextChange?.(plain);
    }, [onChange, onPlainTextChange]);

    useLayoutEffect(() => {
        editorRef.current?.on("update", handleUpdate);

        return () => {
            editorRef.current?.off("update", handleUpdate);
        };
    }, [handleUpdate]);
};

// ---------------------------------------------------------------------------

const Render = forwardRef<EditorRef, RenderProps>(
    ({ field, debounced = false, onPlainTextChange, ...props }, ref) => {
        const { ref: _i0, name, value, onChange, ...restField } = field;

        console.log("NAME: ", name);

        const editorRef = useForwardedLocalRef<EditorRef>(ref);
        useOnChange(editorRef, onChange, onPlainTextChange);

        return (
            <Editor ref={editorRef} content={value} {...restField} {...props} />
        );
    }
);

export default Render;
