import { border, styled } from "@mui/system";
import { DateField } from "@mui/x-date-pickers";

const DateFieldStyled = styled(DateField)({
  "& .MuiFormLabel-root.Mui-error": {
    color: "#000000", // Or whatever color you want
  },
  "&.MuiFormControl-root-MuiTextField-root": {
    borderColour: "#000000",
  },
});

export default DateFieldStyled;
