import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, PropsWithChildren } from "react";
import { EUROPEAN_DATE_FORMAT } from "@/constants/datepicker";
import { enUS, elGR } from "@mui/x-date-pickers/locales";
import { useTranslation } from "react-i18next";

// INFO: these are important
import "dayjs/locale/en-gb";
import "dayjs/locale/el";

const LOCALE_MAP: Record<string, any> = {
    en: {
        adapterLocale: "en",
        localeText:
            enUS.components.MuiLocalizationProvider.defaultProps.localeText,
    },
    el: {
        adapterLocale: "el",
        localeText:
            elGR.components.MuiLocalizationProvider.defaultProps.localeText,
    },
};

const DatePickerProvider: FC<PropsWithChildren> = ({ children }) => {
    const { i18n } = useTranslation();

    const props = LOCALE_MAP[i18n.language];

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateFormats={{ keyboardDate: EUROPEAN_DATE_FORMAT }}
            // ...
            {...props}
        >
            {children}
        </LocalizationProvider>
    );
};

export default DatePickerProvider;
