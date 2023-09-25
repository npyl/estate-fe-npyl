import React, {FC, useState} from 'react';
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
    TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Make sure to import EditIcon
import validator from 'validator';
// type Props = {changeTab:(event: React.SyntheticEvent, newValue: number) => void;}
type Props = {
    changeTab: (event: React.SyntheticEvent, newValue: number
    ) => void;
    setSelectedUser: (value: (((prevState: number) => number) | number)) => void;
};

const UserPage: FC<Props> = ({changeTab, setSelectedUser}) => {

    const users = [
        {
            id: 1,
            username: 'ΠΑΝΑΓΙΩΤΗΣ',
            firstName: 'John',
            lastName: 'Doe',
            status: 'Active',
            email: 'user1@example.com'
        },
        {id: 2, username: 'ΜΙΛΙ', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com'},
        {
            id: 3,
            username: 'ΓΙΩΡΓΟΣ-ΝΕΟΠΑΣ',
            firstName: 'Jane',
            lastName: 'Smith',
            status: 'Inactive',
            email: 'user2@example.com'
        },
    ];

    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [status, setStatus] = useState('Active');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    const handleEdit = (userId) => {
        console.log(`Edit user with ID ${userId}`);
    };

    const handleCreateUserClick = () => {
        setIsCreateUserModalOpen(true);
    };

    const handleCloseCreateUserModal = () => {
        setIsCreateUserModalOpen(false);
    };

    const handleCreateUser = () => {
        if (!validator.isEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        handleCloseCreateUserModal();
    };

    const handleUpdateUserClick = () => {
        setIsUpdateUserModalOpen(true);
    };

    const handleCloseUpdateUserModal = () => {
        setIsUpdateUserModalOpen(false);
    };

    const handleUpdateUser = () => {
        if (!validator.isEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        handleCloseUpdateUserModal();
    };

    const handleResetPassword = () => {
        console.log('Resetting user password...');
        console.log('User ID:', userId); // You can pass the user ID here
    };

    const handleDeleteUser = () => {
        console.log('Deleting user...');
        console.log('User ID:', userId); // You can pass the user ID here
    };

    const handleOpenDeleteConfirmation = () => {
        setIsDeleteConfirmationOpen(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setIsDeleteConfirmationOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" style={{marginBottom: '20px'}} onClick={handleCreateUserClick}>
                Create User
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{background: '#f5f5dc'}}>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Email</TableCell>
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
                                <TableCell>
                                    <IconButton size="small" onClick={handleUpdateUserClick} sx={{ml: 1, mr: -1}}>
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="text"
                                        color="success"
                                        onClick={(e) => {
                                            changeTab(e, 1);
                                            setSelectedUser(user.id)
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

            <Dialog open={isCreateUserModalOpen} onClose={handleCloseCreateUserModal}>
                <DialogTitle>Create User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                        inputProps={{maxLength: 50}}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                        inputProps={{maxLength: 50}}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <Button onClick={handleCloseCreateUserModal} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isUpdateUserModalOpen} onClose={handleCloseUpdateUserModal}>
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                        inputProps={{maxLength: 50}}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                        inputProps={{maxLength: 50}}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        sx={{backgroundColor: 'red', color: 'white'}}
                    >
                        Delete User
                    </Button>
                </DialogActions>
                <DialogActions>
                    <Button onClick={handleCloseUpdateUserModal} color="secondary">
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
                    <Button onClick={handleCloseDeleteConfirmation} color="primary">
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
