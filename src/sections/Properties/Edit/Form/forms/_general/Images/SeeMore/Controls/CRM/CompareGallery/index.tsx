import { DialogContent, Button, DialogContentProps } from "@mui/material";
import { FC, useState } from "react";
import { StyledActions } from "./styled";
import { useTranslation } from "react-i18next";
import Dialog, { DialogProps } from "@/components/Dialog";
import MakeMainButton from "./MakeMainButton";
import Content from "./Content";

const StyledDialogContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent sx={{ p: 0, ...sx }} {...props} />
);

interface ICompareGallery extends DialogProps {
    image1: string;
    image2: string;
}

const CompareGallery: React.FC<ICompareGallery> = ({
    image1: image1Key,
    image2: image2Key,
    ...props
}) => {
    const { t } = useTranslation();

    const [selectedKey, setSelectedKey] = useState("");

    return (
        <Dialog
            title={t("Compare")}
            maxWidth="xl"
            closeAfterTransition={true}
            DialogContentComponent={StyledDialogContent}
            DialogActionsComponent={StyledActions}
            // ...
            content={
                <Content
                    selectedKey={selectedKey}
                    setSelectedKey={setSelectedKey}
                    image1Key={image1Key}
                    image2Key={image2Key}
                />
            }
            actions={
                <>
                    {selectedKey ? (
                        <MakeMainButton
                            selectedKey={selectedKey}
                            onClose={props.onClose}
                        />
                    ) : null}

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={props.onClose}
                    >
                        {t("Close")}
                    </Button>
                </>
            }
            {...props}
        />
    );
};

export default CompareGallery;
