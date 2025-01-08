import Typography from "@mui/material/Typography";
import { FC } from "react";

interface UpdatedAtProps {
    date: string;
}

const UpdatedAt: FC<UpdatedAtProps> = ({ date }) => (
    <Typography variant="body2" fontWeight="300" color="text.secondary">
        {new Date(date).toLocaleDateString()}
    </Typography>
);

export default UpdatedAt;
