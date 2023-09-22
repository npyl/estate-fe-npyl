import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; // Make sure to import EditIcon

const users = [
    { id: 1, username: 'user1', firstName: 'John', lastName: 'Doe', status: 'Active', email: 'user1@example.com' },
    { id: 2, username: 'user2', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
    // Add more user data here
];

const UserList = () => {
    // Define a placeholder function for edit action
    const handleEdit = (userId) => {
        // Implement your edit logic here
        console.log(`Edit user with ID ${userId}`);
    };

    return (
        <div>
            <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
                Create User
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ background: '#f5f5dc' }}>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
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
                                    <IconButton size="small" onClick={() => handleEdit(user.id)} sx={{ ml: 1, mr: -1 }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserList;
