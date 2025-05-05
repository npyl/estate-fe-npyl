import { FC, PropsWithChildren, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IDeal } from "./types";
import { styled, SxProps, Theme } from "@mui/material";

interface FormProps extends PropsWithChildren {
    sx?: SxProps<Theme>;
}

const StyledForm = styled("form")({});

const Form: FC<FormProps> = ({ children, sx }) => {
    const methods = useForm<IDeal>();
    const onSubmit = useCallback((d: IDeal) => {}, []);
    return (
        <StyledForm onSubmit={methods.handleSubmit(onSubmit)} sx={sx}>
            <FormProvider {...methods}>{children}</FormProvider>
        </StyledForm>
    );
};

export default Form;
