import { TCalendarEventType } from "../../types";

const getTypeColor = (t: TCalendarEventType) =>
    t === "TASK"
        ? "#FF9B9B" // Soft coral red
        : t === "MEETING"
        ? "#98D8AA" // Mint green
        : t === "TOUR_INPERSON"
        ? "#A5D7E8" // Light sky blue
        : "#B4A7E5"; // Soft lavender (default)

export default getTypeColor;
