import { Stack, styled } from "@mui/material";
import { HEADER_HEIGHT, Z_INDEX } from "../../../constant";
import { CSSProperties } from "react";

const StyledStack = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    backgroundColor: theme.palette.background.default,
    width: "100%",
    top: `${HEADER_HEIGHT * 2}px`,
    position: "sticky",
    zIndex: Z_INDEX.HEADER,

    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    borderTop: "1px solid",
    borderColor: theme.palette.divider,

    boxShadow: `0 4px 6px -1px ${theme.palette.action.hover}`, // Added box shadow
}));

const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
};

export { StyledStack, gridStyle };
