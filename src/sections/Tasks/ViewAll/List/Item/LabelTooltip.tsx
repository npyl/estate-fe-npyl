// LabelTooltip.tsx
import { Box, Chip, SxProps, Theme, Tooltip, Typography } from "@mui/material";
import { FC } from "react";

const colorCircleStyles: SxProps<Theme> = {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
};

interface Label {
    id: number;
    name: string;
    color: string;
}

interface LabelTooltipProps {
    labels: Label[];
    chipStyles?: SxProps<Theme>;
}

const LabelTooltip: FC<LabelTooltipProps> = ({ labels, chipStyles }) => {
    if (labels.length === 0) return null;

    const firstLabel = labels[0];
    const additionalCount = labels.length - 1;

    const chip = (
        <Chip
            label={
                <Box display="flex" alignItems="center" gap={1}>
                    <Box
                        sx={{
                            ...colorCircleStyles,
                            backgroundColor: firstLabel.color,
                        }}
                    />
                    <Typography variant="body2" fontWeight={500}>
                        {firstLabel.name}
                        {additionalCount > 0 && ` +${additionalCount} more`}
                    </Typography>
                </Box>
            }
            sx={chipStyles}
        />
    );

    if (labels.length === 1) {
        // Only one label? return chip without the Tooltip
        return chip;
    }

    return (
        <Tooltip
            title={
                <Box
                    display="flex"
                    flexDirection="column"
                    p={0.5}
                    px={2}
                    sx={{ backgroundColor: "neutral.200" }}
                >
                    {labels.map((label) => (
                        <Box
                            key={label.id}
                            display="flex"
                            alignItems="center"
                            gap={1}
                        >
                            <Box
                                sx={{
                                    ...colorCircleStyles,
                                    backgroundColor: label.color,
                                    flexShrink: 0,
                                }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ fontSize: "13px", fontWeight: 500 }}
                            >
                                {label.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            }
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: "neutral.200",
                        color: "black",
                    },
                },
            }}
        >
            {chip}
        </Tooltip>
    );
};

export default LabelTooltip;
