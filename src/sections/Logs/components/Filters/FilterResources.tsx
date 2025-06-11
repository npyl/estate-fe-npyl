import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGlobals } from "src/hooks/useGlobals";
import { useFiltersContext, useSelectResources } from "./Context";

export default function FilterResources() {
    const { t } = useTranslation();
    const data = useGlobals();

    const { setResources } = useFiltersContext();
    const resources = useSelectResources() ?? [];

    const logsEnums = data?.logs;
    const resourceEnums = logsEnums?.resourceTypes || [];

    const handleChange = (event: SelectChangeEvent<typeof resources>) => {
        const {
            target: { value },
        } = event;
        setResources(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    const getDisplayValues = (selectedKeys: string[]) => {
        // Map the keys back to their respective display values (i.e., 'value' field in your data).
        return selectedKeys.map((key: string) => {
            // Find the corresponding item in resourceEnums
            const item = resourceEnums?.find((item) => item.key === key);
            // Return the display value, or a fallback if not found.
            return item ? item.value : "Unknown";
        });
    };
    return (
        <FormControl sx={{ minWidth: "130px", maxWidth: "130px" }}>
            <InputLabel>{t("Resource")}</InputLabel>
            <Select
                multiple
                value={resources}
                onChange={handleChange}
                renderValue={(selected) => {
                    // Get display values.
                    const displayValues = getDisplayValues(selected);
                    // Join the values for displaying in the select box.
                    return displayValues.join(", ");
                }}
                input={<OutlinedInput label={t("Resource")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {resourceEnums.map(({ key, value }) => {
                    const isKeySelected = resources?.some(
                        (resourceKey) => resourceKey === key
                    );
                    return (
                        <MenuItem key={key} value={key}>
                            <Checkbox checked={isKeySelected} />
                            {value}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
