import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, SxProps, Theme } from "@mui/material";

const StartAdornmentSx: SxProps<Theme> = {
    height: 1,
    borderRight: { xs: 0, sm: "1px solid" },
    borderColor: ({ palette: { divider } }) => `${divider} !important`,
    borderRadius: 0,
};

const StartAdornment = () => (
    <InputAdornment position="start" sx={StartAdornmentSx}>
        <IconButton disableFocusRipple disableRipple>
            <SearchIcon />
        </IconButton>
    </InputAdornment>
);

export default StartAdornment;
