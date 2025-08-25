import { FormControl, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import { useFiltersContext, useStatus } from "../Context";

const StyledRating = styled(Rating)(({ theme }) => ({
    borderRadius: "7px",
    border: "1px solid",
    justifyContent: "center",
    minWidth: "100%",

    // width: "160%",
    // ...
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.72),
    paddingBottom: theme.spacing(0.72),
    // ...
    "& .MuiRating-icon": {
        fontSize: "25px", // Increase the star size
        marginRight: theme.spacing(1.3),
    },
    borderColor: getBorderColor2(theme),
    "&:hover": {
        borderColor:
            theme.palette.mode === "light"
                ? "black"
                : theme.palette.neutral?.[500],
    },
}));

export default function FilterStatus() {
    const { setStatus } = useFiltersContext();
    const status = useStatus() ?? 0;

    const onChange = (_event: any, value: number | null) => {
        setStatus(
            // On autofill we get a stringified value.
            value ? value : undefined
        );
    };

    return (
        <FormControl>
            <StyledRating value={status} onChange={onChange} />
        </FormControl>
    );
}
