import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import CloseButton from "./CloseButton";

interface MessageProps {
    main: string;
    secondary?: string;
}

const Message: FC<MessageProps> = ({ main, secondary, ...other }) => {
    const { t } = useTranslation();

    // INFO: onDismiss is automatically passed to every message that is react component (from @/components/Toast)
    const onDismiss =
        "onDismiss" in other ? (other.onDismiss as VoidFunction) : undefined;

    return (
        <Stack pr={onDismiss ? 5 : 0}>
            <Typography fontWeight="bold" fontSize="16px">
                {t(main)}
            </Typography>

            {secondary ? (
                <Typography color="text.secondary">{t(secondary)}</Typography>
            ) : null}

            {onDismiss ? <CloseButton onClick={onDismiss} /> : null}
        </Stack>
    );
};

export type { MessageProps };
export default Message;
