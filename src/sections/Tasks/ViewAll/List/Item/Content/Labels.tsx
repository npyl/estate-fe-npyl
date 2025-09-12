import { IKanbanCardLabels } from "@/types/tasks";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import PriorityLabel from "@/sections/Tasks/card/PriorityLabel";
import LabelTooltip from "./LabelTooltip";

const chipStyles: SxProps<Theme> = {
    backgroundColor: "rgba(0, 0, 0, 0.05) !important",
    color: "black",
    fontWeight: 400,
    fontSize: "14px",
    height: "26px",
    borderRadius: "16px",
};

interface LabelsProps extends StackProps {
    priority: number;
    labels: IKanbanCardLabels[];
}

const Labels: FC<LabelsProps> = ({ priority, labels = [], ...props }) => (
    <Stack direction="row" gap={1} alignItems="center" {...props}>
        <PriorityLabel priority={priority} />

        {labels.length > 0 ? (
            <LabelTooltip labels={labels} chipStyles={chipStyles} />
        ) : null}
    </Stack>
);

export default Labels;
