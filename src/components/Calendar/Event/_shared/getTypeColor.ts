import { TCalendarEventType } from "../../types";

const getTypeColor = (t: TCalendarEventType) =>
    t === "TASK"
        ? "red"
        : t === "MEETING"
        ? "green"
        : t === "TOUR_INPERSON"
        ? "cyan"
        : "blue";

export default getTypeColor;
