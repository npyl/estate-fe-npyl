import { string, object, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import NextLink from "next/link";
// import { LoadingButton } from "@mui/lab";
// import { Alert, InputAdornment, Link, Stack } from "@mui/material";
// import Iconify from "src/components/iconify/Iconify";
// import FormProvider, {
//     RHFCheckbox,
//     RHFTextField,
// } from "../../components/hook-form";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useSecurityContext } from "src/contexts/security";
import { useAllUsersQuery } from "src/services/user";
import { IUser } from "src/types/user";
import { FormProvider, useForm } from "react-hook-form";
import { RHFTextField } from "src/components/hook-form";

interface UserFormProps {
    open: boolean;
    user?: IUser;
    onClose: () => void;
}

interface FormFields {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobilePhone?: number;
    homePhone?: number;
    businessPhone?: number;
    officePhone?: number;
    callCenterNumber?: number;
    address?: string;
    zipCode?: string;
    city?: string;
    region?: string;
    afm?: number;
    doy?: number;
    gemh?: number;
    status?: string;
}

const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobilePhone: undefined,
    homePhone: undefined,
    businessPhone: undefined,
    officePhone: undefined,
    callCenterNumber: undefined,
    address: "",
    zipCode: "",
    city: "",
    region: "",
    afm: undefined,
    doy: undefined,
    gemh: undefined,
    status: "Inactive",
};

const Schema = object().shape({
    firstName: string().required(),
    lastName: string().required(),
    email: string()
        .email("Email must be a valid email address")
        .required("Email is required"),

    password: string().required("Password is required"),

    mobilePhone: number(),
    homePhone: number(),
    businessPhone: number(),
    officePhone: number(),
    callCenterNumber: number(),

    address: string(),
    zipCode: string(),
    city: string(),
    region: string(),

    afm: number(),
    doy: number(),
    gemh: number(),

    status: string().oneOf(["Active", "Inactive"]),
});

export const UserForm = ({ open, onClose }: UserFormProps) => {
    const { data: users } = useAllUsersQuery();
    const { selectedUser } = useSecurityContext();

    const methods = useForm<FormFields>({
        resolver: yupResolver(Schema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = methods;

    const user = useMemo(
        () =>
            (users &&
                selectedUser &&
                (users.find((u) => u.id === selectedUser) as IUser)) ||
            undefined,
        [users, selectedUser]
    );

    const [status, setStatus] = useState("Active");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [homePhone, setHomePhone] = useState("");
    const [businessPhone, setBusinessPhone] = useState("");
    const [officePhone, setOfficePhone] = useState("");
    const [callCenterNumber, setCallCenterNumber] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [region, setRegion] = useState("");
    const [afm, setAfm] = useState("");
    const [doy, setDoy] = useState("");
    const [gemh, setGemh] = useState("");
    const [email, setEmail] = useState("");

    // Delete Dialog
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

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
                        <Grid container flex={1} direction={"row"}>
                            <Grid xs={6}>
                                <Grid container>
                                    <RHFTextField
                                        name="firstName"
                                        label="First Name"
                                        margin="normal"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <RHFTextField
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <RHFTextField
                                        label="Business Phone"
                                        margin="normal"
                                        value={businessPhone}
                                        onChange={(e) =>
                                            setBusinessPhone(e.target.value)
                                        }
                                    />
                                    <RHFTextField
                                        label="Office Phone"
                                        margin="normal"
                                        value={officePhone}
                                        onChange={(e) =>
                                            setOfficePhone(e.target.value)
                                        }
                                        onChange={(value) =>
                                            setOfficePhone(value)
                                        }
                                    />
                                    <TextField
                                        label="Address"
                                        margin="normal"
                                        variant="outlined"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                    <RHFTextField
                                        label="Zip code"
                                        margin="normal"
                                        variant="outlined"
                                        value={zipCode}
                                        onChange={(value) => setZipCode(value)}
                                    />
                                    <RHFTextField
                                        label="ΑΦΜ"
                                        margin="normal"
                                        variant="outlined"
                                        value={afm}
                                        onChange={(value) => setAfm(value)}
                                    />
                                    <TextField
                                        label="ΔΟΥ"
                                        margin="normal"
                                        variant="outlined"
                                        value={doy}
                                        onChange={(event) =>
                                            setDoy(event.target.value)
                                        }
                                    />
                                    <RHFTextField
                                        label="ΓΕΜΥ"
                                        margin="normal"
                                        variant="outlined"
                                        value={gemh}
                                        onChange={(value) => setGemh(value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={6}>
                                <Grid container>
                                    <RHFTextField
                                        label="Last Name"
                                        margin="normal"
                                        variant="outlined"
                                        value={lastName}
                                        onChange={(value) => setLastName(value)}
                                        inputProps={{ maxLength: 50 }}
                                    />
                                    <RHFTextField
                                        label="Mobile Phone"
                                        margin="normal"
                                        variant="outlined"
                                        value={mobilePhone}
                                        onChange={(value) =>
                                            setMobilePhone(value)
                                        }
                                    />
                                    <RHFTextField
                                        label="Home Phone"
                                        margin="normal"
                                        variant="outlined"
                                        value={homePhone}
                                        onChange={(value) =>
                                            setHomePhone(value)
                                        }
                                    />
                                    <RHFTextField
                                        label="Call Center Number"
                                        margin="normal"
                                        variant="outlined"
                                        value={callCenterNumber}
                                        onChange={(value) =>
                                            setCallCenterNumber(value)
                                        }
                                    />
                                    <RHFTextField
                                        label="City"
                                        margin="normal"
                                        variant="outlined"
                                        value={city}
                                        onChange={(value) => setCity(value)}
                                    />
                                    <RHFTextField
                                        label="Region"
                                        margin="normal"
                                        variant="outlined"
                                        value={region}
                                        onChange={(value) => setRegion(value)}
                                    />
                                    <TextField
                                        select
                                        label="Status"
                                        margin="normal"
                                        variant="outlined"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <MenuItem value="Active">
                                            Active
                                        </MenuItem>
                                        <MenuItem value="Inactive">
                                            Inactive
                                        </MenuItem>
                                    </TextField>
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
        </>
    );
};
