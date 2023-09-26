import * as React from 'react';
import {FC, useState} from 'react';
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
import {Button, Checkbox, Divider, Grid, MenuItem, Paper, Select, Stack} from "@mui/material";

import {
    actions,
    categories,
    initRoles,
    subcategories1,
    subcategories2,
    subcategories3,
    subcategories4
} from "./constants";
import SendIcon from "@mui/icons-material/Send";
import {useTranslation} from "react-i18next";
import {useGetPresetsQuery, useSavePresetMutation} from "../../../../services/security";

function Category(props) {
    const {row, data, setData} = props;
    const [open, setOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    // console.log("props => ", props)

    let category = resolveCategory(row, subcategories1, subcategories2, subcategories3, subcategories4);

    const handleCheckboxChange = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        const newData = {...data};
        Object.values(newData).forEach((categoryData) => {
            const actions = categoryData.actions;
            if (actions) {
                Object.keys(actions).forEach((action) => {
                    actions[action] = newState;
                });
            }
        });
        setData(newData);
    };

    const isParentCategoryChecked = () => {
        for (const category of Object.values(data)) {
            const actions = category?.actions;
            if (actions && Object.values(actions).some((value) => value === false)) {
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


    // Handle individual child checkbox change
    const handleChildCheckboxChange = (rowLiteral, columnIndex) => {
        let rowIndex = resolveSubCategory(rowLiteral);
        let action = actions[columnIndex];

        const updatedData = {...data};

        updatedData[rowIndex].actions[action] = !data[rowIndex].actions[action];

        setData(updatedData);
        // console.log(updatedData)
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
                            checked={isParentCategoryChecked()}
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

interface SecurityPageProps{user: string;}

const SecurityPage: FC<SecurityPageProps> = ({user}) => {

    const [selectedPreset, setSelectedPreset] = useState("")
    const [selectedPreset1, setSelectedPreset1] = useState("")
    const {data: presets} = useGetPresetsQuery();
    const {t} = useTranslation();

    const [savePreset] = useSavePresetMutation();

    const [data, setData] = useState(initRoles);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleUserToggle = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    return (

        <Box sx={{ overflowX: 'auto', width: '100%' }}>
            <Typography variant='h6' sx={{textAlign: 'center', marginBottom: 2}}>{user}</Typography>
            <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100%' }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{background: '#f5f5dc'}}>
                            <TableCell sx={{width: '10%'}} align="left"><Typography
                                variant={'h6'}>Sale</Typography></TableCell>
                            {actions.map(s =>
                                <TableCell sx={{width: '10%'}} align="center" key={s}> {s} </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && categories.map((s) => {
                            return <Category key={s} row={s} data={data} setData={setData}/>;
                        })}
                    </TableBody>
                </Table>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{background: '#f5f5dc'}}>
                            <TableCell sx={{width: '10%'}} align="left"><Typography
                                variant={'h6'}>Rent</Typography></TableCell>
                            {actions.map(s =>
                                <TableCell sx={{width: '10%'}} align="left" key={s}> {s} </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && categories.map((s) => {
                            return <Category key={s} row={s} data={data} setData={setData}/>;
                        })}
                    </TableBody>
                </Table>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{background: '#f5f5dc'}}>
                            <TableCell sx={{width: '10%'}} align="left"><Typography
                                variant={'h6'}>Sold/Rented</Typography></TableCell>
                            {actions.map(s =>
                                <TableCell sx={{width: '10%'}} align="left" key={s}> {s} </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && categories.map((s) => {
                            return <Category key={s} row={s} data={data} setData={setData}/>;
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
    }
    return rowIndex;
}

