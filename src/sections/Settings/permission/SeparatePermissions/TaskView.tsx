import { useSetTaskViewMutation } from "@/services/user";
import { TTaskVisibility } from "@/types/roles";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface IOption {
    key: TTaskVisibility;
    label: string;
}

const BUTTONS: IOption[] = [
    { key: "NONE", label: "None" },
    { key: "OWN", label: "Own" },
    { key: "ALL", label: "All" },
];

interface TaskViewProps {
    userId: number;
}

const TaskView: FC<TaskViewProps> = ({ userId }) => {
    const { t } = useTranslation();

    const [setView, { isLoading }] = useSetTaskViewMutation();
    const handleChange = useCallback(
        (_: any, visibility: TTaskVisibility) =>
            setView({ userId, visibility }),
        [userId]
    );

    return (
        <ToggleButtonGroup disabled={isLoading} onChange={handleChange}>
            {BUTTONS.map(({ key, label }) => (
                <ToggleButton key={key} value={key}>
                    {t(label)}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

export default TaskView;
