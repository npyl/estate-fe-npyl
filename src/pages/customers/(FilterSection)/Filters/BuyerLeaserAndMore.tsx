import {
    Checkbox,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "src/store";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
import { StyledInputLabel } from "@/components/Filters";

export default function FilterBuyerLeaserAndMore() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);
    const seller = useSelector(selectSeller);
    const lessor = useSelector(selectLessor);

    // Create a representation of the selected values
    const selectedRoles = [];
    if (leaser) selectedRoles.push("leaser");
    if (buyer) selectedRoles.push("buyer");
    if (seller) selectedRoles.push("seller");
    if (lessor) selectedRoles.push("lessor");

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selected = event.target.value;
        dispatch(setLeaser(selected.includes("leaser")));
        dispatch(setBuyer(selected.includes("buyer")));
        dispatch(setSeller(selected.includes("seller")));
        dispatch(setLessor(selected.includes("lessor")));
    };

    return (
        <FormControl sx={{ minWidth: "130px", maxWidth: "200px" }}>
            <StyledInputLabel id="roles-label">{t("Roles")}</StyledInputLabel>
            <Select
                labelId="roles-label"
                multiple
                value={selectedRoles}
                onChange={handleChange}
                renderValue={(selected) =>
                    selected
                        .map((role) =>
                            t(role.charAt(0).toUpperCase() + role.slice(1))
                        )
                        .join(", ")
                }
                input={
                    <OutlinedInput
                        sx={{ maxHeight: "38px", textAlign: "center" }}
                        label={t("Roles")}
                    />
                }
            >
                <MenuItem value={"leaser"}>
                    <Checkbox checked={leaser} />
                    {t("Leaser")}
                </MenuItem>
                <MenuItem value={"buyer"}>
                    <Checkbox checked={buyer} />
                    {t("Buyer")}
                </MenuItem>
                <MenuItem value={"seller"}>
                    <Checkbox checked={seller} />
                    {t("Seller")}
                </MenuItem>
                <MenuItem value={"lessor"}>
                    <Checkbox checked={lessor} />
                    {t("Lessor")}
                </MenuItem>
            </Select>
        </FormControl>
    );
}
