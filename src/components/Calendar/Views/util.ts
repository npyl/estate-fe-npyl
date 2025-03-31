import { TGetCellEventsCb, TGetMiscCellEventsCb } from "../types";
import { isSameDay } from "../util";

const _getTodaysEvents: TGetCellEventsCb = (events, date) =>
    events.filter((event) => isSameDay(new Date(event.startDate), date));

/**
 * @param events events to be splitted
 * @returns [events, []] which is the initial events unchanged (Default behaviour)
 */
const _getMiscCellEvents: TGetMiscCellEventsCb = (events) =>
    [events, []] as const;

export { _getTodaysEvents, _getMiscCellEvents };
