import { forwardRef, useCallback, useLayoutEffect } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import Editor, { EditorProps, EditorRef } from "@/components/Editor";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import { TCommon } from "./types";

type RenderProps = Omit<EditorProps, "onChange"> &
    TCommon & {
        field: ControllerRenderProps<FieldValues, string>;
    };

const Render = forwardRef<EditorRef, RenderProps>(
    ({ field, debounced = false, onChange, ...props }, ref) => {
        const {
            ref: _i0,
            name,
            value,
            onChange: onRHFChange,
            ...restField
        } = field;

        const editorRef = useForwardedLocalRef<EditorRef>(ref);

        const handleUpdate = useCallback(async () => {
            const value = editorRef.current?.getHTML() || "";
            const plain = onChange ? editorRef.current?.getText() || "" : "";

            onRHFChange(value);
            onChange?.(value, plain);
        }, [onRHFChange, onChange]);

        useLayoutEffect(() => {
            editorRef.current?.on("update", handleUpdate);

            return () => {
                editorRef.current?.off("update", handleUpdate);
            };
        }, [handleUpdate]);

        return (
            <Editor ref={editorRef} content={value} {...restField} {...props} />
        );
    }
);

export default Render;
