import { useAuth } from "@/hooks/use-auth";
import { useFilterEmailsQuery } from "@/services/email";

const List = () => {
    const { user } = useAuth();
    const {} = useFilterEmailsQuery({
        body: {},
        userId: user?.id!,
    });
    return null;
};

export default List;
