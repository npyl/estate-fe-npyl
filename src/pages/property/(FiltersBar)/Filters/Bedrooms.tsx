import { ListItemText, MenuItem, Select, Stack } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
    resetBedrooms,
    selectMaxBedrooms,
    selectMinBedrooms,
    setMaxBedrooms,
    setMinBedrooms,
} from "src/slices/filters";

import ClearableSection from "@/components/Filters/ClearableSection";
import { useTranslation } from "react-i18next";

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

    const dispatch = useDispatch();

    const minBedrooms = useSelector(selectMinBedrooms) || 0;
    const maxBedrooms = useSelector(selectMaxBedrooms) || 0;

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
                    onChange={(e) =>
                        dispatch(
                            setMinBedrooms(
                                e.target.value === 0
                                    ? undefined
                                    : e.target.value
                            )
                        )
                    }
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
                                dispatch(setMaxBedrooms(0))
                            }
                        >
                            <ListItemText primary={option.toString()} />
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    sx={{ width: 130 }}
                    value={maxBedrooms}
                    onChange={(e) =>
                        dispatch(
                            setMaxBedrooms(
                                e.target.value === 0
                                    ? undefined
                                    : e.target.value
                            )
                        )
                    }
                >
                    <MenuItem value={0}>
                        <ListItemText primary={t("Indifferent")} />
                    </MenuItem>
                    {generateNumbers().map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            onClick={() =>
                                option < minBedrooms &&
                                dispatch(setMinBedrooms(0))
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
