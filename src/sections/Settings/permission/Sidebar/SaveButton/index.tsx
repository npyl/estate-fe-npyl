import useDialog from "@/hooks/useDialog";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { useSecurityContext } from "../../Context";
const SavePresetDialog = dynamic(() => import("./PresetModal"));

const SaveButton = () => {
    const { t } = useTranslation();

    const { isDirty } = useSecurityContext();

    const [isModalOpen, openModal, closeModal] = useDialog();

    return (
        <>
            <Button
                variant="contained"
                fullWidth
                disabled={!isDirty}
                onClick={openModal}
            >
                {t("Save")}
            </Button>

            {isModalOpen ? <SavePresetDialog onClose={closeModal} /> : null}
        </>
    );
};

export default SaveButton;
