import { Controller, useFormContext } from "react-hook-form";
import Render, { SectionProps } from "./Render";
import { FC } from "react";

interface RHFLabelSectionProps extends SectionProps {
    name: string;
}

const RHFLabelSection: FC<RHFLabelSectionProps> = ({
    name,
    ...labelSectionProps
}) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={(renderProps) => (
                <Render
                    {...renderProps}
                    labelSectionProps={labelSectionProps}
                />
            )}
        />
    );
};

export default RHFLabelSection;
