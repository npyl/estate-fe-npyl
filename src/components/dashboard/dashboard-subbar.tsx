import ClearIcon from "@mui/icons-material/Clear";
import { Button, ButtonProps, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useMemo } from "react";
import { ScrollBox } from "../ScrollBox";
import { useTabsContext } from "src/contexts/tabs";
import useAutosaveRouter from "src/components/Router/Autosave";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";

interface SubbarItemProps extends ButtonProps {
    current: boolean;
}

const SubbarItem = styled(Button)<SubbarItemProps>(({ theme, current }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),

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

    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1.5),

    transition: "all 0.3s ease",

    cursor: "pointer",

    flexDirection: "row",
    alignItems: "center",
}));

const Subbar = () => {
    const router = useAutosaveRouter();
    const { appTabs, removeTab } = useTabsContext();

    const currentPath = useMemo(() => router.asPath, [router.asPath]);

    return (
        <ScrollBox sx={{ overflowX: "auto" }}>
            <Stack direction={"row"} spacing={1}>
                {appTabs.map(({ id, label, path }) => (
                    <SubbarItem
                        key={id}
                        current={currentPath === path}
                        endIcon={
                            <IconButton onClick={() => removeTab(id)}>
                                <ClearIcon
                                    sx={{
                                        fontSize: "15px",
                                    }}
                                />
                            </IconButton>
                        }
                    >
                        <Typography variant="body2">{label}</Typography>
                    </SubbarItem>
                ))}
            </Stack>
        </ScrollBox>
    );
};

export default Subbar;
