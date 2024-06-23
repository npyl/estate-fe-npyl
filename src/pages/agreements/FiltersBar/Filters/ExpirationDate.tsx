import { FormControl } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers";
import { useAgreementsFiltersContext } from "../FiltersContext";
import dayjs from "dayjs";

export default function FilterActive() {
    const { t } = useTranslation();
    const { filters, setFilter } = useAgreementsFiltersContext();

    return (
        <FormControl sx={{ width: "180px" }}>
            <DatePicker
                label={t("Expiration Date")}
                value={
                    filters.expirationDate
                        ? dayjs(filters.expirationDate)
                        : null
                }
                onChange={(d) => setFilter("expirationDate", d?.toISOString())}
            />
        </FormControl>
    );
}
