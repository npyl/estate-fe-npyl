import { Box, Paper, Tab } from "@mui/material";
import { useMemo } from "react";

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
                <Tab
                    sx={{
                        ...(value === selected
                            ? {
                                  border: "1px solid #aaa",
                                  borderBottom: 0,
                                  backgroundColor: "background.paper",
                              }
                            : {
                                  borderBottom: "1px solid #aaa",
                                  "&:hover": {
                                      backgroundColor: "#eee",
                                  },
                              }),
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                        px: 2,
                        py: 0,
                    }}
                    key={i}
                    label={label}
                    value={value}
                    onClick={() => !disabled && onSelect(value)}
                />
            )),
        [selected, disabled]
    );

    return (
        <Box>
            <Box
                display={"flex"}
                flexDirection={"row"}
                sx={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    backgroundColor: "background.paper",
                }}
            >
                <Box
                    sx={{
                        ml: 1.7,
                    }}
                />
                {TABS}
                <Box
                    sx={{
                        width: "100%",
                        mr: 1.7,
                        borderBottom: "1px solid #ccc",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    {endNode}
                </Box>
            </Box>
            <Box
                sx={{
                    backgroundColor: "background.paper",
                }}
            >
                <Box
                    component={Paper}
                    p={1.5}
                    sx={{
                        borderRadius: "15px",
                        borderLeft: "1px solid #ccc",
                        borderRight: "1px solid #ccc",
                        borderBottom: "1px solid #ccc",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default TabbedBox;
