import { Box, Stack } from "@mui/material";
import type { FC } from "react";
import Label from "@/components/Label/Label";
import { ILabel } from "src/types/label";
import ListItem from "../item";
import { useTranslation } from "react-i18next";
import ListItemProps from "../types";

interface ListLabelsItemProps extends ListItemProps {
    labels: ILabel[];
}
// TODO: FIX THIS LOGIC
const calculateMarginTop = (labelCount: number) => {
    if (labelCount > 7) return 25;
    if (labelCount > 6) return 20;
    if (labelCount > 5) return 15;
    if (labelCount > 4) return 11;
    return 2;
};

const ListLabelsItem: FC<ListLabelsItemProps> = ({ labels, ...other }) => {
    const { t } = useTranslation();

    return (
        <ListItem
            {...other}
            sx={{
                height: labels.length === 0 ? "2.9rem" : "5.75rem",
                maxHeight: labels.length === 0 ? "2.9rem" : "5.75rem",
                overflow: labels.length <= 2 ? "hidden" : "auto",

                "&::-webkit-scrollbar": {
                    width: "8px",
                    backgroundColor: "#111827",
                },
                "&::-webkit-scrollbar-track": {
                    background: "#1F2937",
                },

                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "10px",
                    border: "2px solid #111827",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#555",
                },
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    maxHeight: "100%",
                    overflowY: labels.length > 2 ? "auto" : "hidden",
                    mt: calculateMarginTop(labels.length),
                    "&::-webkit-scrollbar": {
                        width: "8px",
                        backgroundColor: "#111827",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#1F2937",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888",
                        borderRadius: "10px",
                        border: "2px solid #111827",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#555",
                    },
                }}
            >
                <Stack spacing={1}>
                    {labels.map(({ color, name }, i) => (
                        <Label
                            key={i}
                            color={color}
                            width="min-content"
                            maxWidth="100%"
                            name={name}
                        />
                    ))}
                </Stack>
            </Box>
        </ListItem>
    );
};

export default ListLabelsItem;
