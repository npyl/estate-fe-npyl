import { Grid, IconButton, InputAdornment, MenuItem } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { RHFSelect, RHFTextField } from "@/components/hook-form";
import Iconify from "src/components/iconify";
import { IUser } from "@/types/user";
import GoogleWorkspaceEmail from "./GoogleWorkspaceEmail";
import { useAuth } from "@/sections/use-auth";
import useToggle from "@/hooks/useToggle";

const PasswordField = () => {
    const { t } = useTranslation();

    const [showPassword, togglePassword] = useToggle();

    return (
        <RHFTextField
            required
            name="password"
            label={t("Password")}
            type={showPassword ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment
                        position="end"
                        sx={{
                            mb: 0.5,
                            mr: 1.5,
                        }}
                    >
                        <IconButton onClick={togglePassword} edge="end">
                            <Iconify
                                icon={
                                    showPassword
                                        ? "eva:eye-fill"
                                        : "eva:eye-off-fill"
                                }
                            />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

interface ContentProps {
    user?: IUser;
}

const Content: FC<ContentProps> = ({ user }) => {
    const { t } = useTranslation();

    const isAdmin = useAuth().user?.isAdmin;

    return (
        <Grid container flex={1} direction="row" p={1} spacing={2}>
            <Grid item xs={12} sm={6}>
                <Grid container direction={"column"} gap={2}>
                    <RHFTextField
                        required
                        name="firstName"
                        label={t("First Name")}
                    />

                    {/* INFO: admin-only block */}
                    <>
                        <RHFTextField
                            required
                            name="email"
                            label={t("Email")}
                            disabled={!isAdmin}
                        />

                        {isAdmin ? (
                            <GoogleWorkspaceEmail
                                email={user?.workspaceEmail}
                            />
                        ) : null}
                    </>

                    <RHFTextField
                        name="businessPhone"
                        label={t("Business Phone")}
                    />
                    <RHFTextField
                        name="officePhone"
                        label={t("Office Phone")}
                    />
                    <RHFTextField
                        required
                        name="address"
                        label={t("Address")}
                    />
                    <RHFTextField
                        required
                        name="zipCode"
                        label={t("Zip code")}
                    />
                    <RHFTextField name="afm" label={t("ΑΦΜ")} />
                    <RHFTextField name="doy" label={t("ΔΟΥ")} />
                    <RHFTextField name="gemh" label={t("ΓΕΜΥ")} />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container direction={"column"} gap={2}>
                    <RHFTextField
                        required
                        name="lastName"
                        label={t("Last Name")}
                    />

                    {!Boolean(user) ? <PasswordField /> : null}

                    <RHFTextField
                        required
                        name="mobilePhone"
                        label={t("Mobile Phone")}
                    />
                    <RHFTextField name="homePhone" label={t("Home Phone")} />
                    <RHFTextField
                        name="callCenterNumber"
                        label={t("Call Center Number")}
                    />
                    <RHFTextField required name="city" label={t("City")} />
                    <RHFTextField required name="region" label={t("Region")} />
                    <RHFSelect name="status" label={t("Status")}>
                        <MenuItem value="Active">{t("Active")}</MenuItem>
                        <MenuItem value="Inactive">{t("Inactive")}</MenuItem>
                    </RHFSelect>
                    <RHFSelect
                        name="preferredLanguage"
                        label={t("Preferred Language")}
                    >
                        <MenuItem value="ENGLISH">{t("English")}</MenuItem>
                        <MenuItem value="GREEK">{t("Greek")}</MenuItem>
                    </RHFSelect>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Content;
