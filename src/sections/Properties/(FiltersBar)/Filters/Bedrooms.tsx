import { ListItemText, MenuItem, Select, Stack } from "@mui/material";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useTranslation } from "react-i18next";
import {
    useFiltersContext,
    useMaxBedrooms,
    useMinBedrooms,
} from "../../FiltersContext";

// ----------------------------------------------------------------------------

function generateNumbers() {
    const numbers = [];

    for (let i = 1; i <= 10; i += 1) {
        numbers.push(i);
    }

    return numbers;
}

// ----------------------------------------------------------------------------

const Bedrooms = () => {
    const { t } = useTranslation();

    const { setMinBedrooms, setMaxBedrooms, resetBedrooms } =
        useFiltersContext();

    const minBedrooms = useMinBedrooms() || 0;
    const maxBedrooms = useMaxBedrooms() || 0;

    return (
        <ClearableSection title={t("Bedrooms")} reset={resetBedrooms}>
            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={1}
                alignItems="center"
            >
                <Select
                    sx={{ width: 130 }}
                    value={minBedrooms}
                    onChange={(e) => {
                        const v = e.target.value as number;
                        setMinBedrooms(v === 0 ? undefined : v);
                    }}
                >
                    <MenuItem value={0}>
                        <ListItemText primary={t("Indifferent")} />
                    </MenuItem>
                    {generateNumbers().map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            onClick={() =>
                                option > maxBedrooms &&
                                maxBedrooms !== 0 &&
                                setMaxBedrooms(0)
                            }
                        >
                            <ListItemText primary={option.toString()} />
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    sx={{ width: 130 }}
                    value={maxBedrooms}
                    onChange={(e) => {
                        const v = e.target.value as number;
                        setMaxBedrooms(v === 0 ? undefined : v);
                    }}
                >
                    <MenuItem value={0}>
                        <ListItemText primary={t("Indifferent")} />
                    </MenuItem>
                    {generateNumbers().map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            onClick={() =>
                                option < minBedrooms && setMinBedrooms(0)
                            }
                        >
                            <ListItemText primary={option.toString()} />
                        </MenuItem>
                    ))}
                </Select>
            </Stack>
        </ClearableSection>
    );
};

export default Bedrooms;
