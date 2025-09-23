import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Render, { SectionProps } from "./Render";

interface RHFNoteSectionProps extends SectionProps {
    name: string;
}

const RHFNoteSection: FC<RHFNoteSectionProps> = ({ name, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={(renderProps) => (
                <Render {...renderProps} noteSectionProps={props} />
            )}
        />
    );
};

export default RHFNoteSection;
