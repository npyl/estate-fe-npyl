import CustomerAutocomplete from "@/sections/_Autocompletes/Customer";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { SxProps, Theme } from "@mui/material";

const Sx: SxProps<Theme> = {
    width: "100px",
};

const ToFilter = () => {
    const { to, setTo } = useFiltersContext();
    return <CustomerAutocomplete sx={Sx} value={to} onChange={setTo} />;
};

export default ToFilter;
