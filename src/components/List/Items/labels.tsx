import { Stack, Tooltip, Typography } from "@mui/material";
import type { FC } from "react";
import Label from "@/components/Label/Label";
import { ILabel } from "src/types/label";
import ListItem from "../item";
import ListItemProps from "../types";

interface ListLabelsItemProps extends ListItemProps {
    labels: ILabel[];
}

const ListLabelsItem: FC<ListLabelsItemProps> = ({ labels, ...other }) => {
    // NOTE: show this list item *only* if we have 1+ labels
    if (labels.length === 0) return null;

    // Show only the first label
    const visibleLabel = labels[0];
    const remainingLabels = labels.slice(1);

    return (
        <ListItem {...other}>
            <Stack spacing={1} ml={0.5} alignItems="center">
                {remainingLabels.length > 0 ? (
                    <Tooltip
                        title={remainingLabels.map(({ color, name }, i) => (
                            <Label
                                key={i}
                                color={color}
                                width="min-content"
                                maxWidth="100%"
                                name={name}
                                sx={{ mb: 0.7, mt: 0.7, ml: 0.8, mr: 0.8 }}
                            />
                        ))}
                        placement="top"
                        PopperProps={{
                            sx: {
                                "& .MuiTooltip-tooltip": {
                                    backgroundColor: "white",
                                    color: "black",
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                },
                            },
                        }}
                    >
                        <Stack
                            display="flex"
                            direction="row"
                            alignItems="center"
                        >
                            <Label
                                color={visibleLabel?.color}
                                width="min-content"
                                maxWidth="100%"
                                name={visibleLabel?.name}
                            />
                            {remainingLabels.length > 0 && (
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="span"
                                    sx={{ ml: 1 }}
                                >
                                    +{remainingLabels.length} more
                                </Typography>
                            )}
                        </Stack>
                    </Tooltip>
                ) : (
                    <Label
                        color={visibleLabel?.color}
                        width="min-content"
                        maxWidth="100%"
                        name={visibleLabel?.name}
                    />
                )}
            </Stack>
        </ListItem>
    );
};

export default ListLabelsItem;
