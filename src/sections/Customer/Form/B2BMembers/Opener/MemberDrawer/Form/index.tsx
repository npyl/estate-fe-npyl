import { B2BMemberReq } from "@/types/customer";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import getDefaultValues from "./getDefaultValues";
import { B2BMemberReqYup } from "./types";
import getSchema from "./getSchema";

interface FormProps extends PropsWithChildren {
    member?: B2BMemberReq;
}

const Form: FC<FormProps> = ({ member, children }) => {
    const { t } = useTranslation();

    const schema = useMemo(() => getSchema(t), [t]);

    const methods = useForm<B2BMemberReqYup>({
        values: getDefaultValues(member),
        resolver: yupResolver(schema),
    });

    return (
        <Stack spacing={1} component="form">
            <FormProvider {...methods}>{children}</FormProvider>
        </Stack>
    );
};

export default Form;
