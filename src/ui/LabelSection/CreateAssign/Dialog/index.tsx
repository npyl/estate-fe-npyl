import { useTranslation } from "react-i18next";
import { ILabel, LabelResourceType } from "@/types/label";
import Dialog from "@/components/Dialog";
import Content from "./Content";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface AddLabelDialog {
    resourceId?: number;
    variant: LabelResourceType;

    onLabelClick: (l: ILabel) => void;
    onCreate?: (id: number) => void;
    onClose: () => void;
}

const AddLabelDialog: FC<AddLabelDialog> = ({
    resourceId,
    variant,

    onLabelClick,
    onCreate,
    onClose,
}) => {
    const { t } = useTranslation();

    return (
        <Dialog
            onClose={onClose}
            // ...
            submit
            // ...
            title={
                <Typography variant="h5" textAlign="left" width={1}>
                    {t("Add an existing label")}
                </Typography>
            }
            content={
                <Content
                    resourceId={resourceId}
                    resource={variant}
                    onCreate={onCreate}
                    // ...
                    onLabelClick={onLabelClick}
                    onClose={onClose}
                />
            }
        />
    );
};

export default AddLabelDialog;
