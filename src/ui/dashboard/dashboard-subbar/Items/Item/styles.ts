import { SxProps, Theme } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";

const getButtonSx = (current: boolean): SxProps<Theme> => ({
    display: "flex",
    flexDirection: "row",
    gap: 1,

    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 10px",
    ...(current
        ? {
              border: 0,

              color: (theme) => theme.palette.neutral?.[200],
              backgroundColor: (theme) => theme.palette.primary.main,

              "&:hover": {
                  color: (theme) => theme.palette.neutral?.[100],
                  backgroundColor: (theme) => theme.palette.primary.dark,
              },
          }
        : {
              border: "1px solid",
              borderColor: getBorderColor2,

              color: (theme) =>
                  theme.palette.mode === "light"
                      ? theme.palette.neutral?.[900]
                      : theme.palette.neutral?.[200],

              backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                      ? theme.palette.background.paper
                      : theme.palette.neutral?.[800],

              "&:hover": {
                  backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                          ? theme.palette.background.paper
                          : theme.palette.neutral?.[800],
              },
          }),

    boxShadow: (theme) => theme.shadows[5],
    transition: "all 0.3s ease",
    cursor: "pointer",
    width: "fit-content",
    maxWidth: "350px",
});

export { getButtonSx };
