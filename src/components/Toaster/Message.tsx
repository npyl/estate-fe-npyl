import CloseIcon from "@mui/icons-material/Close";
import { SxProps, Theme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const CloseSx: SxProps<Theme> = {
    top: "50%",
    transform: "translateY(-50%)",
    right: 5,
    position: "absolute",
};

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

            {onDismiss ? (
                <IconButton size="small" sx={CloseSx} onClick={onDismiss}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            ) : null}
        </Stack>
    );
};

export default Message;
