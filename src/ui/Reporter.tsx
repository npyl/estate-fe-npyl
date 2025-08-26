import { useAuth } from "@/sections/use-auth";
import TooltipAvatar from "@/components/Avatar/Group/TooltipAvatar";

const Reporter = () => {
    const { user } = useAuth();
    if (!user) return null;
    return <TooltipAvatar u={user} />;
};

export default Reporter;
