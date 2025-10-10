import SoftButton from "@/components/SoftButton";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import { useRouter } from "next/router";
import { useRestorePropertyMutation } from "@/services/properties";

const RestoreButton = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { propertyId } = router.query;

    const [restore] = useRestorePropertyMutation();

    const handleRestore = useCallback(async () => {
        const res = await restore(+propertyId!);
        if ("error" in res) return;
        router.replace("/property");
    }, [propertyId]);

    return (
        <SoftButton
            fullWidth
            color="warning"
            startIcon={<UndoIcon />}
            onClick={handleRestore}
        >
            {t("Restore")}
        </SoftButton>
    );
};

export default RestoreButton;
