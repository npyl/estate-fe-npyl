import {
    Avatar,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from "@mui/material";
import { useAllUsersQuery } from "@/services/user";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const getProfileImageSrc = (base64String: string | null) => {
    return base64String ? `data:image/jpeg;base64,${base64String}` : "";
};

const UserSelect = () => {
    const { t } = useTranslation();
    const { data: users } = useAllUsersQuery();
    const [selectedUserId, setSelectedUserId] = useState<number>();

    const handleUserChange = (event: SelectChangeEvent<number>) => {
        setSelectedUserId(
            event.target.value
                ? parseInt(event.target.value as string)
                : undefined
        );
    };

    return (
        <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="user-select-label">{t("Assigned to")}</InputLabel>
            <Select
                labelId="user-select-label"
                value={selectedUserId || ""}
                label="Filter by User"
                onChange={handleUserChange}
            >
                <MenuItem value="">
                    <Typography>{t("All Users")}</Typography>
                </MenuItem>
                {users?.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            gap={1}
                        >
                            <Avatar
                                src={getProfileImageSrc(user.profilePhoto)}
                                alt={user.firstName}
                                sx={{ width: 22, height: 22 }}
                            />
                            {user.firstName} {user.lastName}
                        </Stack>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default UserSelect;
