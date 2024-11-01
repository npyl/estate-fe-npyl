import useDialog from "@/hooks/useDialog";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { FC } from "react";
const AddField = dynamic(() => import("./AddField"));

interface Props {
    columnId: number;
}

const AddTaskButton: FC<Props> = ({ columnId }) => {
    const { t } = useTranslation();

    const [isAddOpen, openAdd, closeAdd] = useDialog();

    return (
        <>
            {/* Add Task button */}
            {isAddOpen ? (
                <AddField columnId={columnId} onClose={closeAdd} />
            ) : null}

            {!isAddOpen ? (
                <Button
                    fullWidth
                    size="large"
                    color="inherit"
                    startIcon={<AddIcon />}
                    onClick={openAdd}
                >
                    {t("Add Task")}
                </Button>
            ) : null}
        </>
    );
};

export default AddTaskButton;
