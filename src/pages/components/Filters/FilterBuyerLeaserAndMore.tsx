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
import { useTranslation } from "react-i18next";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useState } from "react";

type FilterVariant = "property" | "customer";

interface FilterBuyerLeaserAndMoreProps {
    variant: FilterVariant;
    setRoles?: ActionCreatorWithPayload<any, string>;
}

export default function FilterBuyerLeaserAndMore(
    props: FilterBuyerLeaserAndMoreProps
) {
    const { variant = "property", setRoles } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const roles = ["buyer", "seller", "leaser", "owner"];

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setSelectedRoles(typeof value === "string" ? value.split(",") : value);
        if (setRoles) {
            dispatch(setRoles(value));
        }
    };

    return (
        <FormControl sx={{ minWidth: "130px" }}>
            <InputLabel id="demo-multiple-select-label">
                {t("Roles")}
            </InputLabel>
            <Select
                multiple
                labelId="demo-multiple-select-label"
                value={selectedRoles}
                onChange={handleChange}
                renderValue={(selected) => (selected as string[]).join(", ")}
                input={<OutlinedInput label={t("Roles")} />}
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                        <Checkbox checked={selectedRoles.indexOf(role) > -1} />
                        {t(role.charAt(0).toUpperCase() + role.slice(1))}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
