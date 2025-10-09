import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import { HideText } from "@/components/styled";
import { TASK } from "@/constants/tests";
import { useTranslation } from "react-i18next";
import AddColumnIcon from "@/assets/icons/column-add";
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
                endIcon={<AddColumnIcon />}
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
