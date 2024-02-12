import { Box, Tab } from "@mui/material";
import { useMemo } from "react";

interface TabbedBoxProps<T = string> {
    tabs: { label: string; value: T }[];
    selected: string;
    endNode?: React.ReactNode;
    children: React.ReactNode;
    onSelect: (s: T) => void;
}

const TabbedBox = <T extends unknown>({
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
                                  border: "1px solid #ccc",
                                  borderTopLeftRadius: "15px",
                                  borderTopRightRadius: "15px",
                                  borderBottom: 0,
                              }
                            : {
                                  borderBottom: "1px solid #ccc",
                              }),
                        px: 2,
                        py: 0,
                    }}
                    key={i}
                    label={label}
                    value={value}
                    onClick={() => onSelect(value)}
                />
            )),
        [selected]
    );

    return (
        <>
            <Box display={"flex"} flexDirection={"row"}>
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
                        justifyContent: "flex-end",
                    }}
                >
                    {endNode}
                </Box>
            </Box>
            <Box
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
        </>
    );
};

export default TabbedBox;
