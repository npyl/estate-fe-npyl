import { Stack, StackProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";

interface StyledStackProps extends StackProps {
    open: boolean;
}

const StyledStack = styled(Stack)<StyledStackProps>(({ theme, open }) => ({
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // ...
    height: "38px",
    minWidth: "38px",
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    // ...
    color:
        theme.palette.mode === "dark"
            ? theme.palette.neutral?.[400]
            : theme.palette.text.secondary,
    border: "1px solid",
    borderRadius: "10px",
    borderColor: open ? theme.palette.primary.main : getBorderColor2(theme),
    cursor: "pointer",
    // ...
    "&:hover": {
        ...(open
            ? {
                  borderColor: theme.palette.primary.main,
              }
            : {
                  borderColor:
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
}));

export default StyledStack;
