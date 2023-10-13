import { yupResolver } from "@hookform/resolvers/yup";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useSecurityContext } from "src/contexts/security";
import { useAllUsersQuery } from "src/services/user";
import { IUser } from "src/types/user";
import { FormProvider, useForm } from "react-hook-form";
import { RHFSelect, RHFTextField } from "src/components/hook-form";
import Iconify from "src/components/iconify";
import { FormFields, Schema } from "./validation";

interface UserFormProps {
    open: boolean;
    user?: IUser;
    onClose: () => void;
}

export const UserForm = ({ open, onClose }: UserFormProps) => {
    const { data: users } = useAllUsersQuery();
    const { selectedUser } = useSecurityContext();

    const user = useMemo(
        () =>
            (users &&
                selectedUser &&
                (users.find((u) => u.id === selectedUser) as IUser)) ||
            undefined,
        [users, selectedUser]
    );

    const defaultValues = useMemo(
        () => ({
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
        }),
        [user]
    );

    const methods = useForm<FormFields>({
        resolver: yupResolver(Schema),
        defaultValues,
        mode: "onChange",
    });

    const {
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    // Delete Dialog
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleCreate = () => {};
    const handleDelete = () => {};
    const handleResetPassword = () => {};

    const onSubmit = (e: FormFields) => {};

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth={"lg"}>
                <DialogTitle>{user ? "Update" : "Create"} User</DialogTitle>
                <DialogContent>
                    <FormProvider
                        {...methods}
                        // handleSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid
                            container
                            flex={1}
                            direction={"row"}
                            p={1}
                            spacing={2}
                        >
                            <Grid item xs={6}>
                                <Grid container direction={"column"} gap={2}>
                                    <RHFTextField
                                        name="firstName"
                                        label="First Name"
                                    />
                                    <RHFTextField name="email" label="Email" />
                                    <RHFTextField
                                        name="businessPhone"
                                        label="Business Phone"
                                    />
                                    <RHFTextField
                                        name="officePhone"
                                        label="Office Phone"
                                    />
                                    <RHFTextField
                                        name="address"
                                        label="Address"
                                    />
                                    <RHFTextField
                                        name="zipCode"
                                        label="Zip code"
                                    />
                                    <RHFTextField name="afm" label="ΑΦΜ" />
                                    <RHFTextField name="doy" label="ΔΟΥ" />
                                    <RHFTextField name="gemh" label="ΓΕΜΥ" />
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction={"column"} gap={2}>
                                    <RHFTextField
                                        name="lastName"
                                        label="Last Name"
                                    />
                                    <RHFTextField
                                        name="password"
                                        label="Password (todo)"
                                        type={
                                            showPassword ? "text" : "password"
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
                                        name="mobilePhone"
                                        label="Mobile Phone"
                                    />
                                    <RHFTextField
                                        name="homePhone"
                                        label="Home Phone"
                                    />
                                    <RHFTextField
                                        name="callCenterNumber"
                                        label="Call Center Number"
                                    />
                                    <RHFTextField name="city" label="City" />
                                    <RHFTextField
                                        name="region"
                                        label="Region"
                                    />
                                    <RHFSelect
                                        select
                                        name="status"
                                        label="Status (not-supported)"
                                    >
                                        <MenuItem value="Active">
                                            Active
                                        </MenuItem>
                                        <MenuItem value="Inactive">
                                            Inactive
                                        </MenuItem>
                                    </RHFSelect>
                                </Grid>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </DialogContent>
                {user && (
                    <DialogActions>
                        <Button onClick={handleResetPassword} color="primary">
                            Reset Password
                        </Button>
                        <Button
                            onClick={handleOpenDelete}
                            color="secondary"
                            sx={{ backgroundColor: "red", color: "white" }}
                        >
                            Delete User
                        </Button>
                    </DialogActions>
                )}
                <DialogActions>
                    <Button onClick={handleCreate} color="primary">
                        {user ? "Update" : "Create"}
                    </Button>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Delete Dialog */}
            {openDelete && (
                <Dialog open={openDelete} onClose={handleCloseDelete}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete the user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};
