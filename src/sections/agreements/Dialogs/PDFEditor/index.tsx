import { FC } from "react";
import Dialog, { DialogProps } from "@/components/Dialog";
import {
    Box,
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
    DialogTitle,
    DialogTitleProps,
    Fab,
    SxProps,
    Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveFab from "./SaveFab";
import ErrorTooltips from "./ErrorTooltips";
import useValidatePDF from "./useValidatePDF";
import dynamic from "next/dynamic";
const PDFEditor = dynamic(() => import("./Editor"), { ssr: false });
const SuggestProperties = dynamic(() => import("./SuggestProperties"));

const StyledDialogTitle: FC<DialogTitleProps> = ({ sx, ...props }) => (
    <DialogTitle sx={{ display: "none", ...sx }} {...props} />
);

const StyledDialogContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent sx={{ p: 0, ...sx }} {...props} />
);

const StyledDialogActions: FC<DialogActionsProps> = ({ sx, ...props }) => (
    <DialogActions sx={{ display: "none", ...sx }} {...props} />
);

// --------------------------------------------------------------------------------------------

const getZIndex = ({ zIndex }: Theme) => zIndex.modal;

// --------------------------------------------------------------------------------------------

const CloseFabSx: SxProps<Theme> = {
    position: "fixed",
    top: 30,
    right: 30,
    zIndex: getZIndex,
};

interface CloseFabProps {
    onClick: VoidFunction;
}

const CloseFab: FC<CloseFabProps> = ({ onClick }) => (
    <Fab sx={CloseFabSx} onClick={onClick}>
        <CloseIcon />
    </Fab>
);

// --------------------------------------------------------------------------------------------

interface Props
    extends Omit<DialogProps, "fullScreen" | "maxWidth" | "onClose"> {
    suggestProperties: boolean;
    onClose: VoidFunction;
}

const PDFEditorDialog: FC<Props> = ({ suggestProperties, ...props }) => {
    const { validate } = useValidatePDF();

    const handleSave = async () => {
        const res = await validate();

        if (!res) return;

        // we are ok; close the dialog
        props.onClose();
    };

    return (
        <Dialog
            fullScreen
            DialogContentComponent={StyledDialogContent}
            DialogTitleComponent={StyledDialogTitle}
            DialogActionsComponent={StyledDialogActions}
            // ...
            content={
                <Box position="relative">
                    <PDFEditor>
                        {suggestProperties ? <SuggestProperties /> : null}
                    </PDFEditor>

                    <ErrorTooltips />

                    {/* Close */}
                    <CloseFab onClick={props.onClose} />

                    {/* Save */}
                    <SaveFab
                        position="fixed"
                        bottom={30}
                        right={30}
                        zIndex={getZIndex}
                        onClick={handleSave}
                    />
                </Box>
            }
            {...props}
        />
    );
};

export default PDFEditorDialog;
