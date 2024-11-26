import { useBulkRestorePropertiesMutation } from "@/services/properties";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import UndoIcon from "@mui/icons-material/Undo";
import { LoadingButton } from "@mui/lab";

interface BulkRestoreProps {
    selectedRows: number[];
}

const BulkRestoreButton: FC<BulkRestoreProps> = ({ selectedRows }) => {
    const { t } = useTranslation();

    const [bulkRestoreProperties, { isLoading }] =
        useBulkRestorePropertiesMutation();

    const handleClick = useCallback(
        () => bulkRestoreProperties(selectedRows),
        [selectedRows]
    );

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            variant="contained"
            color="warning"
            startIcon={<UndoIcon />}
            onClick={handleClick}
        >
            {t("Restore")}
        </LoadingButton>
    );
};

export default BulkRestoreButton;
