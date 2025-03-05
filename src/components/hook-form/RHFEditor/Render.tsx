import { forwardRef, useCallback, useLayoutEffect } from "react";
import {
    ControllerRenderProps,
    FieldValues,
    useFormContext,
} from "react-hook-form";
import Editor, { EditorProps, EditorRef } from "@/components/Editor";
import sleep from "@/utils/sleep";
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

        const { getValues } = useFormContext();
        useLayoutEffect(() => {
            const content = getValues(name);
            editorRef.current?.commands.setContent(content);
        }, [name]);

        const handleUpdate = useCallback(async () => {
            // INFO: Make sure we debounce a bit (if enabled)
            if (debounced) await sleep(200);

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
