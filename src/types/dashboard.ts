import { IntegrationSite } from "./listings";
import { IKanbanCardLabels } from "./tasks";
import { IUserMini } from "./user";

interface PropertyIntegrations {
    properties: number;
    site: IntegrationSite;
}

interface IDashboard {
    totalProperties: number;
    totalActiveProperties: number;
    totalSoldProperties: number;
    totalRentedProperties: number;
    propertiesDistribution: PropertiesDistribution;
    propertiesPerUserList: PropertiesPerUserList[];
    integrations: PropertyIntegrations[];
    tasks: IDashboardTask[];
}

interface IDashboardTask {
    id: number;
    name: string;
    event: string;
    priority: number;
    uniqueCode: string;
    reporter: IUserMini;
    commentsCount: number;
    columnName: string;
    createdAt: string;
    updatedAt: string;
    labels: IKanbanCardLabels[];
    attachmentCount: number;
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
    PropertyIntegrations,
    IUserDetails,
};
