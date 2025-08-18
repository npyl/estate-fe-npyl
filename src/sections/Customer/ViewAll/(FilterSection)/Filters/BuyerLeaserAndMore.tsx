import { Checkbox, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
    useBuyer,
    useFiltersContext,
    useLeaser,
    useLessor,
    useSeller,
} from "../Context";
import Select, { SelectChangeEvent } from "@/components/Select";
import { useCallback } from "react";

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

    const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
        const selected = event.target.value;
        setLeaser(selected.includes("leaser"));
        setBuyer(selected.includes("buyer"));
        setSeller(selected.includes("seller"));
        setLessor(selected.includes("lessor"));
    }, []);

    return (
        <Select
            multiple
            label={t("Roles")}
            value={selectedRoles}
            onChange={handleChange}
            formControlProps={{ sx: { minWidth: "200px" } }}
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
    );
}
