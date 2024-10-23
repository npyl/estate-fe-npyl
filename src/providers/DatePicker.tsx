import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, PropsWithChildren } from "react";
import { EUROPEAN_DATE_FORMAT } from "@/constants/datepicker";

const DatePickerProvider: FC<PropsWithChildren> = ({ children }) => (
    <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateFormats={{
            keyboardDate: EUROPEAN_DATE_FORMAT,
        }}
    >
        {children}
    </LocalizationProvider>
);

export default DatePickerProvider;
