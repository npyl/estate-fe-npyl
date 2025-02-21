import ShareIcon from "@mui/icons-material/Share";
import { FC, useRef } from "react";
import LoadingIconButton from "@/components/LoadingIconButton";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const AgreementShare = dynamic(() => import("./Popover"));

interface Props {
    agreementId: number;
}

const ShareButton: FC<Props> = ({ agreementId }) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openDialog, closeDialog] = useDialog();

    const shareUrls = [`${window.location.href}/agreements/${agreementId}`];

    return (
        <>
            <LoadingIconButton ref={anchorRef} onClick={openDialog}>
                <ShareIcon />
            </LoadingIconButton>

            {isOpen ? (
                <AgreementShare
                    agreementId={agreementId}
                    anchorEl={anchorRef.current}
                    shareUrls={shareUrls}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
};

export default ShareButton;
