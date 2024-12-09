import CloseIcon from "@mui/icons-material/Close";
import { SxProps, Theme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const CloseSx: SxProps<Theme> = {
    top: 0,
    right: 1,
    position: "absolute",
};

interface MessageProps {
    main: string;
    secondary?: string;
}

const Message: FC<MessageProps> = ({ main, secondary }) => {
    const { t } = useTranslation();
    return (
        <Stack position="relative" pr={5}>
            <Typography fontWeight="bold" fontSize="16px">
                {t(main)}
            </Typography>

            {secondary ? (
                <Typography color="text.secondary">{t(secondary)}</Typography>
            ) : null}

            <IconButton size="small" sx={CloseSx}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Stack>
    );
};

export default Message;
