import * as React from 'react';
import {FC, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SecurityPage from "./PermissionsTable";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import {FormControl, Input, MenuItem} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

type Props = { changeTab: (event: React.SyntheticEvent, newValue: number) => void; selectedUser: number }

function TabPanel(props) {
    const {children, value, index, selectedUser, ...other} = props;
    console.log(selectedUser)
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const PermissionPage: FC<Props> = ({selectedUser}) => {
    console.log("skataskataskata")
    console.log(selectedUser)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const profile = useProfileQuery({}).data;
    const profile = {
        id: 1,
        username: 'ADMIN',
        firstName: 'ADMIN',
        lastName: 'ADMIN',
        status: 'Active',
        email: 'admin1@example.com'
    }

    const users = [
        {
            id: 1,
            username: 'ADMIN',
            firstName: 'ADMIN',
            lastName: 'ADMIN',
            status: 'Active',
            email: 'admin1@example.com'
        },
        {
            id: 2,
            username: 'Panagiotis',
            firstName: 'Panagiotis',
            lastName: 'Athanasopoulos',
            status: 'Active',
            email: 'user1@example.com'
        },
        {
            id: 3,
            username: 'Leo',
            firstName: 'Leonidas',
            lastName: 'Panagiotou',
            status: 'Inactive',
            email: 'user2@example.com'
        },
        {
            id: 4,
            username: 'Vagelis',
            firstName: 'Vagelis',
            lastName: 'Kleitsas',
            status: 'Inactive',
            email: 'user2@example.com'
        },
        {
            id: 5,
            username: 'Athanasios',
            firstName: 'Athanasios',
            lastName: 'Kalatheris',
            status: 'Inactive',
            email: 'user2@example.com'
        },
        {
            id: 6,
            username: 'Taxi',
            firstName: 'Taxiarxis',
            lastName: 'Zarwnis',
            status: 'Inactive',
            email: 'user2@example.com'
        },
        {
            id: 7,
            username: 'George',
            firstName: 'George',
            lastName: 'Katrougkalos',
            status: 'Inactive',
            email: 'user2@example.com'
        },
        {
            id: 8,
            username: 'Kostas',
            firstName: 'Kostas',
            lastName: 'Mermelas',
            status: 'Inactive',
            email: 'user2@example.com'
        },
        {
            id: 9,
            username: 'Omiros',
            firstName: 'Omiros',
            lastName: 'Panagiotoskilopoulos',
            status: 'Inactive',
            email: 'user2@example.com'
        },
        {
            id: 10,
            username: 'Mili',
            firstName: 'Mili',
            lastName: 'Kopanitsanoskilopoylou',
            status: 'Inactive',
            email: 'user2@example.com'
        },
        {
            id: 11,
            username: 'Pete',
            firstName: 'Pete',
            lastName: 'Marakos',
            status: 'Inactive',
            email: 'user2@example.com'
        },
    ];

    const [selectedUserMenu, setSelectedUserMenu] = useState(() => {
        const selectedUserObject = users.find((user) => user.id === selectedUser);
        return selectedUserObject ? selectedUserObject.username : profile.username;
    });


    const [tabIndex, setTabIndex] = useState(0);

    const handleSelectChange = (e) => {
        // console.log(e)
        setSelectedUserMenu(e.target.value);
    };


    return (

        <Box p={1}>
            <Box py={3}>
                <FormControl>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <Typography variant={"h5"}>Select User: </Typography>
                        <Select
                            variant={"standard"}
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    top: "5px",
                                },
                                minWidth: 150
                            }}
                            labelId="demo-simple-select-label"
                            value={selectedUserMenu}
                            renderValue={(value) => <Typography variant='h5'>{value}</Typography>}
                            onChange={handleSelectChange}
                            input={<Input id="user-select" sx={{
                                fontSize: '2.0rem',
                                fontWeight: 'bold',
                                borderColor: 'white'
                            }}/>}
                            MenuProps={{
                                PaperProps: {sx: {maxHeight: "60vh"}},
                            }}
                        >
                            {users.map((user) => (
                                <MenuItem
                                    key={user.username}
                                    value={user.username}
                                >
                                    <Typography>{user.username}</Typography>
                                </MenuItem>
                            ))}
                        </Select>

                        <Tooltip title={
                            <Box>
                                <Box>
                                    <span style={{fontStyle: 'italic'}}>
                                      In {selectedUserMenu}'s tab, you can establish permissions that are applicable to all properties within the system.
                                    </span>
                                </Box>
                                <Box>
                                    <span style={{fontStyle: 'italic'}}>
                                    In the tabs for other users, you have the ability to include or remove permissions specifically for the user {selectedUserMenu}.
                                    </span>
                                </Box>
                            </Box>
                        }>
                            <IconButton>
                                <InfoIcon/>
                            </IconButton>

                        </Tooltip>

                    </Stack>


                    {/*<Snackbar open={open} onClose={handleClose}>*/}
                    {/*    <Alert onClose={handleClose} severity="info">*/}
                    {/*        <Typography variant={"h7"}>*/}
                    {/*            <span style={{fontStyle: 'italic'}}>*/}
                    {/*              In {selectedUserMenu}'s tab, you can establish permissions that are applicable to all properties within the system.*/}
                    {/*            </span>*/}
                    {/*        </Typography>*/}
                    {/*        <Typography variant={"h7"}>*/}
                    {/*            <span style={{fontStyle: 'italic'}}>*/}
                    {/*              In the tabs for other users, you have the ability to include or remove permissions specifically for the user {selectedUserMenu}.*/}
                    {/*            </span>*/}
                    {/*        </Typography>*/}
                    {/*    </Alert>*/}
                    {/*</Snackbar>*/}
                </FormControl>
            </Box>

            {/*<Typography variant="h4" style={{ marginBottom: '16px', fontWeight: 'bold' }}>*/}
            {/*    {users.filter(s => s.id === selectedUser).map(s => s.username + ' ' + s.lastName)}*/}
            {/*</Typography>*/}

            <Stack direction={"row"} sx={{display: 'flex', alignItems: 'flex-start'}}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    sx={{borderRight: 1, borderColor: 'divider', marginRight: '16px', marginTop: 7}}
                    style={{minWidth: '200px'}}
                >
                    {users.map((user, tabIndex) => (
                        <Tab
                            key={tabIndex}
                            label={user.username}
                            {...a11yProps(tabIndex)}
                            onClick={() => setTabIndex(tabIndex)}
                            style={{marginBottom: '8px'}}
                        />
                    ))}
                </Tabs>

                <Box sx={{marginTop: -1, width: '100%'}}>
                    {users.map((user, tabIndex) => {
                        // console.log("my user => ", user);
                        return (
                            <TabPanel value={value} index={tabIndex} key={tabIndex}>
                                <SecurityPage user={user.username}/>
                            </TabPanel>
                        );
                    })}
                </Box>
            </Stack>
        </Box>

    );
}

export default PermissionPage;
