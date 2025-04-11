import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";

interface LabelsProps {
    count: number;
}

const Labels: FC<LabelsProps> = ({ count }) => (
    <Stack direction="row" alignItems="center" spacing={0.2}>
        <LabelImportantOutlinedIcon
            sx={{ width: 16, height: 16, color: "text.secondary" }}
        />
        <Typography variant="body2">{count}</Typography>
    </Stack>
);

export default Labels;
