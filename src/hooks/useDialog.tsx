import { useCallback, useState } from "react";

const useDialog = (): [boolean, VoidFunction, VoidFunction] => {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return [isOpen, open, close];
};

export default useDialog;
