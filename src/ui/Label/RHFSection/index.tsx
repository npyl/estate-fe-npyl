import { Controller, useFormContext } from "react-hook-form";
import Render, { SectionProps } from "./Render";
import { FC } from "react";

interface RHFCreateProps extends SectionProps {
    name: string;
}

const RHFCreate: FC<RHFCreateProps> = ({ name, ...labelSectionProps }) => {
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

export default RHFCreate;
