import * as React from 'react';
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

import type {NextPage} from "next";
import {AuthGuard} from "src/components/authentication/auth-guard";
import {DashboardLayout} from "src/components/dashboard/dashboard-layout";
import {useGetNotificationsQuery,} from "src/services/notification";
import {Checkbox, Paper, Stack} from "@mui/material";
import {usePublishTab} from "src/components/Tabs/utils";
import {useState} from "react";

function createTestData() {
    return [
        {
            "category": "Residential",
            "subcategory": "Apartment",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Studio",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Maisonette",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Detached house",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Villa",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Loft",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Bungalow",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Building",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Apartment complex",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Farm",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Houseboat",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Residential",
            "subcategory": "Other categories",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Office",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Store",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Warehouse",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Industrial space",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Craft space",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Hotel",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Business building",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Hall",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Showroom",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Commercial",
            "subcategory": "Other Categories",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Land",
            "subcategory": "Land plot",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Land",
            "subcategory": "Parcels",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Land",
            "subcategory": "Island",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Other",
            "subcategory": "Parking",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Other",
            "subcategory": "Business",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Other",
            "subcategory": "Prefabricated",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Other",
            "subcategory": "Detachable",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Other",
            "subcategory": "Air",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        },
        {
            "category": "Other",
            "subcategory": "Other",
            "allowDelete": "false",
            "allowEdit": "false",
            "accessOwner": "false",
            "accessLocation": "false",
            "accessPrice": "false",
            "accessActive": "false",
            "accessHidden": "false",
            "accessInactive": "false"
        }
    ]
}

function Category(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const data = createTestData();
    const mydata = data.filter((s) => s.category === row)
    const actions = ["allowDelete", "allowEdit", "accessOwner", "accessLocation", "accessPrice", "accessActive", "accessHidden", "accessInactive"]

    const subcategories1 = ["Apartment", "Studio", "Maisonette", "Detached house", "Villa", "Loft", "Bungalow", "Building", "Apartment complex", "Farm", "Houseboat", "Other categories"]
    const subcategories2 = ["Office", "Store", "Warehouse", "Industrial space", "Craft space", "Hotel", "Business building", "Hall", "Showroom", "Other Categories"]
    const subcategories3 = ["Land plot", "Parcels", "Island", "Other Categories"]
    const subcategories4 = ["Parking", "Business", "Prefabricated", "Detachable", "Air", "Other"]

    let subcategories;

    switch (row) {
        case "Residential":
            subcategories = subcategories1
            break;
        case "Commercial":
            subcategories = subcategories2
            break;
        case "Land":
            subcategories = subcategories3
            break;
        case "Other":
            subcategories = subcategories4
            break;
    }

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(prevChecked => !prevChecked);
    };

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell colSpan={9}>
                    <Stack direction={'row'} alignItems={'center'}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        </IconButton>
                        <Typography variant={'h6'}>{row}</Typography>
                        <Checkbox onChange={handleCheckboxChange}
                        />
                    </Stack>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0, padding: 0}} colSpan={actions.length + 1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {subcategories.map((s) => (
                                        <TableRow align="left" key={s}>
                                            <TableCell sx={{width: '10%', paddingLeft: '50px'}} component="th"
                                                       scope="row">
                                                {s}
                                            </TableCell>
                                            {mydata.filter((m) => m === s).map((skata) => (
                                                <TableCell sx={{width: '10%', paddingLeft: '50px'}} component="th"
                                                           scope="row">
                                                    {skata}
                                                </TableCell>))
                                            }
                                            {Array(actions.length).fill().map((_, index) => (
                                                <TableCell align="center" key={index}>
                                                    <Checkbox checked = "true"
                                                    />
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
    usePublishTab({title: "Notifications", path: "/notification"});

    // const { data: data } = useAllGlobalsQuery();
    const actions = ["allowDelete", "allowEdit", "accessOwner", "accessLocation", "accessPrice", "accessActive", "accessHidden", "accessInactive"]

    const categories = ["Residential", "Commercial", "Land", "Other"]

    return (
        <TableContainer component={Paper} style={{width: '1500px'}}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow sx={{background: 'grey'}}>
                        <TableCell sx={{width: '10%'}} align="left"></TableCell>
                        {actions.map(s =>
                            <TableCell sx={{width: '10%'}} align="left" key={s}> {s} </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((s) => {
                        return <Category key={s} row={s}/>;
                    })}
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

