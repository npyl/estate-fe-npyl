import { useCallback } from "react";
import { useSettingsContext } from "./Settings";

type TWeekCb = (date: Date) => Date;

const useWeekUtils = () => {
    const { weekViewMode } = useSettingsContext();

    const getStartOfWeek: TWeekCb = useCallback(
        (date) => {
            const result = new Date(date);

            const dayOffset =
                weekViewMode === "monToSun"
                    ? (date.getDay() + 6) % 7
                    : date.getDay();

            result.setDate(date.getDate() - dayOffset);
            result.setHours(0, 0, 0, 0);

            return result;
        },
        [weekViewMode]
    );

    const getEndOfWeek: TWeekCb = useCallback(
        (date) => {
            const result = new Date(date);

            const dayOffset =
                weekViewMode === "monToSun"
                    ? (date.getDay() + 6) % 7
                    : date.getDay();

            result.setDate(date.getDate() - dayOffset + 6);
            result.setHours(23, 59, 59, 999);

            return result;
        },
        [weekViewMode]
    );

    return { getStartOfWeek, getEndOfWeek };
};

export default useWeekUtils;
