import {
    Avatar,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useAllUsersQuery } from "@/services/user";

const ManagerSelect = () => {
    const { t } = useTranslation();
    const { data: users } = useAllUsersQuery();
    const router = useRouter();
    const { user: selectedUserId } = router.query;

    const handleChange = (e: any) => {
        const userId = e.target.value;
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    user: userId === "All Managers" ? undefined : userId,
                },
            },
            undefined,
            { shallow: true }
        );
    };

    return (
        <FormControl size="small" sx={{ width: 260, ml: 2 }}>
            <InputLabel id="user-select-label">{t("Manager")}</InputLabel>
            <Select
                labelId="user-select-label"
                value={selectedUserId ? Number(selectedUserId) : "All Managers"}
                label={t("Manager")}
                onChange={handleChange}
                renderValue={(value) => {
                    const user = users?.find((u) => u.id === Number(value));
                    return user ? (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                                src={user.avatar || ""}
                                alt={user.firstName}
                                sx={{ width: 24, height: 24 }}
                            />
                            <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PeopleAltOutlinedIcon
                                sx={{
                                    width: 24,
                                    height: 24,
                                    color: "text.secondary",
                                }}
                            />
                            <Typography>{t("All Managers")}</Typography>
                        </Stack>
                    );
                }}
            >
                <MenuItem value="All Managers">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <PeopleAltOutlinedIcon
                            sx={{
                                width: 24,
                                height: 24,
                                color: "text.secondary",
                            }}
                        />
                        <Typography>{t("All Managers")}</Typography>
                    </Stack>
                </MenuItem>
                {users?.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                                src={user.avatar || ""}
                                alt={user.firstName}
                                sx={{ width: 24, height: 24 }}
                            />
                            <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                        </Stack>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ManagerSelect;
