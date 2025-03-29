import { useBulkDeletePropertiesMutation } from "@/services/properties";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ArchiveIcon from "@mui/icons-material/Archive";
import { LoadingButton } from "@mui/lab";

// ------------------------------------------------------------------------------

const getTabPathsForId = (id: number) => [
    `/property/${id}`,
    `/property/edit/${id}`,
];

const getTabPaths = (ids: number[]) => ids.map(getTabPathsForId).flat();

// ------------------------------------------------------------------------------

interface BulkArchiveButtonProps {
    selectedRows: number[];
}

const BulkArchiveButton: FC<BulkArchiveButtonProps> = ({ selectedRows }) => {
    const { t } = useTranslation();

    const [bulkArchive, { isLoading }] = useBulkDeletePropertiesMutation();

    const handleClick = useCallback(
        () =>
            bulkArchive({
                props: selectedRows,
                tabPaths: getTabPaths(selectedRows),
            }),
        [selectedRows]
    );

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            variant="contained"
            color="error"
            startIcon={<ArchiveIcon />}
            onClick={handleClick}
        >
            {t("Archive")}
        </LoadingButton>
    );
};

export default BulkArchiveButton;
