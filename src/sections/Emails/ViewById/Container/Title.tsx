import { useGetThreadQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

interface TitleProps {
    threadId: string;
}

const Title: FC<TitleProps> = ({ threadId }) => {
    const { user } = useAuth();
    const { data, isLoading } = useGetThreadQuery({
        userId: user?.id!,
        threadId,
    });

    if (isLoading) return <Skeleton width="100px" height="30px" />;

    return <Typography variant="h6">{data?.subject}</Typography>;
};

export default Title;
