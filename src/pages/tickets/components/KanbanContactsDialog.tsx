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
// _mock_

// @types
import { IKanbanAssignee } from "src/types/kanban";
// components
import { Scrollbar } from "src/components/scrollbar";
import Iconify from "../../../components/iconify";
import SearchNotFound from "../../../components/search-not-found";
import { useTranslation } from "react-i18next";
import { useAllCustomersQuery } from "src/services/customers";
import { ICustomer } from "src/types/customer";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

type Props = {
    assignee?: IKanbanAssignee[];
    open: boolean;
    toggleAssignee: (customerId: number) => void;
    onClose: VoidFunction;
};

interface AssigneeItemProps {
    customer: ICustomer;
    onClick: (customerId: number) => void;
}

const AssigneeItem: FC<AssigneeItemProps> = ({ customer, onClick }) => {
    // const checked = assignee
    //     .map((person) => person.name)
    //     .includes(contact.name);

    const checked = true;

    if (!customer.firstName || !customer.lastName) return <></>;

    return (
        <ListItem
            key={customer.id}
            disableGutters
            secondaryAction={
                <Button
                    size="small"
                    color={checked ? "primary" : "inherit"}
                    startIcon={
                        <Iconify
                            icon={
                                checked ? "eva:checkmark-fill" : "eva:plus-fill"
                            }
                        />
                    }
                    onClick={() => onClick(customer.id)}
                >
                    {checked ? "assigned" : "assign"}
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
                primary={`${customer.firstName} ${customer.lastName}`}
                secondary={customer.email}
            />
        </ListItem>
    );
};

export default function KanbanContactsDialog({
    assignee = [],
    open,
    toggleAssignee,
    onClose,
}: Props) {
    const { t } = useTranslation();

    const [searchContacts, setSearchContacts] = useState("");

    const handleSearchContacts = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchContacts(event.target.value);

    const { data: customers } = useAllCustomersQuery();

    // const dataFiltered = applyFilter({
    //     inputData: _contacts,
    //     query: searchContacts,
    // });

    // const isNotFound = !dataFiltered.length && !!searchContacts;

    if (!customers) return null;

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <DialogTitle sx={{ pb: 0 }}>
                {t("Customers")}
                <Typography component="span">{` (${customers.length})`}</Typography>
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
                    {customers?.map((customer, i) => (
                        <AssigneeItem
                            key={i}
                            customer={customer}
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
    inputData: IKanbanAssignee[];
    query: string;
}) {
    if (query) {
        inputData = inputData.filter(
            (contact) =>
                contact.name.toLowerCase().indexOf(query.toLowerCase()) !==
                    -1 ||
                contact.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }

    return inputData;
}
