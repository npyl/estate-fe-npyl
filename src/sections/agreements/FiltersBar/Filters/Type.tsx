import { FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledInputLabel } from "@/components/Filters";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { useAgreementsFiltersContext } from "../FiltersContext";
import { IAgreementType } from "@/types/agreements";

const key = "variants";

interface Option {
    key: IAgreementType;
    label: string;
}

const OPTIONS: Option[] = [
    { key: "BASIC", label: "Basic" },
    { key: "BASIC_EXCLUSIVE", label: "Basic Exclusive" },
    { key: "PURCHASE", label: "Purchase" },
];

export default function FilterType() {
    const { t } = useTranslation();
    const { filters, setFilter, clearFilter } = useAgreementsFiltersContext();

    const handleChange = (e: SelectChangeEvent<any>) =>
        e.target.value.includes("")
            ? clearFilter(key)
            : setFilter(key, e.target.value);

    return (
        <FormControl sx={{ minWidth: "130px" }}>
            <StyledInputLabel>{t("Type")}</StyledInputLabel>
            <Select
                multiple
                value={filters[key] || []}
                onChange={handleChange}
                input={<OutlinedInput />}
            >
                <MenuItem value="">{t("Not selected")}</MenuItem>
                {OPTIONS.map(({ key, label }) => (
                    <MenuItem key={key} value={key}>
                        {t(label)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
