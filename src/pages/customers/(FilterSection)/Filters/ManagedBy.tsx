import {
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "src/store";
import { useTranslation } from "react-i18next";
import { useAllUsersQuery } from "src/services/user";
import { useSelector } from "react-redux";
import { selectManagerId, setManagerId } from "src/slices/customer/filters";
import { StyledInputLabel } from "@/components/Filters";

export default function FilterManager() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { data } = useAllUsersQuery();
    const managerOptions = data || [];

    const manager = useSelector(selectManagerId);

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
        dispatch(setManagerId(value));
    };

    return (
        <FormControl sx={{ minWidth: "130px", maxWidth: "200px" }}>
            <StyledInputLabel>{t("Managers")}</StyledInputLabel>
            <Select
                value={manager || ""}
                onChange={handleChange}
                renderValue={renderManagerName}
                input={
                    <OutlinedInput
                        sx={{ maxHeight: "38px", textAlign: "center" }}
                        label="Ετικέτες"
                    />
                }
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
