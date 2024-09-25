import { PropertyStatus } from "@/types/properties";

type Color = string;

const PROPERTY_STATUS_COLORS: Record<PropertyStatus, Color> = {
    SOLD: "#79798a",
    SALE: "#57825e",
    RENT: "#bd9e39",
    RENTED: "#3e78c2",
    UNAVAILABLE: "#c72c2e",
    TAKEN: "#7d673e",
    UNDER_CONSTRUCTION: "#A300D8",
    UNDER_MAINTENANCE: "#E0067C",
};

const fallbackColor = "#537f91";

const getPropertyStatusColor = (status: string): Color => {
    if (!status) return fallbackColor;
    const statusUpper = status.toUpperCase() as PropertyStatus;
    return PROPERTY_STATUS_COLORS[statusUpper] || fallbackColor; // default color if status is not recognized
};

export { getPropertyStatusColor };
