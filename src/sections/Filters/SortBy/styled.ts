import { SxProps, Theme } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";

const getStackSx = (open: boolean): SxProps<Theme> => ({
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // ...
    height: "38px",
    minWidth: "38px",
    paddingLeft: 0.5,
    paddingRight: 1,
    // ...
    color: ({ palette: { mode, neutral, text } }) =>
        mode === "dark" ? neutral?.[400] : text.secondary,
    border: "1px solid",
    borderRadius: "10px",
    borderColor: (theme) =>
        open ? theme.palette.primary.main : getBorderColor2(theme),
    cursor: "pointer",

    ".PPSortByButton-Label": {
        display: {
            xs: "none",
            md: "block",
        },
    },

    // ...
    "&:hover": {
        ...(open
            ? {
                  borderColor: (theme) => theme.palette.primary.main,
              }
            : {
                  borderColor: (theme) =>
                      theme.palette.mode === "light"
                          ? "black"
                          : theme.palette.neutral?.[500],
              }),
    },

    ...(open
        ? {
              borderWidth: "2px",
          }
        : {}),
});

export default getStackSx;
