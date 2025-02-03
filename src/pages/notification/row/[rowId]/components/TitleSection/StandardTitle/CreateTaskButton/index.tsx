import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import AssignmentIcon from "@mui/icons-material/Assignment";
import useDialog from "@/hooks/useDialog";
import { FC } from "react";
import { ContactNotificationExtended } from "@/types/notification";
import dynamic from "next/dynamic";
import { HideText } from "@/components/styled";
const TaskDialogForNotification = dynamic(() => import("./TaskDialog"));

interface CreateTaskButtonProps {
    data: ContactNotificationExtended;
}

const CreateTaskButton: FC<CreateTaskButtonProps> = ({ data }) => {
    const { t } = useTranslation();

    const [isOpen, openTask, closeTask] = useDialog();

    return (
        <>
            <Button
                onClick={openTask}
                variant="contained"
                startIcon={<AssignmentIcon />}
                sx={{
                    width: "max-content",
                    textWrap: "nowrap",
                    ...HideText,
                }}
            >
                {t("New Task")}
            </Button>

            {isOpen ? (
                <TaskDialogForNotification data={data} onClose={closeTask} />
            ) : null}
        </>
    );
};

export default CreateTaskButton;
