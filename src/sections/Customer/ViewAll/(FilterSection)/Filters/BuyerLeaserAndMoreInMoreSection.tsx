import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    selectBuyer,
    selectLeaser,
    selectLessor,
    selectSeller,
    setBuyer,
    setLeaser,
    setLessor,
    setSeller,
} from "src/slices/customer/filters";

const roles = [
    { key: "buyer", label: "Buyer" },
    { key: "leaser", label: "Leaser" },
    { key: "seller", label: "Seller" },
    { key: "lessor", label: "Lessor" },
];

const FilterBuyerLeaserAndMoreInMore = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const buyer = useSelector(selectBuyer);
    const leaser = useSelector(selectLeaser);
    const seller = useSelector(selectSeller);
    const lessor = useSelector(selectLessor);

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
                dispatch(setBuyer(value));
                break;
            case "leaser":
                dispatch(setLeaser(value));
                break;
            case "seller":
                dispatch(setSeller(value));
                break;
            case "lessor":
                dispatch(setLessor(value));
                break;
        }
    };

    const reset = () => {
        dispatch(setBuyer(false));
        dispatch(setLeaser(false));
        dispatch(setSeller(false));
        dispatch(setLessor(false));
    };

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
