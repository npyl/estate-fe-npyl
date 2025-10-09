import { DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { FC, useState } from "react";
import Dialog, { DialogProps } from "@/components/Dialog";

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

const DownloadDialog: FC<DownloadDialogProps> = ({
    loading,
    onExportAll,
    onExportPublic,
    ...props
}) => {
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
        <Dialog
            DialogTitleComponent={StyledDialogTitle}
            // ...
            title={
                <>
                    {t("Download Photos")}
                    <IconButton
                        sx={{ position: "absolute", right: 2, top: 15 }}
                        onClick={props.onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            }
            content={t("Please select between All or only Public photos")}
            actions={
                <>
                    <LoadingButton
                        loading={clicked === "all" && loading}
                        color="primary"
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
                        disabled={loading}
                        onClick={handleExportPublic}
                    >
                        <Typography
                            mr={clicked === "public" && loading ? 2 : 0}
                        >
                            {t("Public Photos")}
                        </Typography>
                    </LoadingButton>
                </>
            }
            {...props}
        />
    );
};

export default DownloadDialog;
