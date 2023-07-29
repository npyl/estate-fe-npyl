import { border, style, styled } from "@mui/system";
import { DateField, DatePicker } from "@mui/x-date-pickers";

const DateFieldStyled = styled(DatePicker)({
    "& .MuiFormLabel-root.Mui-error": {
        color: "#000000", // Or whatever color you want
    },
    "&.MuiFormControl-root-MuiTextField-root": {
        borderColour: "#000000",
    },
    style: { width: "100%" },
});

export default DateFieldStyled;
