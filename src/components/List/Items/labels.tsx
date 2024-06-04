import { Box, Stack, Tooltip, Typography } from "@mui/material";
import type { FC } from "react";
import Label from "@/components/Label/Label";
import { ILabel } from "src/types/label";
import ListItem from "../item";
import { useTranslation } from "react-i18next";
import ListItemProps from "../types";
import MoreChip from "@/components/Label/MoreChip";

interface ListLabelsItemProps extends ListItemProps {
    labels: ILabel[];
}

const ListLabelsItem: FC<ListLabelsItemProps> = ({ labels, ...other }) => {
    const { t } = useTranslation();

    const visibleLabels = labels.slice(0, 2);
    // remainingLabels are used for the tooltip
    const remainingLabels = labels.slice(2);
    const remainingLabelCount = labels.length - 2;

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
            <Stack spacing={1} mt={1} ml={0.5}>
                {visibleLabels.map(({ color, name }, i) => (
                    <Label
                        key={i}
                        color={color}
                        width="min-content"
                        maxWidth="100%"
                        name={name}
                    />
                ))}
                {remainingLabelCount > 0 && (
                    <MoreChip
                        labels={remainingLabels}
                        label={`+${remainingLabelCount} more`}
                    />
                )}
            </Stack>
        </ListItem>
    );
};

export default ListLabelsItem;
