import { IUserMini } from "./user";

interface IDashboard {
    totalProperties: number;
    totalActiveProperties: number;
    totalSoldProperties: number;
    totalRentedProperties: number;
    propertiesDistribution: PropertiesDistribution;
    propertiesPerUserList: PropertiesPerUserList[];
    tasks: IDashboardTask[];
}

interface IDashboardTask {
    id: number;
    name: string;
    event: string;
    priority: number;
    uniqueCode: string;
    createdAt: string;
    updatedAt: string;
    reporter: IUserMini;
}

interface PropertiesDistribution {
    residential: number;
    commercial: number;
    land: number;
    other: number;
}

interface IUserDetails extends IUserMini {
    activeTasks: number;
    email: string;
}

interface PropertiesPerUserList {
    properties: number;
    user: string;
    userDetails: IUserDetails;
}

export type {
    IDashboard,
    IDashboardTask,
    PropertiesDistribution,
    PropertiesPerUserList,
    IUserDetails,
};
