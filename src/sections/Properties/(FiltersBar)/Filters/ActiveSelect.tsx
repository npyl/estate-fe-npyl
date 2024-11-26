import React from "react";
import {
    Checkbox,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "src/store";
import { StyledInputLabel } from "@/components/Filters";
import { selectActiveState, setActiveState } from "@/slices/filters";

export default function ActiveSelect() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const activeState = useSelector(selectActiveState);

    const handleChange = (event: SelectChangeEvent<string>) => {
        let value: boolean | null = null;
        if (event.target.value === "true") {
            value = activeState === true ? null : true;
        } else if (event.target.value === "false") {
            value = activeState === false ? null : false;
        }
        dispatch(setActiveState(value));
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
