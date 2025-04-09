import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
interface AttachmentsProps {
    count: number;
}

const Attachments: FC<AttachmentsProps> = ({ count }) => (
    <Stack direction="row" alignItems="center" spacing={0.2}>
        <AttachFileOutlinedIcon
            sx={{ width: 16, height: 16, color: "text.secondary" }}
        />
        <Typography variant="body2">{count}</Typography>
    </Stack>
);

export default Attachments;
