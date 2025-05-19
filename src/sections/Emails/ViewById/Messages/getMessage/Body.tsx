import Typography from "@mui/material/Typography";
import { FC } from "react";

interface BodyProps {
    body: string;
}

const Body: FC<BodyProps> = ({ body }) => {
    return (
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {body || ""}
        </Typography>
    );
};

export default Body;
