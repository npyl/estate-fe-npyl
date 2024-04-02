import { Box, Paper, Stack, Tab, TabProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import getBorderColor from "src/theme/borderColor";

interface StyledTabProps extends TabProps {
    selected: boolean;
}

const StyledTab = styled(Tab)<StyledTabProps>(({ theme, selected }) => ({
    ...(selected
        ? {
              border: "1px solid",
              borderBottom: 0,
              borderColor: getBorderColor(theme),

              backgroundColor: "background.paper",
          }
        : {
              borderBottom: "1px solid",
              borderBottomColor: getBorderColor(theme),

              "&:hover": {
                  backgroundColor:
                      theme.palette.mode === "dark"
                          ? theme.palette.neutral?.[700]
                          : theme.palette.neutral?.[350],
              },
          }),

    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",

    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
}));

const Content = styled(Paper)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderRadius: "15px",

    borderLeft: "1px solid",
    borderRight: "1px solid",
    borderBottom: "1px solid",

    borderLeftColor: getBorderColor(theme),
    borderRightColor: getBorderColor(theme),
    borderBottomColor: getBorderColor(theme),
}));

const LeftSpace = (
    <Box
        sx={{
            ml: 1.7,
        }}
    />
);
const RightSpace = styled(Stack)(({ theme }) => ({
    width: "100%",
    marginRight: theme.spacing(1.7),
    borderBottom: "1px solid",
    borderBottomColor: getBorderColor(theme),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
}));

interface TabbedBoxProps<T = string> {
    disabled?: boolean; // prevent from selecting a tab
    tabs: { label: string; value: T }[];
    selected: string;
    endNode?: React.ReactNode;
    children: React.ReactNode;
    onSelect: (s: T) => void;
}

const TabbedBox = <T extends unknown>({
    disabled,
    tabs,
    selected,
    endNode,
    children,
    onSelect,
}: TabbedBoxProps<T>) => {
    const TABS = useMemo(
        () =>
            tabs.map(({ label, value }, i) => (
                <StyledTab
                    key={i}
                    selected={selected === value} // is current tab selected?
                    label={label}
                    value={value}
                    onClick={() => !disabled && onSelect(value)}
                />
            )),
        [selected, disabled]
    );

    return (
        <Box>
            <Stack
                direction="row"
                sx={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    backgroundColor: "background.paper",
                }}
            >
                {LeftSpace}
                {TABS}
                <RightSpace>{endNode}</RightSpace>
            </Stack>
            <Content
                sx={{
                    p: 1.5,
                }}
            >
                {children}
            </Content>
        </Box>
    );
};

export default TabbedBox;
