import { Stack, styled } from "@mui/material";
import { HEADER_HEIGHT } from "../../../constant";
import { CSSProperties } from "react";

const StyledStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    backgroundColor: theme.palette.background.default,
    width: "100%",
    top: `${HEADER_HEIGHT + 66}px`,
    position: "sticky",
    zIndex: 4,

    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    borderTop: "1px solid",
    borderColor: theme.palette.divider,
}));

const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
};

export { StyledStack, gridStyle };
