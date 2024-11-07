/**
 * integration with Calendar's DatePickers
 */

import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import dynamic from "next/dynamic";
const Pickers = dynamic(() => import("./Pickers"));

const SwitchSx = {
    gap: 1,
    ml: 0,
    "& .MuiFormControlLabel-label": {
        color: "text.secondary",
    },
    alignSelf: "start",
};

const WithCalendar = () => {
    const { t } = useTranslation();

    const { watch } = useFormContext();

    const isOpen = watch("withCalendar");

    return (
        <>
            <RHFIOSSwitch
                name="withCalendar"
                label={t("Connect with Calendar")}
                labelPlacement="start"
                sx={SwitchSx}
            />

            {isOpen ? <Pickers /> : null}
        </>
    );
};

export default WithCalendar;
