import { PropertyStatus } from "@/types/properties";
import { primary } from "./light-theme-options";

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

const FALLBACK = primary.main;

// INFO: make sure we have a hex color
const getSafeHexColor = (color?: string) => {
    if (!color) return FALLBACK;

    // Remove whitespace
    const trimmed = color.trim();

    // Check if it starts with # and has valid length (7 characters total for 6-digit hex)
    if (!trimmed.startsWith("#")) return FALLBACK;

    // Remove the # to check the hex part
    const hexPart = trimmed.slice(1);

    // Must be exactly 6 characters (full hex format only)
    if (hexPart.length !== 6) return FALLBACK;

    // Check if all characters are valid hex digits (0-9, a-f, A-F)
    const isValidHex = /^[0-9A-Fa-f]+$/.test(hexPart);

    if (!isValidHex) return FALLBACK;

    return trimmed;
};

export { getPropertyStatusColor, getSafeHexColor };
