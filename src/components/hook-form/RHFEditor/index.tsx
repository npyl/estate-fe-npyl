import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { EditorProps, EditorRef } from "@/components/Editor";
import { TCommon } from "./types";
import Render from "./Render";

// -----------------------------------------------------------------

type RHFEditorProps = Omit<EditorProps, "content" | "onChange"> &
    TCommon & {
        name: string;
    };

const RHFEditor = forwardRef<EditorRef, RHFEditorProps>(
    ({ name, ...props }, ref) => {
        const { control } = useFormContext();
        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Render ref={ref} field={field} {...props} />
                )}
            />
        );
    }
);

export default RHFEditor;
