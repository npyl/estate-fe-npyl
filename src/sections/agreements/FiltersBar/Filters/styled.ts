import { styled } from "@mui/material/styles";
import { FilterBox as DefaultFilterBox } from "@/components/Filters/styled";
import { ToggleButtonGroup } from "@mui/material";

export const FilterBox = styled(DefaultFilterBox)(({ theme }) => ({
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    gap: theme.spacing(1),
}));

export const FilterButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButton-root": {
        borderTop: 0,
        borderBottom: 0,
    },

    "&>*:first-of-type": {
        borderLeft: 0,
        borderTopLeftRadius: "7px",
        borderBottomLeftRadius: "7px",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    "&>*:last-of-type": {
        borderRight: 0,
        borderTopRightRadius: "7px",
        borderBottomRightRadius: "7px",
    },
}));
