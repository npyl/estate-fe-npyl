import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface MessageProps {
    main: string;
    secondary?: string;
}

const Message: FC<MessageProps> = ({ main, secondary }) => {
    const { t } = useTranslation();
    return (
        <Stack>
            <Typography fontWeight="bold">{t(main)}</Typography>
            {secondary ? <Typography>{t(secondary)}</Typography> : null}
        </Stack>
    );
};

export default Message;
