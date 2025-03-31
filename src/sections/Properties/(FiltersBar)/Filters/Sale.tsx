import {
    Checkbox,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGlobals } from "src/hooks/useGlobals";
import { StyledInputLabel } from "@/components/Filters";
import { useFiltersContext, useStates } from "../../FiltersContext";

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
        <FormControl sx={{ minWidth: "130px" }}>
            <StyledInputLabel>{t("State")}</StyledInputLabel>
            <Select
                multiple
                value={states}
                onChange={handleChange}
                renderValue={(selected: string[]) => {
                    return selected
                        .map(
                            (key) =>
                                stateEnum.find((item) => item.key === key)
                                    ?.value
                        )
                        .filter(Boolean) // Remove any undefined values
                        .join(", ");
                }}
                input={
                    <OutlinedInput
                        sx={{ maxHeight: "38px", textAlign: "center" }}
                        label="Κατάσταση"
                    />
                }
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {stateEnum.map(({ key, value }) => (
                    <MenuItem key={key} value={key}>
                        <Checkbox checked={states.indexOf(key) > -1} />

                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
