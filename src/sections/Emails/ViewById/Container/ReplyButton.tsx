const MessageBox = dynamic(() => import("@/sections/Emails/Send/MessageBox"));
import { useAuth } from "@/sections/use-auth";
import useDialog from "@/hooks/useDialog";
import { useGetThreadQuery } from "@/services/email";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ReplyButtonProps {
    threadId: string;
}

const ReplyButton: FC<ReplyButtonProps> = ({ threadId }) => {
    const { t } = useTranslation();

    const { user } = useAuth();
    const { data } = useGetThreadQuery({
        userId: user?.id!,
        threadId,
    });
    const subject = data?.subject;
    const to = data?.initiator ? [data?.initiator] : [];

    const [isOpen, openMessageBox, closeMessageBox] = useDialog();

    return (
        <>
            <Box>
                <Button variant="contained" onClick={openMessageBox}>
                    {t("Reply")}
                </Button>
            </Box>

            {isOpen ? (
                <MessageBox
                    to={to}
                    subject={subject}
                    threadId={threadId}
                    onClose={closeMessageBox}
                />
            ) : null}
        </>
    );
};

export default ReplyButton;
