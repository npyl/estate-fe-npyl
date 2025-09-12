import { getBorderColor2 } from "@/theme/borderColor";
import { styled } from "@mui/material/styles";
import Link from "@/components/Link";

const Card = styled(Link)(({ theme }) => ({
    cursor: "pointer",
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    borderRadius: "15px",
    padding: theme.spacing(1),
    boxShadow: theme.shadows[10],
    backgroundColor: theme.palette.background.paper,
    // ...
    height: "250px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // ...
    "& .AgreementCardButtons": {
        visibility: "hidden",

        // Visible on mobile
        [theme.breakpoints.down("lg")]: {
            visibility: "visible",
        },
    },
    "&:hover": {
        boxShadow: theme.shadows[20],

        "& .AgreementCardButtons": {
            visibility: "visible",
        },
    },
}));

export default Card;
