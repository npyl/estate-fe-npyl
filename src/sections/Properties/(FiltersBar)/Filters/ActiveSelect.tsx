import {
    Checkbox,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledInputLabel } from "@/components/Filters";
import { useActiveState, useFiltersContext } from "../../FiltersContext";

export default function ActiveSelect() {
    const { t } = useTranslation();

    const { setActiveState } = useFiltersContext();
    const activeState = useActiveState();

    const handleChange = (event: SelectChangeEvent<string>) => {
        let value: boolean | null = null;
        if (event.target.value === "true") {
            value = activeState === true ? null : true;
        } else if (event.target.value === "false") {
            value = activeState === false ? null : false;
        }
        setActiveState(value);
    };

    return (
        <FormControl sx={{ minWidth: "135px", maxWidth: "250px" }}>
            <StyledInputLabel>{t("Active")}</StyledInputLabel>
            <Select
                value={activeState === null ? "" : activeState?.toString()}
                onChange={handleChange}
                renderValue={(selected: string) => {
                    if (selected === "true") return t("Active");
                    if (selected === "false") return t("Inactive");
                    return "";
                }}
                input={<OutlinedInput label={t("Active")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                <MenuItem value="">
                    <Checkbox checked={activeState === null} />
                    {t("All")}
                </MenuItem>
                <MenuItem value="true">
                    <Checkbox checked={activeState === true} />
                    {t("Active")}
                </MenuItem>
                <MenuItem value="false">
                    <Checkbox checked={activeState === false} />
                    {t("Inactive")}
                </MenuItem>
            </Select>
        </FormControl>
    );
}
