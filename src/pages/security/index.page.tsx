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
import {useEffect, useState} from "react";
import {log} from "util";
import {boolean} from "yup";
import {audioToolbarAction} from "@syncfusion/ej2-react-richtexteditor";

function createTestData() {
    return [
        {
            "category": "Residential",
            "subcategory": "Apartment",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Studio",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Maisonette",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Detached house",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Villa",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Loft",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Bungalow",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Building",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Apartment complex",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Farm",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Houseboat",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Residential",
            "subcategory": "Other categories",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Office",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Store",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Warehouse",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Industrial space",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Craft space",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Hotel",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Business building",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Hall",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Showroom",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Commercial",
            "subcategory": "Other Categories",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Land",
            "subcategory": "Land plot",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Land",
            "subcategory": "Parcels",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Land",
            "subcategory": "Island",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Other",
            "subcategory": "Parking",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Other",
            "subcategory": "Business",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Other",
            "subcategory": "Prefabricated",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Other",
            "subcategory": "Detachable",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Other",
            "subcategory": "Air",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        },
        {
            "category": "Other",
            "subcategory": "Other",
            "actions": {
                "allowDelete": false,
                "allowEdit": false,
                "accessOwner": false,
                "accessLocation": false,
                "accessPrice": false,
                "accessActive": false,
                "accessHidden": false,
                "accessInactive": false
            }
        }
    ]
}

function resolveCategory(row, category1: string[], category2: string[], category3: string[], category4: string[]) {
    let category;
    switch (row) {
        case "Residential":
            category = category1
            break;
        case "Commercial":
            category = category2
            break;
        case "Land":
            category = category3
            break;
        case "Other":
            category = category4
            break;
    }
    return category;
}

function resolveSubCategory(rowLiteral) {
    let rowIndex;
    switch (rowLiteral) {
        case "Apartment":
            rowIndex = 0;
            break;
        case "Studio":
            rowIndex = 1;
            break;
        case "Maisonette":
            rowIndex = 2;
            break;
        case "Detached house":
            rowIndex = 3;
            break;
        case "Villa":
            rowIndex = 4;
            break;
        case "Loft":
            rowIndex = 5;
            break;
        case "Bungalow":
            rowIndex = 6;
            break;
        case "Building":
            rowIndex = 7;
            break;
        case "Apartment complex":
            rowIndex = 8;
            break;
        case "Farm":
            rowIndex = 9;
            break;
        case "Houseboat":
            rowIndex = 10;
            break;
        case "Other categories":
            rowIndex = 11;
            break;
    }
    return rowIndex;
}

function Category(props) {
    const {row} = props;
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [data, setData] = useState(createTestData());

    const actions = ["allowDelete", "allowEdit", "accessOwner", "accessLocation", "accessPrice", "accessActive", "accessHidden", "accessInactive"]

    const subcategories1 = ["Apartment", "Studio", "Maisonette", "Detached house", "Villa", "Loft", "Bungalow", "Building", "Apartment complex", "Farm", "Houseboat", "Other categories"]
    const subcategories2 = ["Office", "Store", "Warehouse", "Industrial space", "Craft space", "Hotel", "Business building", "Hall", "Showroom", "Other Categories"]
    const subcategories3 = ["Land plot", "Parcels", "Island", "Other Categories"]
    const subcategories4 = ["Parking", "Business", "Prefabricated", "Detachable", "Air", "Other"]
    let category = resolveCategory(row, subcategories1, subcategories2, subcategories3, subcategories4);

    // const handleCheckboxChange = (e) => {
    const handleCheckboxChange = ( ) => {
        // e.stopPropagation();
        const newState = !isChecked;
        setIsChecked(newState);
        const newData = { ...data };
        for (const category in newData) {
            const categoryData = newData[category];
            for (const subcategory in categoryData) {
                if (subcategory === "actions") {
                    for (const action in categoryData[subcategory]) {
                        categoryData[subcategory][action] = newState;
                    }
                }
            }
        }
        setData(newData);
        console.log(data)
        return data;
    };


    // Handle individual child checkbox change
    const handleChildCheckboxChange = (rowLiteral, columnIndex) => {
        let rowIndex = resolveSubCategory(rowLiteral);
        let action = actions[columnIndex];

        const updatedData = { ...data };

        switch (action){
            case "allowDelete":
                updatedData[rowIndex].actions.allowDelete = !data[rowIndex].actions.allowDelete;
                break;
            case "allowEdit":
                updatedData[rowIndex].actions.allowEdit = !data[rowIndex].actions.allowEdit;
                break;
            case "accessOwner":
                updatedData[rowIndex].actions.accessOwner = !data[rowIndex].actions.accessOwner;
                break;
            case "accessLocation":
                updatedData[rowIndex].actions.accessLocation = !data[rowIndex].actions.accessLocation;
                break;
            case "accessPrice":
                updatedData[rowIndex].actions.accessPrice = !data[rowIndex].actions.accessPrice;
                break;
            case "accessActive":
                updatedData[rowIndex].actions.accessActive = !data[rowIndex].actions.accessActive;
                break;
            case "accessHidden":
                updatedData[rowIndex].actions.accessHidden = !data[rowIndex].actions.accessHidden;
                break;
            case "accessInactive":
                updatedData[rowIndex].actions.accessInactive = !data[rowIndex].actions.accessInactive;
                break;
        }

        setData(updatedData);
        console.log('SKATASKATA')
        console.log(updatedData)
        return data;
    }

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
                        <Checkbox
                            onChange={() => handleCheckboxChange()}
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
                                    {category.map((s) => (
                                        <TableRow align="left" key={s}>
                                            <TableCell sx={{width: '10%', paddingLeft: '50px'}} component="th"
                                                       scope="row">
                                                {s}
                                            </TableCell>
                                            {Array(actions.length).fill().map((_, index) => (
                                                <TableCell align="center" key={index}>
                                                    {/*{console.log("SKATA")}*/}
                                                    {/*{console.log(data[resolveSubCategory(s)])}*/}
                                                    {/*{console.log(data[resolveSubCategory(s)]?.actions[index])}*/}
                                                    {/*{console.log(data[resolveSubCategory(s)]?.actions?.[actions[index]])}*/}

                                                    <Checkbox
                                                        // checked={data[resolveSubCategory(s)]?.actions?.[actions[index]] === 'true'}
                                                        onChange={() => handleChildCheckboxChange(s, index)}
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
                    <TableRow sx={{background: '#f5f5dc'}}>
                        <TableCell sx={{width: '10%'}} align="left"><Typography variant={'h6'}>Sale</Typography></TableCell>
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
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow sx={{background: '#f5f5dc'}}>
                        <TableCell sx={{width: '10%'}} align="left"><Typography variant={'h6'}>Rent</Typography></TableCell>
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
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow sx={{background: '#f5f5dc'}}>
                        <TableCell sx={{width: '10%'}} align="left"><Typography variant={'h6'}>Sold/Rented</Typography></TableCell>
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

