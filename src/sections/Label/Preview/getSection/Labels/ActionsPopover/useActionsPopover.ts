import { useCallback, useRef } from "react";
import { TClickCb } from "../types";
import { LabelResourceType } from "@/types/label";
import { ActionsDialogRef } from ".";

const useActionsDialog = (variant: LabelResourceType) => {
    const ref = useRef<ActionsDialogRef>(null);
    const open: TClickCb = useCallback(
        (...args) => ref.current?.open(...args),
        [variant]
    );
    return { ref, open };
};

export default useActionsDialog;
