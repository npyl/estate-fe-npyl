import { useGetUserQuery } from "@/services/user";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface Title0Props {
    userId: number;
}

const Title0: FC<Title0Props> = ({ userId }) => {
    const { data, isLoading } = useGetUserQuery(userId);
    const { firstName, lastName } = data || {};
    const fullname = `${firstName || ""} ${lastName || ""}`;

    if (isLoading) return <Skeleton width="70%" height="35px" variant="text" />;

    return (
        <Typography variant="body2" fontWeight="bold">
            {fullname}
        </Typography>
    );
};

export default Title0;
