import { DialogProps } from "@/components/Dialog";

// ----------------------------------------------------------------------

export interface ConfirmDialogProps
    extends Omit<DialogProps, "title" | "onClose"> {
    title: string;
    onClose: VoidFunction;
}
