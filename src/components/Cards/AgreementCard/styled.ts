import { getBorderColor2 } from "@/theme/borderColor";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const Card = styled(Paper)(({ theme }) => ({
    cursor: "pointer",
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    borderRadius: "15px",
    padding: theme.spacing(1),
    boxShadow: theme.shadows[10],
    height: "250px",
    // ...
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // ...
    "& .AgreementCardButtons": {
        visibility: "hidden",
    },
    "&:hover": {
        boxShadow: theme.shadows[20],

        "& .AgreementCardButtons": {
            visibility: "visible",
        },
    },
}));
