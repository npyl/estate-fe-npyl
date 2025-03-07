import { forwardRef } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import Editor, { EditorProps, EditorRef } from "@/components/Editor";
import { TCommon } from "./types";

// ---------------------------------------------------------------------------

type RenderProps = Omit<EditorProps, "onChange"> &
    TCommon & {
        field: ControllerRenderProps<FieldValues, string>;
    };

// ---------------------------------------------------------------------------

const Render = forwardRef<EditorRef, RenderProps>(
    ({ field, onPlainTextChange, ...props }, ref) => {
        const { ref: _i0, value, onChange, ...restField } = field;

        return (
            <Editor
                ref={ref}
                content={value}
                onUpdate={onChange}
                onPlainTextUpdate={onPlainTextChange}
                {...restField}
                {...props}
            />
        );
    }
);

export default Render;
