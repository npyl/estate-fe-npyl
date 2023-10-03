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
import React, { FC, useState } from "react";
import OnlyEmailInput from "src/components/OnlyEmailInput";
import OnlyLettersInput from "src/components/OnlyLetters";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import validator from "validator";

type Props = {
    changeTab: (event: React.SyntheticEvent, newValue: number) => void;
    setSelectedUser: (value: ((prevState: number) => number) | number) => void;
};

const UserPage: FC<Props> = ({ changeTab, setSelectedUser }) => {
    const users = [
        {
            id: 1,
            username: "ADMIN",
            firstName: "ADMIN",
            lastName: "ADMIN",
            status: "Active",
            email: "admin1@example.com",
        },
        {
            id: 2,
            username: "Panagiotis",
            firstName: "Panagiotis",
            lastName: "Athanasopoulos",
            status: "Active",
            email: "user1@example.com",
        },
        {
            id: 3,
            username: "Leo",
            firstName: "Leonidas",
            lastName: "Panagiotou",
            status: "Inactive",
            email: "user2@example.com",
        },
        {
            id: 4,
            username: "Vagelis",
            firstName: "Vagelis",
            lastName: "Kleitsas",
            status: "Inactive",
            email: "user2@example.com",
        },
        {
            id: 5,
            username: "Athanasios",
            firstName: "Athanasios",
            lastName: "Kalatheris",
            status: "Inactive",
            email: "user2@example.com",
        },
        {
            id: 6,
            username: "Taxi",
            firstName: "Taxiarxis",
            lastName: "Zarwnis",
            status: "Inactive",
            email: "user2@example.com",
        },
        {
            id: 7,
            username: "George",
            firstName: "George",
            lastName: "Katrougkalos",
            status: "Inactive",
            email: "user2@example.com",
        },
        {
            id: 8,
            username: "Kostas",
            firstName: "Kostas",
            lastName: "Mermelas",
            status: "Inactive",
            email: "user2@example.com",
        },
        {
            id: 9,
            username: "Omiros",
            firstName: "Omiros",
            lastName: "Panagiotoskilopoulos",
            status: "Inactive",
            email: "user2@example.com",
        },
        {
            id: 10,
            username: "Mili",
            firstName: "Mili",
            lastName: "Kopanitsanoskilopoylou",
            status: "Inactive",
            email: "user2@example.com",
        },
        {
            id: 11,
            username: "Pete",
            firstName: "Pete",
            lastName: "Marakos",
            status: "Inactive",
            email: "user2@example.com",
        },
    ];

    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
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
    const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
        useState(false);

    // const handleEdit = (userId) => {
    //     console.log(`Edit user with ID ${userId}`);
    // };

    const handleCreateUserClick = () => {
        setIsCreateUserModalOpen(true);
    };

    const handleCloseCreateUserModal = () => {
        setIsCreateUserModalOpen(false);
    };

    const handleCreateUser = () => {
        if (!validator.isEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        handleCloseCreateUserModal();
    };

    const handleUpdateUserClick = () => setIsUpdateUserModalOpen(true);
    const handleCloseUpdateUserModal = () => setIsUpdateUserModalOpen(false);

    const handleUpdateUser = () => {
        if (!validator.isEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        handleCloseUpdateUserModal();
    };

    const handleResetPassword = () => {
        console.log("Resetting user password...");
        // console.log("User ID:", userId); // You can pass the user ID here
    };

    const handleDeleteUser = () => {
        console.log("Deleting user...");
        // console.log("User ID:", userId); // You can pass the user ID here
    };

    const handleOpenDeleteConfirmation = () =>
        setIsDeleteConfirmationOpen(true);
    const handleCloseDeleteConfirmation = () =>
        setIsDeleteConfirmationOpen(false);

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: "20px" }}
                onClick={handleCreateUserClick}
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
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={handleUpdateUserClick}
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

            <Dialog
                open={isCreateUserModalOpen}
                onClose={handleCloseCreateUserModal}
            >
                <DialogTitle>Create User</DialogTitle>
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
                <DialogActions>
                    <Button onClick={handleCreateUser} color="primary">
                        Create
                    </Button>
                    <Button
                        onClick={handleCloseCreateUserModal}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isUpdateUserModalOpen}
                onClose={handleCloseUpdateUserModal}
            >
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(
                                e.target.value.replace(/[^a-zA-Z]/g, "")
                            )
                        }
                        inputProps={{ maxLength: 50 }}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(
                                e.target.value.replace(/[^a-zA-Z]/g, "")
                            )
                        }
                        inputProps={{ maxLength: 50 }}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setMobilePhone(e.target.value)}
                    />
                    <TextField
                        label="Home Phone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={homePhone}
                        onChange={(e) => setHomePhone(e.target.value)}
                    />
                    <TextField
                        label="Business Phone"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                    />
                    <TextField
                        label="Call Center Number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={callCenterNumber}
                        onChange={(e) => setCallCenterNumber(e.target.value)}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        label="Zip Code"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    <TextField
                        label="City"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        label="Afm"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={afm}
                        onChange={(e) => setAfm(e.target.value)}
                    />
                    <TextField
                        label="Doy"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={doy}
                        onChange={(e) => setDoy(e.target.value)}
                    />
                    <TextField
                        label="Gemh"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={gemh}
                        onChange={(e) => setGemh(e.target.value)}
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
                <DialogActions>
                    <Button onClick={handleResetPassword} color="primary">
                        Reset Password
                    </Button>
                    <Button
                        onClick={handleOpenDeleteConfirmation}
                        color="secondary"
                        sx={{ backgroundColor: "red", color: "white" }}
                    >
                        Delete User
                    </Button>
                </DialogActions>
                <DialogActions>
                    <Button
                        onClick={handleCloseUpdateUserModal}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateUser} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isDeleteConfirmationOpen}
                onClose={handleCloseDeleteConfirmation}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDeleteConfirmation}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteUser} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserPage;
