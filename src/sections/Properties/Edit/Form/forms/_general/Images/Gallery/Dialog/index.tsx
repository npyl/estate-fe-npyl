import { DialogProps as PPDialogProps } from "@/components/Dialog";
import { FC, useMemo } from "react";
import { StyledActions, StyledContent, StyledDialog } from "./styled";
import usePropertyImages from "../../hook";
import { FormProvider, useForm } from "react-hook-form";
import { FormValues } from "../types";

interface DialogProps extends Omit<PPDialogProps, "submit"> {
    currentImageKey: string;
}

const Dialog: FC<DialogProps> = ({ currentImageKey, ...props }) => {
    const { images } = usePropertyImages();

    const currentImage = useMemo(
        () => images.find(({ key }) => key === currentImageKey),
        [images, currentImageKey]
    );

    const methods = useForm<FormValues>({
        values: {
            title: currentImage?.title || "",
            description: currentImage?.description || "",
            hidden: !!currentImage?.hidden,
            language: "el",
        },
    });

    return (
        <FormProvider {...methods}>
            <StyledDialog
                submit
                // ...
                DialogContentComponent={StyledContent}
                DialogActionsComponent={StyledActions}
                {...props}
            />
        </FormProvider>
    );
};

export default Dialog;
