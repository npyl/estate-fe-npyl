import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {FC, useState} from "react";
import SecurityPage from "./PermissionsTable";
type Props = {changeTab:(event: React.SyntheticEvent, newValue: number) => void; selectedUser:number}

function TabPanel(props) {
    const { children, value, index,selectedUser, ...other } = props;
    console.log(selectedUser)
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
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

// const PermissionPage: FC<Props> = ({changeTab}) => {
const PermissionPage:FC<Props> = ({selectedUser}) => {
    console.log(selectedUser)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const users = [
        { id: 1, username: 'Panagiotis', firstName: 'panagiotis', lastName: 'Doe', status: 'Active', email: 'user1@example.com' },
        { id: 2, username: 'Leo', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
        { id: 2, username: 'Vagelis', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
        { id: 2, username: 'Athanasios', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
        { id: 2, username: 'Taxi', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
        { id: 2, username: 'George', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
        { id: 2, username: 'Kostas', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
        { id: 2, username: 'Omiros', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
        { id: 2, username: 'Mili', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
        { id: 2, username: 'Pete', firstName: 'Jane', lastName: 'Smith', status: 'Inactive', email: 'user2@example.com' },
    ];

    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider'}}
            >
                {users.map((user, tabIndex) => (
                    <Tab
                        key={tabIndex}
                        label={user.username}
                        {...a11yProps(tabIndex)}
                        onClick={() => setTabIndex(tabIndex)}
                    />
                ))}
            </Tabs>


            {users.map((user, tabIndex) => (
                <TabPanel value={value} index={tabIndex}>
                    <SecurityPage></SecurityPage>
                </TabPanel>

            ))}
        </Box>
    );
}

export default PermissionPage;
