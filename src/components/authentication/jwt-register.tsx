import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useAuth } from "../../hooks/use-auth";
import { FormProvider, useForm } from "react-hook-form";
import { RHFTextField } from "../hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const schema = Yup.object({
    username: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    password: Yup.string().min(5).max(255).required("Password is required"),
    policy: Yup.boolean().oneOf([true], "This field must be checked"),
});

export const JWTRegister: FC = (props) => {
    const router = useRouter();
    const { signup } = useAuth();

    const methods = useForm({
        values: {
            username: "",
            password: "",
            policy: false,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values: any) => {
        try {
            await signup(values.username, values.password);
            router.push("/authentication/login");
        } catch (err) {
            router.push("/");
            console.error(err);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                noValidate
                onSubmit={methods.handleSubmit(handleSubmit)}
                {...props}
            >
                <RHFTextField
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    name="username"
                    type="email"
                />
                <RHFTextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    type="password"
                />
                <Box sx={{ mt: 2 }}>
                    <Button
                        disabled={methods.formState.isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Register
                    </Button>
                </Box>
            </form>
        </FormProvider>
    );
};
