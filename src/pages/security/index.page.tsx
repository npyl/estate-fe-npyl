import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useAllGlobalsQuery } from "src/services/global";

import type { NextPage } from "next";
import { useMemo } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { CollapsibleTable, createRow } from "./components/CollapsibleTable";
import {
    useGetNotificationByIdQuery,
    useGetNotificationsQuery,
} from "src/services/notification";
import {Checkbox, Paper, Stack} from "@mui/material";
import { usePublishTab } from "src/components/Tabs/utils";
import { ContactNotification } from "src/types/notification";
import {width} from "@mui/system";

function createTestData() {
    return {
        "parentCategories": [
            "Residential",
            "Commercial",
            "Rural",
            "Industrial",
            "Unincorporated",
            "Recreational",
            "Unknown"
        ],
        "residentialCategories": [
            "Apartment",
            "Studio",
            "Maisonette",
            "Detached",
            "Villa",
            "Loft",
            "Bungalow",
            "Building",
            "Apartment complex",
            "Farm",
            "Houseboat",
            "Other residential"
        ],
        "states": [
            "Sale",
            "Rent",
            "Sold",
            "Rented",
            "Unavailable",
            "Taken",
            "Under Construction",
            "Under Maintenance"
        ],
        "actions": [
            "allowDelete",
            "allowEdit",
            "accessOwner",
            "accessLocation",
            "accessPrice",
            "accessActive",
            "accessHidden",
            "accessInactive"
        ]
    };
}

// Usage:
function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const testData = createTestData();

    return (
        <React.Fragment >
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell colSpan={9}>
                    <Stack direction={'row'} alignItems={'center'}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    <Typography variant={'h6'}>{row} </Typography>
                    </Stack>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, padding:0}} colSpan={testData.actions.length+1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {testData.residentialCategories.map((row) => (
                                        <TableRow align="left" key={row}>
                                            <TableCell sx={{width:'10%', paddingLeft: '50px'}} component="th" scope="row" >
                                                {row}
                                            </TableCell>
                                            {Array(testData.actions.length).fill().map((_, index) => (
                                                <TableCell align="center" key={index}>
                                                    <Checkbox />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const NotificationPage: NextPage = () => {
    usePublishTab({ title: "Notifications", path: "/notification" });

    const { data: notifications } = useGetNotificationsQuery();

    // const { data: data } = useAllGlobalsQuery();
    const testData = createTestData();

    return (
        <TableContainer component={Paper} style={ {width: '1500px'}}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow sx={{ background:'grey' }}>
                        <TableCell sx={{width:'10%'}} align="left"></TableCell>
                        {testData.actions.map((row) => (
                            <TableCell sx={{width:'10%'}} align="left" key={row}> {row} </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {testData.parentCategories.map((row) => (
                        <Row key={row} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

NotificationPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default NotificationPage;

