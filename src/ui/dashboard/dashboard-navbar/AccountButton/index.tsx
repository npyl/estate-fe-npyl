import { useRef } from "react";
import useDialog from "@/hooks/useDialog";
import AvatarButton from "./Button";
import dynamic from "next/dynamic";
const Popover = dynamic(() => import("./Popover"));

const AccountButton = () => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <AvatarButton ref={anchorRef} onClick={openPopover} />
            {isOpen && anchorRef.current ? (
                <Popover anchorEl={anchorRef.current} onClose={closePopover} />
            ) : null}
        </>
    );
};

export default AccountButton;
