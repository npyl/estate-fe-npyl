import { useTranslation } from "react-i18next";
import { ILabel, LabelResourceType } from "src/types/label";
import Dialog from "@/components/Dialog";
import Content from "./Content";

interface AddLabelDialog {
    resourceId?: number;
    variant: LabelResourceType;

    onLabelClick: (l: ILabel) => void;
    onCreate?: (id: number) => void;
    onClose: () => void;
}

const AddLabelDialog = ({
    resourceId,
    variant,

    onLabelClick,
    onCreate,
    onClose,
}: AddLabelDialog) => {
    const { t } = useTranslation();

    return (
        <Dialog
            maxWidth="xs"
            onClose={onClose}
            // ...
            submit
            // ...
            title={t("Add an existing label")}
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
