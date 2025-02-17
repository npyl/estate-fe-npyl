import { SxProps, Theme } from "@mui/material/styles";

const NON_PRINTABLE: SxProps<Theme> = {
    "@media print": {
        display: "none",
    },
};

export { NON_PRINTABLE };
