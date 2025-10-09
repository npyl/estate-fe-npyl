import { alpha, styled } from "@mui/material/styles";
import { DateRange } from "react-date-range";

const StyledDateRange = styled(DateRange)(({ theme }) => ({
    "& .rdrDayNumber": {
        position: "relative",

        alignItems: "center",
        justifyContent: "center",

        "& span": {
            color: theme.palette.text.primary,
        },
    },

    // -----------------------------------------------------------------

    "& .rdrWeekDays": {
        display: "flex",
        padding: theme.spacing(1),
    },

    "& .rdrWeekDay": {
        flexBasis: "calc(100% / 7)",
        boxSizing: "inherit",
        textAlign: "center",
        color: theme.palette.text.secondary,
    },

    // ----------------------------------------------------------------

    "& .rdrMonth": {
        width: "fit-content",
        maxWidth: "400px",
        padding: theme.spacing(1),
        "& .rdrWeekDays": {
            padding: 0,
        },
    },

    // ---------------------------------------------------------------

    "& .rdrDay": {
        width: "calc(100% / 7)",
        position: "relative",
        font: "inherit",
        cursor: "pointer",
        background: "transparent",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        userSelect: "none",
        border: 0,
        padding: 0,
        textAlign: "center",
        height: "3.000em",
    },

    "& .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span":
        {
            color: "white",
        },

    "& .rdrDayPassive": {
        pointerEvents: "none",

        "& .rdrDayNumber span": {
            color: theme.palette.action.disabled,
        },
    },

    "& .rdrSelected, & .rdrInRange, & .rdrStartEdge, & .rdrEndEdge": {
        pointerEvents: "none",
        background: "currentColor",
        position: "absolute",
        top: "5px",
        left: "0",
        right: "0",
        bottom: "5px",
    },

    "& .rdrSelected": {
        left: "2px",
        right: "2px",
        borderRadius: "1.042em",
    },

    "& .rdrStartEdge": {
        borderTopLeftRadius: "1.042em",
        borderBottomLeftRadius: "1.042em",
        left: "2px",
    },

    "& .rdrEndEdge": {
        borderTopRightRadius: "1.042em",
        borderBottomRightRadius: "1.042em",
        right: "2px",
    },

    "& .rdrDayStartOfMonth .rdrInRange, & .rdrDayStartOfMonth .rdrEndEdge, & .rdrDayStartOfWeek .rdrInRange, & .rdrDayStartOfWeek .rdrEndEdge":
        {
            borderTopLeftRadius: "1.042em",
            borderBottomLeftRadius: "1.042em",
            left: "2px",
        },

    "& .rdrDayEndOfMonth .rdrInRange, & .rdrDayEndOfMonth .rdrStartEdge, & .rdrDayEndOfWeek .rdrInRange, & .rdrDayEndOfWeek .rdrStartEdge":
        {
            borderTopRightRadius: "1.042em",
            borderBottomRightRadius: "1.042em",
            right: "2px",
        },

    "& .rdrDayStartOfMonth .rdrDayInPreview, & .rdrDayStartOfMonth .rdrDayEndPreview, & .rdrDayStartOfWeek .rdrDayInPreview, & .rdrDayStartOfWeek .rdrDayEndPreview":
        {
            borderTopLeftRadius: "1.333em",
            borderBottomLeftRadius: "1.333em",
            borderLeftWidth: "1px",
            left: "0px",
        },

    "& .rdrDayEndOfMonth .rdrDayInPreview, & .rdrDayEndOfMonth .rdrDayStartPreview, & .rdrDayEndOfWeek .rdrDayInPreview, & .rdrDayEndOfWeek .rdrDayStartPreview":
        {
            borderTopRightRadius: "1.333em",
            borderBottomRightRadius: "1.333em",
            borderRightWidth: "1px",
            right: "0px",
        },

    "& .rdrDayStartPreview, & .rdrDayInPreview, & .rdrDayEndPreview": {
        pointerEvents: "none",
        background: alpha(theme.palette.primary.light, 0.1),
        position: "absolute",
        top: "3px",
        left: "0px",
        right: "0px",
        bottom: "3px",
        border: "0px solid currentColor",
        zIndex: "1",
    },

    "& .rdrDayStartPreview": {
        borderTopWidth: "1px",
        borderLeftWidth: "1px",
        borderBottomWidth: "1px",
        borderTopLeftRadius: "1.333em",
        borderBottomLeftRadius: "1.333em",
        left: "0px",
    },

    "& .rdrDayInPreview": {
        borderTopWidth: "1px",
        borderBottomWidth: "1px",
    },

    "& .rdrDayEndPreview": {
        borderTopWidth: "1px",
        borderRightWidth: "1px",
        borderBottomWidth: "1px",
        borderTopRightRadius: "1.333em",
        borderBottomRightRadius: "1.333em",
        right: "0px",
    },
}));

export default StyledDateRange;
