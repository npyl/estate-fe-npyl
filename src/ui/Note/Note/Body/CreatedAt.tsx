import Typography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";

interface CreatedAtProps extends TypographyProps {
    createdAt: string;
}

const CreatedAt: FC<CreatedAtProps> = ({ createdAt: _createdAt, ...props }) => {
    const createdAt = new Date(_createdAt);

    const formattedDate = `${createdAt.getHours()}:${createdAt.getMinutes()} ${createdAt.getDate()}/${
        createdAt.getMonth() + 1
    }/${createdAt.getFullYear()}`;

    return (
        <Typography variant="caption" color="text.disabled" {...props}>
            {formattedDate}
        </Typography>
    );
};

export default CreatedAt;
