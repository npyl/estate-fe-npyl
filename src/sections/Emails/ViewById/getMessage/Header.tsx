import { gmail_v1 } from "@googleapis/gmail";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";

const getHeaderValue = (
    headers: gmail_v1.Schema$MessagePartHeader[],
    name: string
): string => {
    const header = headers?.find(
        (h) => h.name?.toLowerCase() === name.toLowerCase()
    );
    return header?.value || "";
};

interface HeaderProps {
    headers: gmail_v1.Schema$MessagePartHeader[];
}

const Header: FC<HeaderProps> = ({ headers }) => {
    // Extract sender, subject, and date from headers
    const sender = getHeaderValue(headers, "From");
    const subject = getHeaderValue(headers, "Subject");
    const date = getHeaderValue(headers, "Date");

    return (
        <Stack>
            <Stack direction="row" spacing={1}>
                <Typography variant="h6">{subject}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    ({sender || "Unknown sender"})
                </Typography>
            </Stack>
            {date && (
                <Typography variant="caption" color="text.secondary">
                    {new Date(date).toLocaleString()}
                </Typography>
            )}
        </Stack>
    );
};

export default Header;
