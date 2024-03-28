import {
    Button,
    FormHelperText,
    TextField as MuiTextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import type { FC } from "react";
import * as Yup from "yup";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";
import { useTranslation } from "react-i18next";

const Form = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(2),
}));

const TextField = styled(MuiTextField)({
    margin: 0,
});

export const JWTLogin: FC = (props) => {
    const { t } = useTranslation();
    const router = useRouter();
    const isMounted = useMounted();
    const { signin } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            submit: null,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(t("Must be a valid email") || "")
                .max(255)
                .required(t("Email is required") || ""),
            password: Yup.string()
                .max(255)
                .required(t("Password is required") || ""),
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                await signin(values.email, values.password);

                if (isMounted()) {
                    const returnUrl =
                        (router.query.returnUrl as string | undefined) || "/";
                    router.push(returnUrl).catch(console.error);
                }
            } catch (err) {
                console.error(err);

                if (isMounted()) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                }
            }
        },
    });

    return (
        <Form noValidate onSubmit={formik.handleSubmit} {...props}>
            <TextField
                autoFocus
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                placeholder={t("Email Address") || ""}
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
            />
            <TextField
                error={Boolean(
                    formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                placeholder={t("Password") || ""}
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
            />
            {formik.errors.submit && (
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
            )}
            <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
            >
                {t("Log In")}
            </Button>
        </Form>
    );
};
