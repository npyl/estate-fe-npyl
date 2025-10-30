import { useCallback, useRef } from "react";
import { TClickCb } from "./types";
import { ActionsDialogRef } from ".";

const useActionsDialog = () => {
    const ref = useRef<ActionsDialogRef>(null);
    const open: TClickCb = useCallback(
        (...args) => ref.current?.open(...args),
        []
    );
    return { ref, open };
};

export default useActionsDialog;
