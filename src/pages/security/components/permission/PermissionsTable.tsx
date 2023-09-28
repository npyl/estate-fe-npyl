import * as React from 'react';
import {FC, useEffect, useState} from 'react';
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
import {Button, Checkbox, Grid, Paper, Stack} from "@mui/material";

import {
    actions,
    categories,
    initRentRoles,
    initRoles,
    initSaleRoles,
    initSoldRentedRoles,
    subcategories1,
    subcategories2,
    subcategories3,
    subcategories4
} from "./constants";
import SendIcon from "@mui/icons-material/Send";
import {useTranslation} from "react-i18next";
import {useGetPresetsQuery, useSavePresetMutation} from "../../../../services/security";

function Category(props) {
    const {row, data, parentCategory, setData} = props;
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    let category = resolveCategory(row, subcategories1, subcategories2, subcategories3, subcategories4);

    const handleCheckboxChange = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        const newData = {...data};
        for (const key in newData) {
            if (newData[key].category === row) {
                newData[key].actions = {
                    create: newState,
                    view: newState,
                    edit: newState,
                    delete: newState,
                    owner: newState,
                    location: newState,
                    price: newState,
                    active: newState,
                    inactive: newState,
                    hidden: newState,
                };
            }
        }
        setData(newData);
    };

    const isParentCategoryChecked = (row) => {
        console.log(row)
        for (const category of Object.values(data)) {
            const actions = category?.actions;
            if (category.category === row && actions && Object.values(actions).some((value) => value === false)) {
                return false;
            }
        }
        return true;
    };

    const isActionChecked = (rowLiteral, columnIndex): boolean => {
        const rowIndex = resolveSubCategory(rowLiteral);
        const action = actions[columnIndex];
        return !!data[rowIndex]?.actions[action]
    }

    const handleChildCheckboxChange = (rowLiteral, columnIndex) => {
        let rowIndex = resolveSubCategory(rowLiteral);
        let action = actions[columnIndex];
        const updatedData = {...data};
        updatedData[rowIndex].actions[action] = !data[rowIndex].actions[action];
        setData(updatedData);
    }

    return (

        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}, width: '100%'}}>
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
                            checked={isParentCategoryChecked(row)}
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
                                                    <Checkbox
                                                        onChange={() => {
                                                            handleChildCheckboxChange(s, index);
                                                        }}
                                                        checked={isActionChecked(s, index)}
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
    )
        ;
}

interface SecurityPageProps {
    user: string;
}

const SecurityPage: FC<SecurityPageProps> = ({user}) => {

    const {data: presets} = useGetPresetsQuery();
    const {t} = useTranslation();

    const [savePreset] = useSavePresetMutation();

    const [data, setData] = useState(initRoles);
    const [saleData, setSaleData] = useState(initSaleRoles);
    const [rentData, setRentData] = useState(initRentRoles);
    const [soldRentedData, setSoldRentedData] = useState(initSoldRentedRoles);

    useEffect(() => {

        let concatenatedData = {};
        concatenatedData = {saleData, rentData, soldRentedData};
        setData(concatenatedData);
        console.log("The new data are updated => ", data)
    }, [saleData, rentData, soldRentedData]);

    return (

        <Box sx={{overflowX: 'auto', width: '100%'}}>
            <Typography variant='h6' sx={{textAlign: 'center', marginBottom: 2}}>{user}</Typography>
            <TableContainer component={Paper} sx={{overflowX: 'auto', width: '100%'}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{background: '#f5f5dc'}}>
                            <TableCell sx={{minWidth: 134}} align="left"><Typography
                                variant={'h6'}>Sale</Typography></TableCell>
                            {actions.map(s =>
                                <TableCell sx={{width: '9%'}} align="center" key={s}> {s} </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && categories.map((s) => {
                            return <Category key={s} row={s} data={saleData} setData={setSaleData}/>;
                        })}
                    </TableBody>
                </Table>

                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{background: '#f5f5dc'}}>
                            <TableCell sx={{minWidth: 134}} align="left"><Typography
                                variant={'h6'}>Rent</Typography></TableCell>
                            {actions.map(s =>
                                <TableCell sx={{width: '9%'}} align="center" key={s}> {s} </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && categories.map((s) => {
                            return <Category key={s} row={s} data={rentData} setData={setRentData}/>;
                        })}
                    </TableBody>
                </Table>

                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{background: '#f5f5dc'}}>
                            <TableCell sx={{minWidth: 134}} align="left"><Typography
                                variant={'h6'}>Sold/Rented</Typography></TableCell>
                            {actions.map(s =>
                                <TableCell sx={{width: '9%'}} align="center" key={s}> {s} </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && categories.map((s) => {
                            return <Category key={s} row={s} data={soldRentedData}
                                             setData={setSoldRentedData}/>;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container display={'block'}>
                <Stack py={2} spacing={2} direction={"row"} sx={{float: "right"}}>
                    <Button
                        variant="outlined"
                        endIcon={<SendIcon/>}
                        onClick={() => savePreset(data)}
                    >
                        {t("Save")}
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<SendIcon/>}
                        onClick={() => savePreset(data)}
                    >
                        {t("Apply Changes")}
                    </Button>
                </Stack>
            </Grid>
        </Box>
    );
}

export default SecurityPage;


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
        case "Office":
            rowIndex = 12;
            break;
        case "Store":
            rowIndex = 13;
            break;
        case "Warehouse":
            rowIndex = 14;
            break;
        case "Industrial space":
            rowIndex = 15;
            break;
        case "Craft space":
            rowIndex = 16;
            break;
        case "Hotel":
            rowIndex = 17;
            break;
        case "Business building":
            rowIndex = 18;
            break;
        case "Hall":
            rowIndex = 19;
            break;
        case "Showroom":
            rowIndex = 20;
            break;
        case "Other Commercial categories":
            rowIndex = 21;
            break;
        case "Land plot":
            rowIndex = 22;
            break;
        case "Parcels":
            rowIndex = 23;
            break;
        case "Island":
            rowIndex = 24;
            break;
        case "Other Land categories":
            rowIndex = 25;
            break;
        case "Parking":
            rowIndex = 26;
            break;
        case "Business":
            rowIndex = 27;
            break;
        case "Prefabricated":
            rowIndex = 28;
            break;
        case "Detachable":
            rowIndex = 29;
            break;
        case "Air":
            rowIndex = 30;
            break;
        case "Other":
            rowIndex = 31;
            break;
    }
    return rowIndex;
}

