import React, { useMemo } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Box, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveFab from "./SaveFab";
import PDFEditor from "./Editor";
import { useFormContext } from "react-hook-form";
import ErrorTooltip from "./ErrorTooltip";

const TRIGGER_OPTIONS = ["owner", "property", "commissionAndDuration", "gdpr"];

const ErrorTooltips = () => {
    const { formState } = useFormContext();

    const TOOLTIPS = useMemo(
        () => {
            const { errors } = formState;

            const inputs = document.querySelectorAll(".selectable");

            const res = Array.from(inputs).map((el) => {
                const [parent, child] = el
                    .getAttribute("title") // format: ${parent}.${child}
                    ?.split(".") || ["", ""];

                const rect = el.getBoundingClientRect();

                // @ts-ignore
                const error = errors?.[parent]?.[child]?.message || "";

                if (child in (errors?.[parent] || {}))
                    return (
                        <ErrorTooltip
                            key={`${parent}.${child}`}
                            sx={{
                                position: "fixed",
                                left: `${rect.left + rect.width - 25}px`,
                                top: `${rect.top + 10}px`,
                                zIndex: 1500,
                            }}
                            error={error || ""}
                        />
                    );

                return null;
            });

            return res;
        },
        // INFO: use formState (instead of formState.errors) as dependency as recommended in rhf docs (https://react-hook-form.com/docs/useform/formstate)
        [formState]
    );

    return <>{TOOLTIPS}</>;
};

interface Props extends Omit<DialogProps, "onClose"> {
    onClose: VoidFunction;
}

const PDFEditorDialog: React.FC<Props> = (props) => {
    const { trigger } = useFormContext();

    const handleSave = async () => {
        const res = await trigger(TRIGGER_OPTIONS);

        if (res) {
            // we are ok; close the dialog
            props.onClose();
        }
    };

    return (
        <Box position="relative">
            <Dialog {...props} fullScreen>
                <PDFEditor />
            </Dialog>

            <ErrorTooltips />

            {/* Close */}
            <Fab
                sx={{
                    position: "fixed",
                    top: 30,
                    right: 30,
                    zIndex: 1500,
                }}
                onClick={props.onClose}
            >
                <CloseIcon />
            </Fab>

            {/* Save */}
            <SaveFab
                position="fixed"
                bottom={30}
                right={30}
                zIndex={1500}
                onClick={handleSave}
            />
        </Box>
    );
};

export default PDFEditorDialog;
