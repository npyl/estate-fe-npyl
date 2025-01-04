import { useCallback } from "react";
import useModeCookie from "./useModeCookie";

type TWeekCb = (date: Date) => Date;

const useWeekUtils = () => {
    const [weekViewMode] = useModeCookie();

    const getStartOfWeek: TWeekCb = useCallback(
        (date) => {
            const result = new Date(
                Date.UTC(
                    date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                    0,
                    0,
                    0,
                    0
                )
            );

            const dayOffset =
                weekViewMode === "monToSun"
                    ? (date.getUTCDay() + 6) % 7
                    : date.getUTCDay();

            result.setUTCDate(date.getUTCDate() - dayOffset);

            return result;
        },
        [weekViewMode]
    );

    const getEndOfWeek: TWeekCb = useCallback(
        (date) => {
            const result = new Date(
                Date.UTC(
                    date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                    23,
                    59,
                    59,
                    999
                )
            );

            const dayOffset =
                weekViewMode === "monToSun"
                    ? (date.getUTCDay() + 6) % 7
                    : date.getUTCDay();

            result.setUTCDate(date.getUTCDate() - dayOffset + 6);

            return result;
        },
        [weekViewMode]
    );

    return { getStartOfWeek, getEndOfWeek };
};

export default useWeekUtils;
