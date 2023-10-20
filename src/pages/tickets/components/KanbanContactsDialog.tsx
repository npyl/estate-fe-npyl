import { FC, useState } from "react";
// @mui
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    InputAdornment,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
// components
import { useTranslation } from "react-i18next";
import { Scrollbar } from "src/components/scrollbar";
import { useAllUsersQuery } from "src/services/user";
import { IUser } from "src/types/user";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

type Props = {
    assignees?: IUser[];
    open: boolean;
    toggleAssignee: (userId: number) => void;
    onClose: VoidFunction;
};

interface AssigneeItemProps {
    user: IUser;
    assigned: boolean;
    onClick: (userId: number) => void;
}

const AssigneeItem: FC<AssigneeItemProps> = ({ user, assigned, onClick }) => {
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
                    {assigned ? "assigned" : "assign"}
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
    open,
    toggleAssignee,
    onClose,
}: Props) {
    const { t } = useTranslation();

    const [searchContacts, setSearchContacts] = useState("");

    const handleSearchContacts = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchContacts(event.target.value);

    const { data: users } = useAllUsersQuery();

    // const dataFiltered = applyFilter({
    //     inputData: _contacts,
    //     query: searchContacts,
    // });

    // const isNotFound = !dataFiltered.length && !!searchContacts;

    if (!users) return null;

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <DialogTitle sx={{ pb: 0 }}>
                {t("Users")}
                <Typography component="span">{` (${users.length})`}</Typography>
            </DialogTitle>

            <Box sx={{ px: 3, py: 2.5 }}>
                <TextField
                    fullWidth
                    value={searchContacts}
                    onChange={handleSearchContacts}
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify
                                    icon="eva:search-fill"
                                    sx={{ color: "text.disabled" }}
                                />
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
                                assignees.findIndex((a) => a.id === user.id) !==
                                -1
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
    );
}

// ----------------------------------------------------------------------

function applyFilter({
    inputData,
    query,
}: {
    inputData: IUser[];
    query: string;
}) {
    if (query) {
        inputData = inputData.filter(
            (contact) =>
                contact.firstName
                    ?.toLowerCase()
                    .indexOf(query?.toLowerCase()) !== -1 ||
                contact.lastName
                    ?.toLowerCase()
                    .indexOf(query?.toLowerCase()) !== -1 ||
                contact.email?.toLowerCase().indexOf(query?.toLowerCase()) !==
                    -1
        );
    }

    return inputData;
}
