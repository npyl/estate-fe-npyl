import Dialog from "@/components/Dialog";
import Form from "./form";
import { StyledDialogActions, StyledDialogTitle } from "./styled";
import { StyledDialogContent } from "@/components/Filters/FilterMore/styled";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material/styles";
import useEventMutations from "./View/useEventMutations";

// -----------------------------------------------------------------

const DialogSx: SxProps<Theme> = {
    "& .MuiDialogTitle-root": {
        display: "none",
    },
};

// -----------------------------------------------------------------

interface Props {
    onClose: VoidFunction;
}

const CreateEventDialog: FC<Props> = ({ onClose }) => {
    const { createEvent } = useEventMutations();

    return (
        <Dialog
            open
            sx={DialogSx}
            DialogTitleComponent={StyledDialogTitle}
            DialogContentComponent={StyledDialogContent}
            DialogActionsComponent={StyledDialogActions}
            content={<Form onSubmit={createEvent} onClose={onClose} />}
        />
    );
};

export default CreateEventDialog;
