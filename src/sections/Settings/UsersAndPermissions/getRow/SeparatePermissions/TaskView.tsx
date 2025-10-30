import { useSetTaskViewMutation } from "@/services/user";
import { TTaskVisibility } from "@/types/roles";
import {
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface IOption {
    key: TTaskVisibility;
    label: string;
}

const BUTTONS: IOption[] = [
    { key: "NONE", label: "Tasks_NotAtAll" },
    { key: "OWN", label: "Tasks_Own" },
    { key: "ALL", label: "Tasks_All" },
];

interface TaskViewProps {
    userId: number;
    value: TTaskVisibility;
}

const TaskView: FC<TaskViewProps> = ({ userId, value }) => {
    const { t } = useTranslation();

    const [setView, { isLoading }] = useSetTaskViewMutation();
    const handleChange = useCallback(
        (_: any, visibility: TTaskVisibility) =>
            setView({ userId, visibility }),
        [userId]
    );

    return (
        <Stack direction="row" alignItems="center" gap={1} ml={-1.5}>
            <Typography>{t("Tasks")}</Typography>

            <ToggleButtonGroup
                exclusive
                disabled={isLoading}
                value={value}
                onChange={handleChange}
            >
                {BUTTONS.map(({ key, label }) => (
                    <ToggleButton key={key} value={key}>
                        {t(label)}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Stack>
    );
};

export default TaskView;
