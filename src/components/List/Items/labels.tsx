import { Box, Stack, Tooltip, Typography, useMediaQuery } from "@mui/material";
import type { FC } from "react";
import Label from "@/components/Label/Label";
import { ILabel } from "src/types/label";
import ListItem from "../item";
import ListItemProps from "../types";

const LABEL_SX = (isLargeScreen: boolean) => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: isLargeScreen ? 195 : 130,
});
interface ListLabelsItemProps extends ListItemProps {
    labels: ILabel[];
}

const ListLabelsItem: FC<ListLabelsItemProps> = ({ labels, ...other }) => {
    // Show only the first label
    const visibleLabel = labels[0];
    const remainingLabels = labels.slice(1);
    const isLargeScreen = useMediaQuery("(min-width:1900px)");

    // NOTE: show this list item *only* if we have 1+ labels
    if (labels.length === 0) return null;

    return (
        <ListItem {...other}>
            <Stack spacing={1} ml={0.5} alignItems="center">
                {remainingLabels.length > 0 ? (
                    <Tooltip
                        title={remainingLabels.map(({ id, color, name }, i) => (
                            <Label
                                key={id}
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
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            maxWidth: isLargeScreen ? 250 : 140,
                        }}
                    >
                        <Label
                            color={visibleLabel?.color}
                            name={visibleLabel?.name}
                            sx={LABEL_SX(isLargeScreen)}
                        />
                    </Box>
                )}
            </Stack>
        </ListItem>
    );
};

export default ListLabelsItem;
