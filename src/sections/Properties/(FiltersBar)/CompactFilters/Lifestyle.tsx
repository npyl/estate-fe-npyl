import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    resetExtras,
    selectExtras,
    toggleLifestyleFilter,
} from "@/slices/filters";
import ClearableSection from "@/components/Filters/ClearableSection";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import { Typography } from "@mui/material";
import { IPropertyFilterExtras } from "@/types/properties";

interface IOption {
    key: keyof IPropertyFilterExtras;
    label: string;
    value: string;
}

const lifestyleOptions: IOption[] = [
    { key: "student", label: "Student", value: "student" },
    { key: "seaFront", label: "Seafront", value: "sea_front" },
    { key: "luxury", label: "Luxury Homes", value: "luxury" },
    { key: "mountainView", label: "Mountain View", value: "mountain_view" },
    {
        key: "neoclassical",
        label: "Historic/Neoclassical",
        value: "neoclassical",
    },
    { key: "investment", label: "Investment", value: "investment" },
    { key: "goldenVisa", label: "Golden Visa", value: "golden_visa" },
];

const Lifestyle = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const extras = useSelector(selectExtras);
    const { counters, isCountersLoading } = useFilterCounters();

    return (
        <ClearableSection
            title={t("Lifestyle")}
            reset={() => dispatch(resetExtras())}
        >
            <Grid container>
                {lifestyleOptions.map(({ key, label, value }) => {
                    const count = counters?.[value] || 0;
                    const isDisabled = count === 0;

                    return (
                        <Grid item xs={6} sm={4} key={key}>
                            <FormControlLabel
                                control={<Checkbox />}
                                checked={extras[key]}
                                onChange={() =>
                                    dispatch(toggleLifestyleFilter(key))
                                }
                                disabled={isDisabled}
                                label={
                                    <Typography
                                        color={
                                            isDisabled
                                                ? "textSecondary"
                                                : "inherit"
                                        }
                                    >
                                        {t(label)}{" "}
                                        {Number(count) > 0 && `(${count})`}
                                    </Typography>
                                }
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </ClearableSection>
    );
};

export default Lifestyle;
