import { useGetCardLabelsQuery } from "@/services/tasks";
import { Box, Stack, Typography, Tooltip, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

// Style Constants
const containerSx: SxProps<Theme> = {
    backgroundColor: "neutral.200",
    borderRadius: 4,
    px: 1.5,
    width: "min-content",
};

const labelDotSx = (color: string): SxProps<Theme> => ({
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: color,
    flexShrink: 0,
});

const tooltipContentItemSx: SxProps<Theme> = {
    mb: 0.5,
    backgroundColor: "neutral.200",
};

const tooltipWrapperSx: SxProps<Theme> = {
    "& .MuiTooltip-tooltip": {
        backgroundColor: "neutral.200",
        color: "black",
        border: "1px solid #ddd",
        padding: "8px",
        maxWidth: 220,
    },
};

interface TaskLabelProps {
    taskId: number;
}

const TaskLabel: FC<TaskLabelProps> = ({ taskId }) => {
    const { t } = useTranslation();

    const { data: labels } = useGetCardLabelsQuery(taskId);

    const visibleLabel = labels?.[0];
    const remainingLabels = labels?.slice(1) ?? [];

    if (!visibleLabel) return null;

    return (
        <Box>
            {remainingLabels.length > 0 ? (
                <Tooltip
                    title={
                        <Stack>
                            {labels.map((label) => (
                                <Stack
                                    key={label.id}
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    sx={tooltipContentItemSx}
                                >
                                    <Box sx={labelDotSx(label.color)} />
                                    <Typography variant="body2">
                                        {label.name}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>
                    }
                    placement="top"
                    PopperProps={{
                        sx: tooltipWrapperSx,
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={containerSx}
                    >
                        <Box sx={labelDotSx(visibleLabel.color)} />
                        <Typography
                            variant="body2"
                            noWrap
                            sx={{
                                fontWeight: 500,
                                width: "min-content",
                            }}
                        >
                            {visibleLabel.name} + {remainingLabels.length}{" "}
                            {t("more")}
                        </Typography>
                    </Stack>
                </Tooltip>
            ) : (
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={containerSx}
                >
                    <Box sx={labelDotSx(visibleLabel.color)} />
                    <Typography
                        variant="body2"
                        noWrap
                        sx={{
                            fontWeight: 500,
                            width: "min-content",
                        }}
                    >
                        {visibleLabel.name}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
};

export default TaskLabel;
