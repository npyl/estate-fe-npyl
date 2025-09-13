import { IUserDetails } from "@/types/dashboard";

interface UserRowProps {
    u: IUserDetails;
    propertiesCount: number;
    activeProperties?: number;
    inactiveProperties?: number;
    customers: number;
    notifications: number;
}

export type { UserRowProps };
