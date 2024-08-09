import { yupResolver } from "@hookform/resolvers/yup";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { RHFSelect, RHFTextField } from "src/components/hook-form";
import Iconify from "src/components/iconify";
import { useSecurityContext } from "src/contexts/security";
import {
    useAddUserMutation,
    useAllUsersQuery,
    useDeleteUserMutation,
    useProfileQuery,
    useResetPasswordMutation,
} from "src/services/user";
import { IUser, IUserPOST } from "src/types/user";
import { Schema } from "./validation";

interface UserFormProps {
    open: boolean;
    onClose: () => void;
}

export const UserForm = ({ open, onClose }: UserFormProps) => {
    const { data: users, isLoading } = useAllUsersQuery();
    const [newPassword, setNewPassword] = useState("");
    const { selectedUser } = useSecurityContext();
    const [resetPassword, { isLoading: isResetLoading }] =
        useResetPasswordMutation();
    const { data: profile } = useProfileQuery();
    const [transferId, setTransferId] = useState<number | null>(null);
    const { t } = useTranslation();
    const user: IUser | null = useMemo(() => {
        if (!users || selectedUser === -1) return null;

        return users.find((u) => u.id === selectedUser) || null;
    }, [users, selectedUser]);

    const defaultValues = useMemo(
        () => ({
            id: selectedUser !== -1 ? selectedUser : null,
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            password: user?.password || "",
            mobilePhone: user?.mobilePhone || "",
            homePhone: user?.homePhone || "",
            businessPhone: user?.businessPhone || "",
            officePhone: user?.officePhone || "",
            callCenterNumber: user?.callCenterNumber || "",
            address: user?.address || "",
            zipCode: user?.zipCode || "",
            city: user?.city || "",
            region: user?.region || "",
            afm: user?.afm || "",
            doy: user?.doy || "",
            gemh: user?.gemh || "",
            status: "Active",
            preferredLanguage: user?.preferredLanguage?.key || "ENGLISH",
        }),
        [user]
    );

    const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation();

    const methods = useForm<IUserPOST>({
        resolver: yupResolver(Schema),
        defaultValues,
        mode: "onChange",
    });

    useEffect(() => {
        if (isLoading) return;
        methods.reset({ ...defaultValues });
    }, [isLoading, defaultValues]);

    // Delete Dialog
    const [openDelete, setOpenDelete] = useState(false);
    const [openReset, setOpenReset] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    const [deleteUser, { isLoading: isDeleteUserLoading }] =
        useDeleteUserMutation();
    const [showPassword, setShowPassword] = useState(false);

    const handleDelete = () => {
        deleteUser({ userId: selectedUser, transferId: transferId }).then(
            (e: any) => {
                handleCloseDelete();
                onClose();
                !e.error && toast.success(t("Success"));
            }
        );
    };
    const handleResetPassword = () => {
        resetPassword({ userId: selectedUser, newPassword }).then(
            (e: any) => !e.error && toast.success(t("Success"))
        );
        setOpenReset(false);
        onClose();
    };

    const onSubmit = ({ status, ...user }: IUserPOST) => {
        addUser({ user, profilePhoto: undefined });
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="lg">
                <DialogTitle>
                    {t(user ? "User Update" : "Create User")}
                </DialogTitle>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <DialogContent>
                            <Grid
                                container
                                flex={1}
                                direction="row"
                                p={1}
                                spacing={2}
                            >
                                <Grid item xs={12} sm={6}>
                                    <Grid
                                        container
                                        direction={"column"}
                                        gap={2}
                                    >
                                        <RHFTextField
                                            required
                                            name="firstName"
                                            label={t("First Name")}
                                        />
                                        <RHFTextField
                                            required
                                            name="email"
                                            label={t("Email")}
                                        />
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
                                        <RHFTextField
                                            name="afm"
                                            label={t("ΑΦΜ")}
                                        />
                                        <RHFTextField
                                            name="doy"
                                            label={t("ΔΟΥ")}
                                        />
                                        <RHFTextField
                                            name="gemh"
                                            label={t("ΓΕΜΥ")}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid
                                        container
                                        direction={"column"}
                                        gap={2}
                                    >
                                        <RHFTextField
                                            required
                                            name="lastName"
                                            label={t("Last Name")}
                                        />
                                        <RHFTextField
                                            required
                                            name="password"
                                            label={t("Password")}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                        sx={{
                                                            mb: 0.5,
                                                            mr: 1.5,
                                                        }}
                                                    >
                                                        <IconButton
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
                                                            }
                                                            edge="end"
                                                        >
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
                                        <RHFTextField
                                            required
                                            name="mobilePhone"
                                            label={t("Mobile Phone")}
                                        />
                                        <RHFTextField
                                            name="homePhone"
                                            label={t("Home Phone")}
                                        />
                                        <RHFTextField
                                            name="callCenterNumber"
                                            label={t("Call Center Number")}
                                        />
                                        <RHFTextField
                                            required
                                            name="city"
                                            label={t("City")}
                                        />
                                        <RHFTextField
                                            required
                                            name="region"
                                            label={t("Region")}
                                        />
                                        <RHFSelect
                                            name="status"
                                            label={t("Status")}
                                        >
                                            <MenuItem value="Active">
                                                {t("Active")}
                                            </MenuItem>
                                            <MenuItem value="Inactive">
                                                {t("Inactive")}
                                            </MenuItem>
                                        </RHFSelect>
                                        <RHFSelect
                                            name="preferredLanguage"
                                            label={t("Preferred Language")}
                                        >
                                            <MenuItem value="ENGLISH">
                                                {t("English")}
                                            </MenuItem>
                                            <MenuItem value="GREEK">
                                                {t("Greek")}
                                            </MenuItem>
                                        </RHFSelect>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        {user && (
                            <DialogActions>
                                <Button
                                    onClick={() => setOpenReset(true)}
                                    color="primary"
                                >
                                    {t("Reset Password")}
                                </Button>
                                {profile?.id !== selectedUser && (
                                    <Button
                                        onClick={handleOpenDelete}
                                        color="error"
                                        variant="contained"
                                    >
                                        <Typography>
                                            {t("Delete User")}
                                        </Typography>
                                    </Button>
                                )}
                            </DialogActions>
                        )}
                        <DialogActions>
                            <Button
                                disabled={isAddUserLoading}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                <Typography>
                                    {user ? t("Update") : t("Create")}
                                </Typography>
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={onClose}
                                color="secondary"
                            >
                                <Typography>{t("Cancel")}</Typography>
                            </Button>
                        </DialogActions>
                    </form>
                </FormProvider>
            </Dialog>
            {/* Delete Dialog */}
            {openDelete && (
                <Dialog open={openDelete} onClose={handleCloseDelete}>
                    <DialogTitle>{t("Confirm Deletion")}</DialogTitle>
                    <DialogContent>
                        {t("Are you sure you want to delete the user?")}
                        <FormControl>
                            <Stack direction={"column"} pt={0.5}>
                                <Box display="flex" alignItems={"center"}>
                                    <Typography
                                        sx={{ display: "flex" }}
                                        color={"neutral.400"}
                                        variant={"body2"}
                                    >
                                        {t(
                                            "Select user to transfer properties"
                                        )}
                                        :
                                    </Typography>
                                </Box>

                                <Select
                                    labelId="demo-simple-select-label"
                                    value={transferId ?? -1}
                                    onChange={(e) => {
                                        setTransferId(+e.target.value!);
                                    }}
                                    renderValue={(selected) => (
                                        <Typography
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {
                                                users?.find(
                                                    (e) => e.id === selected
                                                )?.username
                                            }
                                        </Typography>
                                    )}
                                >
                                    {users &&
                                        users.length > 0 &&
                                        users.map((user: IUser) => (
                                            <MenuItem
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.username}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </Stack>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelete} color="primary">
                            {t("Cancel")}
                        </Button>
                        <Button
                            disabled={isDeleteUserLoading}
                            onClick={handleDelete}
                            color="secondary"
                        >
                            {t("Delete")}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            {openReset && (
                <Dialog open={openReset} onClose={() => setOpenReset(false)}>
                    <DialogTitle>{t("Reset Password")}</DialogTitle>
                    <Box p={1}>
                        <TextField
                            label={"Password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Box>
                    <DialogActions>
                        <Button
                            onClick={() => setOpenReset(false)}
                            color="primary"
                        >
                            {t("Cancel")}
                        </Button>
                        <Button
                            disabled={isResetLoading}
                            onClick={handleResetPassword}
                            color="secondary"
                        >
                            {t("Reset")}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};
