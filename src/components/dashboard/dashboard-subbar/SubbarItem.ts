import { Button, ButtonProps } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";
import { styled } from "@mui/material/styles";

interface SubbarItemProps extends ButtonProps {
    current: boolean;
}

const SubbarItem = styled(Button, {
    shouldForwardProp: (prop) => prop !== "current",
})<SubbarItemProps>(({ theme, current }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    display: "flex",
    marginInline: 2,
    justifyContent: "space-between",
    alignItems: "center",

    ...(current
        ? {
              color: theme.palette.neutral?.[200],
              backgroundColor: theme.palette.primary.main,

              "&:hover": {
                  color: theme.palette.neutral?.[100],
                  backgroundColor: theme.palette.primary.dark,
              },
          }
        : {
              color:
                  theme.palette.mode === "light"
                      ? theme.palette.neutral?.[900]
                      : theme.palette.neutral?.[200],

              backgroundColor:
                  theme.palette.mode === "light"
                      ? theme.palette.background.paper
                      : theme.palette.neutral?.[800],
          }),
    boxShadow: theme.shadows[5],
    transition: "all 0.3s ease",
    cursor: "pointer",
    flexDirection: "row",
    minWidth: "275px",
    width: "max-content",
    maxWidth: "350px",
    // Text Content
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
}));

export default SubbarItem;
