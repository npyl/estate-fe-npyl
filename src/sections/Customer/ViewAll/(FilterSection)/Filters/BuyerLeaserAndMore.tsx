import {
    Checkbox,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { StyledInputLabel } from "@/components/Filters";
import {
    useBuyer,
    useFiltersContext,
    useLeaser,
    useLessor,
    useSeller,
} from "../Context";

export default function FilterBuyerLeaserAndMore() {
    const { t } = useTranslation();

    const { setBuyer, setLeaser, setLessor, setSeller } = useFiltersContext();

    const leaser = useLeaser();
    const buyer = useBuyer();
    const seller = useSeller();
    const lessor = useLessor();

    // Create a representation of the selected values
    const selectedRoles = [];
    if (leaser) selectedRoles.push("leaser");
    if (buyer) selectedRoles.push("buyer");
    if (seller) selectedRoles.push("seller");
    if (lessor) selectedRoles.push("lessor");

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selected = event.target.value;
        setLeaser(selected.includes("leaser"));
        setBuyer(selected.includes("buyer"));
        setSeller(selected.includes("seller"));
        setLessor(selected.includes("lessor"));
    };

    return (
        <FormControl sx={{ minWidth: "200px" }}>
            <StyledInputLabel>{t("Roles")}</StyledInputLabel>
            <Select
                label={t("Roles")}
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
