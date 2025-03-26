import { FilterButton } from "@/components/Filters";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import useDialog from "@/hooks/useDialog";

const PreparationDialog = dynamic(
    () => import("@/sections/agreements/Dialogs/Preparation")
);

const CreateButton = () => {
    const { t } = useTranslation();
    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <FilterButton endIcon={<AddIcon />} onClick={openDialog}>
                {t("New")}
            </FilterButton>

            {isOpen ? <PreparationDialog onClose={closeDialog} /> : null}
        </>
    );
};

export default CreateButton;
