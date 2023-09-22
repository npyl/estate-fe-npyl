import * as React from 'react';
import {useState} from 'react';
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
import {usePublishTab} from "src/components/Tabs/utils";

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

    console.log(props)

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

const SecurityPage = () => {
    const [selectedPreset, setSelectedPreset] = useState("")
    const [selectedPreset1, setSelectedPreset1] = useState("")
    usePublishTab({title: "Presets", path: "/security"});
    const {data: presets} = useGetPresetsQuery();
    // console.log(presets)
    const {t} = useTranslation();

    const [savePreset] = useSavePresetMutation();

    const [data, setData] = useState(initRoles);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const users = [
        {id: 'panagiotis', name: 'panagiotis'},
        {id: 'leo', name: 'leo'},
        {id: 'vagelis', name: 'vagelis'},
        {id: 'athanasios', name: 'athanasios'},
        {id: 'taxi', name: 'taxi'},
        {id: 'george', name: 'george'},
        {id: 'kostas', name: 'kostas'},
        {id: 'omiros', name: 'omiros'},
        {id: 'mili', name: 'mili'},
        {id: 'pete', name: 'pete'},
    ];

    // const [users, setUsers] = useState([]);

    const handleUserToggle = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    return (
        <>
            <Typography variant="h4">ΓΙΩΡΓΟΣ-ΝΕΟΠΑΣ </Typography>

            <Divider sx={{my: 2.5}}/>
            <Box display={"flex"} alignItems={"center"}>
                <Typography
                    variant={'h6'}>Apply permissions to the properties of the following Users:</Typography>
                <Select
                    value={"all", "user1", "user2"}
                    onChange={(event) =>
                        setSelectedPreset1(
                            event.target.value
                        )
                    }
                >
                    <MenuItem value={''}>{t("No Preset")}</MenuItem>
                    <MenuItem value={''}>{t("ΠΑΝΑΓΙΩΤΗΣ")}</MenuItem>
                    <MenuItem value={''}>{t("ΜΙΛΙ")}</MenuItem>
                    {presets && presets.map((preset) =>
                        <MenuItem value={preset.id.toString()} key={preset.id}>
                            {preset.name}
                        </MenuItem>)}
                </Select>
            </Box>
            <Divider sx={{my: 2.5}}/>
            <Box>
                <Typography variant="h6">
                    User can access the properties of the following users (overrides permissions):
                </Typography>
            </Box>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{background: '#f5f5dc'}}>
                            <TableCell sx={{width: '10%'}} align="left"><Typography
                                variant={'h6'}>Sale</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => handleUserToggle(user.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider sx={{my: 2.5}}/>
            <Box display={"flex"} alignItems={"center"}>
                <Typography
                    variant={'h6'}>Assign specific properties:</Typography>
                <Select
                    value={"all", "user1", "user2"}
                    onChange={(event) =>
                        setSelectedPreset1(
                            event.target.value
                        )
                    }
                >
                    <MenuItem value={''}>{t("No Preset")}</MenuItem>
                    {presets && presets.map((preset) =>
                        <MenuItem value={preset.id.toString()} key={preset.id}>
                            {preset.name}
                        </MenuItem>)}
                </Select>
            </Box>
            <Divider sx={{my: 2.5}}/>
            <Box display={"flex"} alignItems={"center"}>
                <Typography
                    variant={'h6'}>Select from presets:</Typography>
                <Select
                    value={selectedPreset ?? ""}
                    onChange={(event) =>
                        setSelectedPreset(
                            event.target.value
                        )
                    }
                >
                    <MenuItem value={''}>{t("No Preset")}</MenuItem>
                    {presets && presets.map((preset) =>
                        <MenuItem value={preset.id.toString()} key={preset.id}>
                            {preset.name}
                        </MenuItem>)}
                </Select>
            </Box>
            <Divider sx={{my: 2.5}}/>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow sx={{background: '#f5f5dc'}}>
                            <TableCell sx={{width: '10%'}} align="left"><Typography
                                variant={'h6'}>Sale</Typography></TableCell>
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
        </>
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

