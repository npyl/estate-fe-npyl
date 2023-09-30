import InfoIcon from "@mui/icons-material/Info";
import {
    Button,
    Checkbox,
    Chip,
    Divider,
    FormControl,
    Grid,
    Input,
    MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import SecurityPage from "./PermissionsTable";
import { ActionsHeadCells, ActionsHeadCellsLabels, actions } from "./constants";

import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import { IActions } from "src/interfaces/roles";
import { selectData, setData } from "src/slices/security";
import { useDispatch, useSelector } from "src/store";
type Props = {
    selectedUser: number;
};

const PermissionPage: FC<Props> = ({ selectedUser }) => {
    const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
    const { t } = useTranslation();
    // const [savePreset] = useSavePresetMutation();
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const profile = {
        id: 1,
        username: "ADMIN",
        firstName: "ADMIN",
        lastName: "ADMIN",
        status: "Active",
        email: "admin1@example.com",
    };

    const [selectedUserMenu, setSelectedUserMenu] = useState(() => {
        const selectedUserObject = users.find(
            (user) => user.id === selectedUser
        );
        return selectedUserObject
            ? selectedUserObject.username
            : profile.username;
    });

    const handleSelectChange = (e: SelectChangeEvent) => {
        const selectedValue = e.target.value;
        setSelectedUserMenu(selectedValue);
    };

    const handleChange = (user: any) => {
        const isChecked = checkedUsers.includes(user.username);
        setCheckedUsers((prevCheckedUsers) => {
            if (isChecked) {
                // If the user is already checked, remove them from the list
                return prevCheckedUsers.filter(
                    (username) => username !== user.username
                );
            } else {
                // If the user is not checked, add them to the list
                return [...prevCheckedUsers, user.username];
            }
        });
    };

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldToChange: string
    ) => {
        const newData = JSON.parse(JSON.stringify(data));
        for (const key in data) {
            for (const actionKey in newData[key].actions) {
                if (actionKey === fieldToChange) {
                    newData[key].actions[actionKey] = e.target.checked;
                }
            }
        }
        dispatch(setData(newData));
    };
    const isCheckboxChecked = (field: string) => {
        return data.every(
            (item) => item.actions[field as unknown as keyof IActions] === true
        );
    };
    const renderChildren = () => {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                {users &&
                    users.length > 0 &&
                    users.map((user) => (
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            key={user.id}
                        >
                            <>
                                <Checkbox
                                    checked={checkedUsers.includes(
                                        user.username
                                    )}
                                    onChange={() => handleChange(user)}
                                />
                                <Typography sx={{ wordBreak: "break-word" }}>
                                    {user.username}
                                </Typography>
                            </>
                        </Box>
                    ))}
            </Box>
        );
    };

    return (
        <Box>
            <>
                <FormControl>
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        <Typography variant={"h5"}>
                            Select Source User:
                        </Typography>
                        <Select
                            variant={"standard"}
                            sx={{
                                "& .MuiSvgIcon-root": {
                                    top: "5px",
                                },
                                minWidth: 150,
                            }}
                            labelId="demo-simple-select-label"
                            value={selectedUserMenu}
                            renderValue={(value) => (
                                <Typography variant="h5">{value}</Typography>
                            )}
                            onChange={handleSelectChange}
                            input={
                                <Input
                                    id="user-select"
                                    sx={{
                                        fontSize: "2.0rem",
                                        fontWeight: "bold",
                                        borderColor: "white",
                                    }}
                                />
                            }
                            MenuProps={{
                                PaperProps: { sx: { maxHeight: "60vh" } },
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

                        <Tooltip
                            title={
                                <Box>
                                    <Box>
                                        <span style={{ fontStyle: "italic" }}>
                                            In {selectedUserMenu}'s tab, you can
                                            establish permissions that are
                                            applicable to all properties within
                                            the system.
                                        </span>
                                    </Box>
                                    <Box>
                                        <span style={{ fontStyle: "italic" }}>
                                            In the tabs for other users, you
                                            have the ability to include or
                                            remove permissions specifically for
                                            the user {selectedUserMenu}.
                                        </span>
                                    </Box>
                                </Box>
                            }
                        >
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </FormControl>
            </>
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Stack spacing={3} direction={"column"} paddingY={2}>
                <Box gap={1} display={"flex"}>
                    <Typography gutterBottom variant={"h6"}>
                        Selected Target User/s:{" "}
                    </Typography>
                    {checkedUsers.map((e, index) => (
                        <Chip
                            size="small"
                            sx={{ mr: 1 }}
                            key={index}
                            label={e}
                            color="primary"
                        />
                    ))}
                </Box>
                <Box gap={2} display="flex" alignItems={"center"}>
                    <Typography variant={"h6"}>Quick Actions:</Typography>{" "}
                    {actions.map((action) => (
                        <Stack direction={"row"} alignItems={"center"}>
                            <Typography align="center" key={action}>
                                {
                                    ActionsHeadCellsLabels[
                                        ActionsHeadCells[
                                            action as keyof typeof ActionsHeadCells
                                        ] as keyof typeof ActionsHeadCellsLabels
                                    ]
                                }
                            </Typography>
                            <Checkbox
                                checked={isCheckboxChecked(action)}
                                onChange={(e) =>
                                    handleCheckboxChange(e, action)
                                }
                            />
                        </Stack>
                    ))}
                </Box>
            </Stack>
            <Divider />
            <Grid container>
                <Grid item xs={12} md={2}>
                    <Box display={"flex"} alignItems={"center"}>
                        <Checkbox
                            checked={users.every((user) =>
                                checkedUsers.includes(user.username)
                            )}
                            indeterminate={
                                checkedUsers.length > 0 &&
                                checkedUsers.length < users.length
                            }
                            onChange={() => {
                                setCheckedUsers(
                                    users.length === checkedUsers.length
                                        ? []
                                        : users.map((user) => user.username)
                                );
                            }}
                        />
                        <Typography sx={{ wordBreak: "break-word" }}>
                            Select all users
                        </Typography>
                    </Box>
                    {renderChildren()}
                </Grid>

                <Grid item xs={12} md={10}>
                    <SecurityPage user={"remove"} />
                </Grid>
            </Grid>
            <Grid container display={"block"}>
                <Stack
                    py={2}
                    spacing={2}
                    direction={"row"}
                    sx={{ float: "right" }}
                >
                    <Button
                        variant="outlined"
                        endIcon={<SendIcon />}
                        // onClick={() => savePreset(data)}
                    >
                        {t("Save")}
                    </Button>
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        // onClick={() => savePreset(data)}
                        onClick={() => console.log(data)}
                    >
                        {t("Apply Changes")}
                    </Button>
                </Stack>
            </Grid>
        </Box>
    );
};

export default PermissionPage;

const users = [
    {
        id: 1,
        username: "ADMIN",
        firstName: "ADMIN",
        lastName: "ADMIN",
        status: "Active",
        email: "admin1@example.com",
    },
    {
        id: 2,
        username: "Panagiotis",
        firstName: "Panagiotis",
        lastName: "Athanasopoulos",
        status: "Active",
        email: "user1@example.com",
    },
    {
        id: 3,
        username: "Leo",
        firstName: "Leonidas",
        lastName: "Panagiotou",
        status: "Inactive",
        email: "user2@example.com",
    },
    {
        id: 4,
        username: "Vagelis",
        firstName: "Vagelis",
        lastName: "Kleitsas",
        status: "Inactive",
        email: "user2@example.com",
    },
    {
        id: 5,
        username: "Athanasiosdasdasd",
        firstName: "Athanasiosdasda",
        lastName: "Kalatheris",
        status: "Inactive",
        email: "user2@example.com",
    },
    {
        id: 6,
        username: "Taxi",
        firstName: "Taxiarxis",
        lastName: "Zarwnis",
        status: "Inactive",
        email: "user2@example.com",
    },
    {
        id: 7,
        username: "George",
        firstName: "George",
        lastName: "Katrougkalos",
        status: "Inactive",
        email: "user2@example.com",
    },
    {
        id: 8,
        username: "Kostas",
        firstName: "Kostas",
        lastName: "Mermelas",
        status: "Inactive",
        email: "user2@example.com",
    },
    {
        id: 9,
        username: "Omiros",
        firstName: "Omiros",
        lastName: "Panagiotoskilopoulos",
        status: "Inactive",
        email: "user2@example.com",
    },
    {
        id: 10,
        username: "Mili",
        firstName: "Mili",
        lastName: "Kopanitsanoskilopoylou",
        status: "Inactive",
        email: "user2@example.com",
    },
    {
        id: 11,
        username: "Pete",
        firstName: "Pete",
        lastName: "Marakos",
        status: "Inactive",
        email: "user2@example.com",
    },
];
