const MessageBox = dynamic(() => import("@/sections/Emails/Send/MessageBox"));
import useDialog from "@/hooks/useDialog";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const ReplyButton = () => {
    const { t } = useTranslation();

    const [isOpen, openMessageBox, closeMessageBox] = useDialog();

    return (
        <>
            <Button variant="contained" onClick={openMessageBox}>
                {t("Reply")}
            </Button>

            {isOpen ? (
                <MessageBox
                    // to={to}
                    // toFreeSoloed={toFreeSoloed}
                    // propertyIds={propertyIds}
                    onClose={closeMessageBox}
                />
            ) : null}
        </>
    );
};

export default ReplyButton;
