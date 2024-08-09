import { Button, TextField as MuiTextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useMemo, type FC } from "react";
import * as Yup from "yup";
import { useAuth } from "../../hooks/use-auth";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TranslationType } from "@/types/translation";
import { RHFTextField } from "../hook-form";

const Form = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(2),
}));

const TextField = styled(MuiTextField)({
    margin: 0,
});

const getSchema = (t: TranslationType) =>
    Yup.object({
        email: Yup.string()
            .email(t("Must be a valid email") || "")
            .max(255)
            .required(t("Email is required") || ""),
        password: Yup.string()
            .max(255)
            .required(t("Password is required") || ""),
    });

export const JWTLogin: FC = (props) => {
    const { t } = useTranslation();

    const schema = useMemo(() => getSchema(t), [t]);

    const router = useRouter();

    const { signin } = useAuth();

    const methods = useForm({
        values: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values: any) => {
        try {
            await signin(values.email, values.password);

            const returnUrl =
                (router.query.returnUrl as string | undefined) || "/";
            router.push(returnUrl).catch(console.error);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(handleSubmit)} {...props}>
                <RHFTextField
                    autoFocus
                    fullWidth
                    placeholder={t("Email Address") || ""}
                    margin="normal"
                    name="email"
                    type="email"
                />
                <RHFTextField
                    fullWidth
                    placeholder={t("Password") || ""}
                    margin="normal"
                    name="password"
                    type="password"
                />
                <Button
                    disabled={methods.formState.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    {t("Log In")}
                </Button>
            </Form>
        </FormProvider>
    );
};
