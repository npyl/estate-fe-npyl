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
        <FormControl sx={{ minWidth: "165px", maxWidth: "250px" }}>
            <StyledInputLabel>{t("Active Property")}</StyledInputLabel>
            <Select
                value={activeState === null ? "" : activeState?.toString()}
                onChange={handleChange}
                renderValue={(selected: string) => {
                    if (selected === "true") return "Active";
                    if (selected === "false") return "Inactive";
                    return "";
                }}
                input={<OutlinedInput label={t("Active Property")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                <MenuItem value="">
                    <Checkbox checked={activeState === null} />
                    All
                </MenuItem>
                <MenuItem value="true">
                    <Checkbox checked={activeState === true} />
                    Active
                </MenuItem>
                <MenuItem value="false">
                    <Checkbox checked={activeState === false} />
                    Inactive
                </MenuItem>
            </Select>
        </FormControl>
    );
}
