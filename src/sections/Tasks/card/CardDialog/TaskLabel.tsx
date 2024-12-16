import Stack, { StackProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useTranslation } from "react-i18next";
import { Theme } from "@mui/material/styles";
import { TranslationType } from "@/types/translation";
import useResponsive from "@/hooks/useResponsive";

// -------------------------------------------------------------------------

const getLabel = (t: TranslationType, belowSm: boolean, taskCode?: string) => {
    let label = belowSm ? "" : `${t("Task")} - `;

    try {
        const part = taskCode?.split(" - ")?.[1];
        label += part ? part : "";
    } catch (ex) {}

    return label;
};

interface Props {
    taskCode?: string;
}

const ResponsiveTaskCode: FC<Props> = ({ taskCode }) => {
    const { t } = useTranslation();

    const belowSm = useResponsive("down", "sm");

    const label = getLabel(t, belowSm, taskCode);

    return (
        <Typography variant="body2" pr={0.5}>
            {label || t("New Task")}
        </Typography>
    );
};

// -------------------------------------------------------------------------

const getBgColor = ({ palette: { mode, neutral } }: Theme) =>
    mode === "light" ? neutral?.[200] : neutral?.[600];

interface TaskLabelProps extends StackProps {
    taskCode?: string;
}

const TaskLabel: FC<TaskLabelProps> = ({ taskCode, ...props }) => (
    <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        bgcolor={getBgColor}
        borderRadius="16px"
        px={1}
        py={0.5}
        width="fit-content"
        {...props}
    >
        <BookmarkBorderIcon color="action" />
        <ResponsiveTaskCode taskCode={taskCode} />
    </Stack>
);

export default TaskLabel;
