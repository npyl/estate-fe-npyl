import { Controller, useFormContext } from "react-hook-form";
import Render from "./Render";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";

interface RHFCreateProps {
    sx?: SxProps<Theme>;
}

const RHFCreate: FC<RHFCreateProps> = ({ sx }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name="labels"
            control={control}
            render={(renderProps) => <Render {...renderProps} sx={sx} />}
        />
    );
};

export default RHFCreate;
