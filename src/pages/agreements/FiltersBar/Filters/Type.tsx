import { FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledInputLabel } from "@/components/Filters";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { useAgreementsFiltersContext } from "../FiltersContext";

const OPTIONS = [
    { key: "basic", label: "Basic" },
    { key: "purchase", label: "Purchase" },
];

export default function FilterType() {
    const { t } = useTranslation();
    const { filters, setFilter } = useAgreementsFiltersContext();

    return (
        <FormControl sx={{ minWidth: "130px" }}>
            <StyledInputLabel>{t("Type")}</StyledInputLabel>
            <Select
                value={filters.type}
                onChange={(e) => setFilter("type", e.target.value)}
                input={<OutlinedInput />}
            >
                {OPTIONS.map(({ key, label }) => (
                    <MenuItem key={key} value={key}>
                        {t(label)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
