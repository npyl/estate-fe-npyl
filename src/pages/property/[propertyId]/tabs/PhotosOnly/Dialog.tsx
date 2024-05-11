// @mui
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/CloseOutlined";
import { useTranslation } from "react-i18next";

import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

// ----------------------------------------------------------------

const StyledDialogTitle = styled(DialogTitle)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
});

// ----------------------------------------------------------------

interface DownloadDialogProps extends Omit<DialogProps, "onClose"> {
    loading: boolean;
    onExportAll: VoidFunction;
    onExportPublic: VoidFunction;
    onClose: VoidFunction;
}

const DownloadDialog = ({
    loading,
    onExportAll,
    onExportPublic,
    ...props
}: DownloadDialogProps) => {
    const { t } = useTranslation();

    const [clicked, setClicked] = useState<"all" | "public" | "">("");

    const handleExportAll = () => {
        setClicked("all");
        onExportAll();
    };
    const handleExportPublic = () => {
        setClicked("public");
        onExportPublic();
    };

    return (
        <Dialog keepMounted {...props}>
            <StyledDialogTitle>
                {t("Download Photos")}
                <IconButton onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            </StyledDialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t("Please select between All or only Public photos")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    loading={clicked === "all" && loading}
                    color="primary"
                    loadingPosition="end"
                    disabled={loading}
                    onClick={handleExportAll}
                >
                    <Typography mr={clicked === "all" && loading ? 2 : 0}>
                        {t("All Photos")}
                    </Typography>
                </LoadingButton>
                <LoadingButton
                    loading={clicked === "public" && loading}
                    color="primary"
                    loadingPosition="end"
                    disabled={loading}
                    onClick={handleExportPublic}
                >
                    <Typography mr={clicked === "public" && loading ? 2 : 0}>
                        {t("Public Photos")}
                    </Typography>
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default DownloadDialog;
