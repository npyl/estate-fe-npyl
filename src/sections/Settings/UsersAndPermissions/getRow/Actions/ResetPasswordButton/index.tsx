import { MouseEvent, FC, useCallback } from "react";
import KeyIcon from "@mui/icons-material/Key";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import RoundIconButton from "@/components/RoundIconButton";
const ResetDialog = dynamic(() => import("./Dialog"));

interface Props {
    userId: number;
}

const ResetPasswordButton: FC<Props> = ({ userId }) => {
    const [isOpen, open, close] = useDialog();
    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        open();
    }, []);
    return (
        <>
            <RoundIconButton size="small" onClick={onClick}>
                <KeyIcon fontSize="small" />
            </RoundIconButton>

            {isOpen ? <ResetDialog userId={userId} onClose={close} /> : null}
        </>
    );
};

export default ResetPasswordButton;
