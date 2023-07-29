import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import type { FC } from "react";
import * as Yup from "yup";
import { useAuth } from "../../hooks/use-auth";
import { useMounted } from "../../hooks/use-mounted";

export const JWTRegister: FC = (props) => {
    const isMounted = useMounted();
    const router = useRouter();
    const { signup } = useAuth();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            policy: false,
            submit: null,
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
            password: Yup.string()
                .min(5)
                .max(255)
                .required("Password is required"),
            policy: Yup.boolean().oneOf([true], "This field must be checked"),
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                await signup(values.username, values.password);
                router.push("/authentication/login").catch(console.error);
                if (isMounted()) {
                    const returnUrl =
                        (router.query.returnUrl as string | undefined) ||
                        "/authentication/login";
                }
            } catch (err) {
                router.push("/");
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
        <form noValidate onSubmit={formik.handleSubmit} {...props}>
            <TextField
                error={Boolean(
                    formik.touched.username && formik.errors.username
                )}
                fullWidth
                helperText={formik.touched.username && formik.errors.username}
                label="Email Address"
                margin="normal"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.username}
            />
            <TextField
                error={Boolean(
                    formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
            />
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    ml: -1,
                    mt: 2,
                }}
            >
                <Checkbox
                    checked={formik.values.policy}
                    name="policy"
                    onChange={formik.handleChange}
                />
                <Typography color="textSecondary" variant="body2">
                    I have read the <Link href="#">Terms and Conditions</Link>
                </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            {formik.errors.submit && (
                <Box sx={{ mt: 3 }}>
                    <FormHelperText error>
                        {formik.errors.submit}
                    </FormHelperText>
                </Box>
            )}
            <Box sx={{ mt: 2 }}>
                <Button
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Register
                </Button>
            </Box>
        </form>
    );
};
