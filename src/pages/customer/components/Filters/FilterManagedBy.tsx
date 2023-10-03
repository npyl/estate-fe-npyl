import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "src/store";
import Label from "src/components/label/Label";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { useAllUsersQuery } from "src/services/user";

interface FilterManagerProps {
    managers: number[];
    setManager: ActionCreatorWithPayload<any, string>;
}

export default function FilterManager(props: FilterManagerProps) {
    const { managers, setManager } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { data } = useAllUsersQuery();
    const managerOptions = data || [];

    const renderManagerName = (selectedId: number) => {
        const managerOption = managerOptions.find(
            (option: { id: number }) => option.id === selectedId
        );
        return managerOption
            ? `${managerOption.firstName} ${managerOption.lastName}`
            : "Unknown";
    };

    const handleChange = (event: SelectChangeEvent<number>) => {
        const {
            target: { value },
        } = event;
        dispatch(setManager(value)); // Dispatch the single value directly, not wrapped in an array
    };

    return (
        <FormControl sx={{ minWidth: "130px" }}>
            <InputLabel id="demo-simple-select-label">
                {t("Managers")}
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                value={managers[0] || ``} // Ensure it's a single value, use the first ID or an empty string
                onChange={handleChange}
                renderValue={(selected) =>
                    renderManagerName(selected as number)
                }
                input={<OutlinedInput label="Ετικέτες" />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {managerOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {`${option.firstName} ${option.lastName}`}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
