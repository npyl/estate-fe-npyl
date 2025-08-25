import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import {
    useBuyer,
    useFiltersContext,
    useLeaser,
    useLessor,
    useSeller,
} from "../Context";

const roles = [
    { key: "buyer", label: "Buyer" },
    { key: "leaser", label: "Leaser" },
    { key: "seller", label: "Seller" },
    { key: "lessor", label: "Lessor" },
];

const FilterBuyerLeaserAndMoreInMore = () => {
    const { t } = useTranslation();

    const { setBuyer, setLeaser, setLessor, setSeller } = useFiltersContext();
    const leaser = useLeaser();
    const buyer = useBuyer();
    const seller = useSeller();
    const lessor = useLessor();

    const getChecked = (key: string) => {
        switch (key) {
            case "buyer":
                return buyer;
            case "leaser":
                return leaser;
            case "seller":
                return seller;
            case "lessor":
                return lessor;
            default:
                return false;
        }
    };

    const handleToggle = (key: string) => {
        const value = !getChecked(key);
        switch (key) {
            case "buyer":
                setBuyer(value);
                break;
            case "leaser":
                setLeaser(value);
                break;
            case "seller":
                setSeller(value);
                break;
            case "lessor":
                setLessor(value);
                break;
        }
    };

    const reset = useCallback(() => {
        setBuyer(false);
        setLeaser(false);
        setSeller(false);
        setLessor(false);
    }, []);

    return (
        <ClearableSection title={t("Roles")} reset={reset}>
            <Grid container>
                {roles.map(({ key, label }) => (
                    <Grid
                        key={key}
                        item
                        xs={6}
                        sm={4}
                        display="flex"
                        alignItems="center"
                        pr={1}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={getChecked(key)}
                                    onChange={() => handleToggle(key)}
                                />
                            }
                            label={t(label)}
                        />
                    </Grid>
                ))}
            </Grid>
        </ClearableSection>
    );
};

export default FilterBuyerLeaserAndMoreInMore;
