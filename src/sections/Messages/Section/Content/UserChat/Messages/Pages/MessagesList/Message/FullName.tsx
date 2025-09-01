import { useGetUserQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface FullNameProps {
    userId: number;
}

const FullName: FC<FullNameProps> = ({ userId }) => {
    const { data, isLoading } = useGetUserQuery(userId);
    const { firstName, lastName } = data ?? {};
    const fullname = `${firstName || ""} ${lastName || ""}`;

    if (isLoading)
        return <Skeleton variant="text" height="30px" width="120px" />;

    return (
        <Typography
            className="pp-message-fullname"
            variant="body2"
            fontWeight="bold"
            mb={0.3}
        >
            {fullname}
        </Typography>
    );
};

export default FullName;
