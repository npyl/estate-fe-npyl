import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import { HideText } from "@/components/styled";
import { TASK } from "@/constants/tests";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
const AddColumnDialog = dynamic(
    () => import("@/sections/Tasks/column/AddDialog")
);

const CreateColumnButton = () => {
    const { t } = useTranslation();
    const [isOpen, open, close] = useDialog();

    return (
        <>
            <Button
                data-testid={TASK.CREATE_ID}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={open}
                sx={{
                    textWrap: "nowrap",
                    ...HideText,
                }}
            >
                {t("Column")}
            </Button>

            {isOpen ? <AddColumnDialog onClose={close} /> : null}
        </>
    );
};

export default CreateColumnButton;
