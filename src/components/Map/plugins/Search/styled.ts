import { styled } from "@mui/material/styles";
import PlacesAutocomplete from "./PlacesAutocomplete";

const StyledAutocomplete = styled(PlacesAutocomplete)({
    width: "30%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "& .MuiInputBase-input": {
        paddingLeft: 5,
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: "20px",
        height: "45px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:focus-within": {
        width: "calc(100% - 9px)",
    },
});

export { StyledAutocomplete };
