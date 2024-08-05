import { useTranslation } from "react-i18next";
import { DatePicker, DatePickerSlotProps } from "@mui/x-date-pickers";
import { useAgreementsFiltersContext } from "../FiltersContext";
import dayjs from "dayjs";

const SlotProps: DatePickerSlotProps<dayjs.Dayjs, false> = {
    textField: {
        sx: {
            width: "180px",
            flexShrink: 0,
        },
    },
};

const key = "expiresBy";

export default function FilterActive() {
    const { t } = useTranslation();
    const { filters, setFilter } = useAgreementsFiltersContext();

    const value = filters[key] ? dayjs(filters[key]) : null;

    const handleChange = (d: dayjs.Dayjs | null) =>
        setFilter(key, d?.toISOString());

    return (
        <DatePicker
            slotProps={SlotProps}
            label={t("_expiresBy_")}
            value={value}
            onChange={handleChange}
        />
    );
}
