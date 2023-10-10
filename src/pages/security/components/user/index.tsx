import EditIcon from "@mui/icons-material/Edit"; // Make sure to import EditIcon
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import React, { FC, useMemo, useState } from "react";
import OnlyEmailInput from "src/components/OnlyEmailInput";
import OnlyLettersInput from "src/components/OnlyLetters";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import { useSecurityContext } from "src/contexts/security";
import { useAllUsersQuery } from "src/services/user";
import { IUser } from "src/types/user";

type Props = {
    changeTab: (event: React.SyntheticEvent, newValue: number) => void;
};

interface UserFormProps {
    open: boolean;
    user?: IUser;
    onClose: () => void;
}

const UserForm = ({ open, onClose }: UserFormProps) => {
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

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{user ? "Update" : "Create"} User</DialogTitle>
                <DialogContent>
                    <OnlyLettersInput
                        label="First Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={firstName}
                        onChange={(value) => setFirstName(value)}
                        inputProps={{ maxLength: 50 }}
                    />
                    <OnlyLettersInput
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={lastName}
                        onChange={(value) => setLastName(value)}
                        inputProps={{ maxLength: 50 }}
                    />
                    <OnlyEmailInput
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={(value) => setEmail(value)}
                    />
                    <OnlyNumbersInput
                        label="Mobile Phone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={mobilePhone}
                        onChange={(value) => setMobilePhone(value)}
                    />
                    <OnlyNumbersInput
                        label="Home Phone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={homePhone}
                        onChange={(value) => setHomePhone(value)}
                    />
                    <OnlyNumbersInput
                        label="Business Phone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={businessPhone}
                        onChange={(value) => setBusinessPhone(value)}
                    />
                    <OnlyNumbersInput
                        label="Office Phone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={officePhone}
                        onChange={(value) => setOfficePhone(value)}
                    />
                    <OnlyNumbersInput
                        label="Call Center Number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={callCenterNumber}
                        onChange={(value) => setCallCenterNumber(value)}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <OnlyNumbersInput
                        label="Zip code"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={zipCode}
                        onChange={(value) => setZipCode(value)}
                    />
                    <OnlyLettersInput
                        label="City"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={city}
                        onChange={(value) => setCity(value)}
                    />
                    <OnlyLettersInput
                        label="Region"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={region}
                        onChange={(value) => setRegion(value)}
                    />
                    <OnlyNumbersInput
                        label="ΑΦΜ"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={afm}
                        onChange={(value) => setAfm(value)}
                    />
                    <TextField
                        label="ΔΟΥ"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={doy}
                        onChange={(event) => setDoy(event.target.value)}
                    />
                    <OnlyNumbersInput
                        label="ΓΕΜΥ"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={gemh}
                        onChange={(value) => setGemh(value)}
                    />
                    <TextField
                        select
                        label="Status"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
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

const UserPage: FC<Props> = ({ changeTab }) => {
    const { data: users } = useAllUsersQuery();
    const { setSelectedUser } = useSecurityContext();

    const [openUserForm, setOpenUserForm] = useState(false);

    const handleOpenUserForm = () => setOpenUserForm(true);
    const handleCloseUserForm = () => {
        setOpenUserForm(false);
        setSelectedUser(-1);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: "20px" }}
                onClick={handleOpenUserForm}
            >
                Create User
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>status</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Permissions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            setSelectedUser(user.id);
                                            handleOpenUserForm();
                                        }}
                                        sx={{ ml: 1, mr: -1 }}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="text"
                                        color="success"
                                        onClick={(e) => {
                                            changeTab(e, 1);
                                            setSelectedUser(user.id);
                                        }}
                                    >
                                        Set
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openUserForm && (
                <UserForm open={openUserForm} onClose={handleCloseUserForm} />
            )}
        </div>
    );
};

export default UserPage;
