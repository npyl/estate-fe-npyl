import { Controller, useFormContext } from "react-hook-form";
import { useEditorHandleContext } from "./context/EditorHandle";
import RHFEditor from "@/components/hook-form/dynamic/RHFEditor";
import WithDynamicName from "@/components/hook-form/dynamic/WithDynamicName";
import { FC } from "react";

// (*): `name` corresponds to `descriptionTextName` for plainText; Also call it "name" to leverage WithDynamicName()

interface EditorProps {
    name: string; // (*)
    descriptionName: string;
}

const Editor: FC<EditorProps> = ({
    name: descriptionTextName, // (*)
    descriptionName,
}) => {
    const { control } = useFormContext();
    const { onRef } = useEditorHandleContext();
    return (
        <Controller
            name={descriptionTextName} // (*)
            control={control}
            render={({ field: { onChange } }) => (
                <RHFEditor
                    ref={onRef}
                    name={descriptionName}
                    onPlainTextChange={onChange}
                />
            )}
        />
    );
};

export default WithDynamicName(Editor); // (*)
