import Dialog from "@/components/Dialog";
import Form from "./form";
import {
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogTitle,
} from "./styled";
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
    startDate: string;
}

const CreateEventDialog: FC<Props> = ({ startDate, onClose }) => {
    const { createEvent } = useEventMutations();

    return (
        <Dialog
            open
            sx={DialogSx}
            DialogTitleComponent={StyledDialogTitle}
            DialogContentComponent={StyledDialogContent}
            DialogActionsComponent={StyledDialogActions}
            content={
                <Form
                    startDate={startDate}
                    onSubmit={createEvent}
                    onClose={onClose}
                />
            }
        />
    );
};

export default CreateEventDialog;
