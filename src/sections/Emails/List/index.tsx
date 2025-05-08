import { useAuth } from "@/hooks/use-auth";
import { useFilterEmailsQuery } from "@/services/email";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import Stack from "@mui/material/Stack";
import getEmail from "./getEmail";

const List = () => {
    const { user } = useAuth();

    const { from, to, propertyIds } = useFiltersContext();

    const { data } = useFilterEmailsQuery({
        body: {
            from,
            to,
            propertyIds,
        },
        userId: user?.id!,
    });

    return <Stack>{data?.map(getEmail)}</Stack>;
};

export default List;
