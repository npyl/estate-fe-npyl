import { Checkbox, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGlobals } from "@/sections/useGlobals";
import { useFiltersContext, useStates } from "../../FiltersContext";
import Select, { SelectChangeEvent } from "@/components/Select";

export default function SaleSelect() {
    const { t } = useTranslation();

    const data = useGlobals();

    const states = useStates();
    const { setStates } = useFiltersContext();

    const stateEnum = data?.property?.state || [];

    const handleChange = (event: SelectChangeEvent<typeof states>) => {
        const {
            target: { value },
        } = event;

        setStates(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <Select
            multiple
            value={states}
            onChange={handleChange}
            label={t("State")}
            formControlProps={{ sx: { minWidth: "130px" } }}
            renderValue={(selected: string[]) => {
                return selected
                    .map(
                        (key) =>
                            stateEnum.find((item) => item.key === key)?.value
                    )
                    .filter(Boolean) // Remove any undefined values
                    .join(", ");
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
        >
            {stateEnum.map(({ key, value }) => (
                <MenuItem key={key} value={key}>
                    <Checkbox checked={states.indexOf(key) > -1} />

                    {value}
                </MenuItem>
            ))}
        </Select>
    );
}
