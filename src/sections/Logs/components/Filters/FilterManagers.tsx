import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAllUsersQuery } from "src/services/user";
import { selectUsers, setUsers } from "src/slices/log";
import { useDispatch } from "src/store";

export default function FilterLogManager() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { data } = useAllUsersQuery();
    const userOptions = data || [];

    const user = useSelector(selectUsers);

    const renderManagerNames = (selectedIds: number[]) => {
        const selectedUsers = userOptions.filter((option) =>
            selectedIds.includes(option.id)
        );
        const names = selectedUsers.map(
            (user) => `${user.firstName} ${user.lastName}`
        );
        return names.join(", "); // Join the names with a comma.
    };

    // Handle change event for multiple select.
    const handleChange = (event: SelectChangeEvent<number[]>) => {
        const selectedIds = event.target.value;
        dispatch(setUsers(selectedIds)); // Dispatch the action with all selected IDs.
    };

    return (
        <FormControl sx={{ minWidth: "130px" }}>
            <InputLabel>{t("Users")}</InputLabel>{" "}
            <Select
                multiple // Set the multiple attribute.
                value={user} // Ensure this is now an array.
                onChange={handleChange}
                renderValue={renderManagerNames} // Adjusted to handle multiple values.
                input={<OutlinedInput label={t("Users")} />} // Adjusted for multiple managers
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {userOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {`${option.firstName} ${option.lastName}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
