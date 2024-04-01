import { FC, useCallback, useState } from "react";
// @mui
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
// components
import Iconify from "src/components/iconify";
import { Scrollbar } from "src/components/scrollbar";
import { useAllUsersQuery } from "src/services/user";
import { IUser } from "src/types/user";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

type Props = {
    assignees?: IUser[];
    toggleAssignee: (userId: number) => void;
};

interface AssigneeItemProps {
    user: IUser;
    assigned: boolean;
    onClick: (userId: number) => void;
}

const AssigneeItem: FC<AssigneeItemProps> = ({ user, assigned, onClick }) => {
    const { t } = useTranslation();

    if (!user.firstName || !user.lastName) return <></>;

    return (
        <ListItem
            key={user.id}
            disableGutters
            secondaryAction={
                <Button
                    size="small"
                    color={assigned ? "primary" : "inherit"}
                    startIcon={
                        <Iconify
                            icon={
                                assigned
                                    ? "eva:checkmark-fill"
                                    : "eva:plus-fill"
                            }
                        />
                    }
                    onClick={() => onClick(user.id)}
                >
                    {assigned ? t("assigned") : t("assign")}
                </Button>
            }
            sx={{ height: ITEM_HEIGHT }}
        >
            <ListItemAvatar>
                <Avatar src={""} />
            </ListItemAvatar>

            <ListItemText
                primaryTypographyProps={{
                    typography: "subtitle2",
                    sx: { mb: 0.25 },
                }}
                secondaryTypographyProps={{
                    typography: "caption",
                }}
                primary={`${user.firstName} ${user.lastName}`}
                secondary={user.email}
            />
        </ListItem>
    );
};

export default function KanbanContactsDialog({
    assignees = [],
    toggleAssignee,
}: Props) {
    const { t } = useTranslation();

    const { data: users } = useAllUsersQuery();

    const [searchContacts, setSearchContacts] = useState("");

    const handleSearchContacts = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchContacts(event.target.value),
        []
    );

    const [openAssignees, setOpenAssignees] = useState(false);
    const handleOpenAssignees = useCallback(() => setOpenAssignees(true), []);
    const handleCloseAssignees = useCallback(() => setOpenAssignees(false), []);

    // const dataFiltered = applyFilter({
    //     inputData: _contacts,
    //     query: searchContacts,
    // });

    // const isNotFound = !dataFiltered.length && !!searchContacts;

    if (!users) return null;

    return (
        <>
            <Tooltip title={t("Add assignee")}>
                <IconButton
                    onClick={handleOpenAssignees}
                    sx={{
                        p: 1,
                        ml: 0.5,
                        bgcolor: (theme) =>
                            alpha(theme.palette.grey[500], 0.08),
                        border: (theme) =>
                            `dashed 1px ${theme.palette.divider}`,
                    }}
                >
                    <Iconify icon="eva:plus-fill" mb={0.5} mr={0.5} />
                </IconButton>
            </Tooltip>

            {openAssignees ? (
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    open={openAssignees}
                    onClose={handleCloseAssignees}
                >
                    <DialogTitle sx={{ pb: 0 }}>
                        {t("Users")}
                        <Typography component="span">{` (${users.length})`}</Typography>
                    </DialogTitle>

                    <Box sx={{ px: 3, py: 2.5 }}>
                        <TextField
                            fullWidth
                            value={searchContacts}
                            onChange={handleSearchContacts}
                            placeholder={t("Search...") as string}
                            inputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Iconify icon="eva:search-fill" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <DialogContent sx={{ p: 0 }}>
                        {/* {isNotFound ? (
                    <SearchNotFound
                        query={searchContacts}
                        sx={{ mt: 3, mb: 10 }}
                    />
                ) : ( */}
                        <Scrollbar
                            sx={{
                                px: 2.5,
                                height: ITEM_HEIGHT * 6,
                            }}
                        >
                            {users?.map((user, i) => (
                                <AssigneeItem
                                    key={i}
                                    assigned={
                                        assignees.findIndex(
                                            (a) => a.id === user.id
                                        ) !== -1
                                    }
                                    user={user}
                                    onClick={toggleAssignee}
                                />
                            ))}
                            {/* {dataFiltered.map((contact) => {
                            
                        }) */}
                        </Scrollbar>
                        {/* )} */}
                    </DialogContent>
                </Dialog>
            ) : null}
        </>
    );
}

// ----------------------------------------------------------------------

// function applyFilter({
//     inputData,
//     query,
// }: {
//     inputData: IUser[];
//     query: string;
// }) {
//     if (query) {
//         inputData = inputData.filter(
//             (contact) =>
//                 contact.firstName.toLowerCase().indexOf(query.toLowerCase()) !==
//                     -1 ||
//                 contact.lastName.toLowerCase().indexOf(query.toLowerCase()) !==
//                     -1 ||
//                 contact.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
//         );
//     }

//     return inputData;
// }
