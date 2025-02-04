import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import AssignmentIcon from "@mui/icons-material/Assignment";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { HideText } from "@/components/styled";
import useGetNotification from "@/sections/Notification/useGetNotification";
const TaskDialogForNotification = dynamic(() => import("./TaskDialog"));

const CreateTaskButton = () => {
    const { t } = useTranslation();

    const { notification } = useGetNotification();
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

            {isOpen && notification ? (
                <TaskDialogForNotification
                    data={notification}
                    onClose={closeTask}
                />
            ) : null}
        </>
    );
};

export default CreateTaskButton;
