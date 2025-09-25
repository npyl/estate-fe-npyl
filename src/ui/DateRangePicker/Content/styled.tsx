import { styled } from "@mui/material/styles";
import { DateRange } from "react-date-range";

const StyledDateRange = styled(DateRange)(({ theme }) => ({
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
        padding: theme.spacing(1),
        "& .rdrWeekDays": {
            padding: 0,
        },
    },

    // ---------------------------------------------------------------

    "& .rdrMonths.rdrMonthsVertical .rdrMonth:first-child .rdrMonthName": {
        display: "none",
    },

    "& .rdrDays": {
        display: "flex",
        flexWrap: "wrap",
    },

    "& .rdrInfiniteMonths": {
        overflow: "auto",
    },

    "& .rdrDateRangeWrapper": {
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        userSelect: "none",
    },

    "& .rdrDateInput": {
        position: "relative",

        "& input": {
            outline: "none",
        },

        "& .rdrWarning": {
            position: "absolute",
            fontSize: "1.6em",
            lineHeight: "1.6em",
            top: 0,
            right: ".25em",
            color: "#FF0000",
        },
    },

    "& .rdrDay": {
        boxSizing: "inherit",
        width: "calc(100% / 7)",
        position: "relative",
        font: "inherit",
        cursor: "pointer",
        background: "transparent",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        userSelect: "none",
        border: "0",
        padding: "0",
        lineHeight: "3.000em",
        height: "3.000em",
        textAlign: "center",
        color: "#1d2429",

        "&:focus": {
            outline: "0",
        },
    },

    "& .rdrDayNumber": {
        display: "block",
        position: "relative",
        outline: "0",
        fontWeight: "300",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        alignItems: "center",
        justifyContent: "center",

        "& span": {
            color: "#1d2429",
        },
    },

    "& .rdrDayToday .rdrDayNumber span": {
        fontWeight: "500",

        "&:after": {
            content: "''",
            position: "absolute",
            bottom: "4px",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "18px",
            height: "2px",
            borderRadius: "2px",
            background: "#3d91ff",
        },
    },

    "& .rdrDayToday:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span:after, & .rdrDayToday:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span:after, & .rdrDayToday:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span:after, & .rdrDayToday:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span:after":
        {
            background: "#fff",
        },

    "& .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span, & .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span":
        {
            color: "rgba(255, 255, 255, 0.85)",
        },

    "& .rdrDayDisabled": {
        cursor: "not-allowed",
        backgroundColor: "rgb(248, 248, 248)",

        "& .rdrDayNumber span": {
            color: "#aeb9bf",
        },

        "& .rdrInRange, & .rdrStartEdge, & .rdrEndEdge, & .rdrSelected, & .rdrDayStartPreview, & .rdrDayInPreview, & .rdrDayEndPreview":
            {
                filter: "grayscale(100%) opacity(60%)",
            },
    },

    "& .rdrDayPassive": {
        pointerEvents: "none",

        "& .rdrDayNumber span": {
            color: "#d5dce0",
        },

        "& .rdrInRange, & .rdrStartEdge, & .rdrEndEdge, & .rdrSelected, & .rdrDayStartPreview, & .rdrDayInPreview, & .rdrDayEndPreview":
            {
                display: "none",
            },
    },

    // Support for IE
    "@supports (-ms-ime-align: auto)": {
        "& .rdrDay": {
            flexBasis: "14.285% !important",
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
        background: "rgba(255, 255, 255, 0.09)",
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

    "& .rdrDefinedRangesWrapper": {
        fontSize: "12px",
        width: "226px",
        borderRight: "solid 1px #eff2f7",
        background: "#fff",

        "& .rdrStaticRangeSelected": {
            color: "currentColor",
            fontWeight: "600",
        },
    },

    "& .rdrDateRangePickerWrapper": {
        display: "inline-flex",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        userSelect: "none",
    },

    "& .rdrStaticRanges": {
        display: "flex",
        flexDirection: "column",
    },

    "& .rdrStaticRange": {
        fontSize: "inherit",
        border: "0",
        cursor: "pointer",
        display: "block",
        outline: "0",
        borderBottom: "1px solid #eff2f7",
        padding: "0",
        background: "#fff",

        "&:hover .rdrStaticRangeLabel, &:focus .rdrStaticRangeLabel": {
            background: "#eff2f7",
        },
    },

    "& .rdrStaticRangeLabel": {
        display: "block",
        outline: "0",
        lineHeight: "18px",
        padding: "10px 20px",
        textAlign: "left",
    },

    "& .rdrInputRanges": {
        padding: "10px 0",
    },

    "& .rdrInputRange": {
        display: "flex",
        alignItems: "center",
        padding: "5px 20px",
    },

    "& .rdrInputRangeInput": {
        width: "30px",
        height: "30px",
        lineHeight: "30px",
        borderRadius: "4px",
        textAlign: "center",
        border: "solid 1px rgb(222, 231, 235)",
        marginRight: "10px",
        color: "rgb(108, 118, 122)",

        "&:focus, &:hover": {
            borderColor: "rgb(180, 191, 196)",
            outline: "0",
            color: "#333",
        },
    },

    "& .rdrCalendarWrapper:not(.rdrDateRangeWrapper) .rdrDayHovered .rdrDayNumber:after":
        {
            content: "''",
            border: "1px solid currentColor",
            borderRadius: "1.333em",
            position: "absolute",
            top: "-2px",
            bottom: "-2px",
            left: "0px",
            right: "0px",
            background: "transparent",
        },

    "& .rdrMonthName": {
        textAlign: "left",
        fontWeight: "600",
        color: "#849095",
        padding: "0.833em",
    },
}));

export default StyledDateRange;
