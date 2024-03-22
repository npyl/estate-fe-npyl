export interface IDashboard {
    totalProperties: number;
    totalActiveProperties: number;
    totalSoldProperties: number;
    totalRentedProperties: number;
    propertiesDistribution: PropertiesDistribution;
    propertiesPerUserList: PropertiesPerUserList[];
}

export interface PropertiesDistribution {
    residential: number;
    commercial: number;
    land: number;
    other: number;
}

export interface PropertiesPerUserList {
    properties: number;
    user: string;
}
