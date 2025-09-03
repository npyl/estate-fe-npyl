import { useCallback, useState } from "react";

const useDialog = (
    initialValue = false
): [boolean, VoidFunction, VoidFunction] => {
    const [isOpen, setIsOpen] = useState(initialValue);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return [isOpen, open, close];
};

export default useDialog;
