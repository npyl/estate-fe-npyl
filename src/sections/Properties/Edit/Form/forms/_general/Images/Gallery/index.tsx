import { Button } from "@mui/material";
import { FC, useState } from "react";
import { DialogProps } from "@/components/Dialog";
import { useTranslation } from "react-i18next";
import Dialog from "./Dialog";
import Content from "./Content";
import DeleteButton from "./DeleteButton";

interface GalleryProps extends Omit<DialogProps, "onChange" | "onClose"> {
    openImageKey: string;
    onClose: VoidFunction;
}

const Gallery: FC<GalleryProps> = ({ openImageKey, onClose, ...props }) => {
    const { t } = useTranslation();

    // NOTE: Gallery is supposed to be used with the Wrapper => no effect needed here
    const [currentImageKey, setCurrentImageKey] = useState(openImageKey);

    return (
        <Dialog
            hideTitle
            maxWidth="xl"
            closeAfterTransition={true}
            currentImageKey={currentImageKey}
            // ...
            content={
                <Content
                    currentImageKey={currentImageKey}
                    setCurrentImageKey={setCurrentImageKey}
                />
            }
            actions={
                <>
                    <DeleteButton
                        currentImageKey={currentImageKey}
                        setCurrentImageKey={setCurrentImageKey}
                    />

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onClose}
                    >
                        {t("Close")}
                    </Button>
                </>
            }
            {...props}
        />
    );
};

export default Gallery;
