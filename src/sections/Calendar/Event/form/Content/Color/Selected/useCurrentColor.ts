import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useGetColorsQuery } from "@/services/calendar";
import { useAuth } from "@/sections/use-auth";
import toNumberSafe from "@/utils/toNumberSafe";
import { CalendarEventReq } from "@/types/calendar";

const useCurrentColor = () => {
    const { user } = useAuth();
    const { data } = useGetColorsQuery(+user?.id!);

    const colorId = useWatch<CalendarEventReq>({ name: "colorId" });
    const bgcolor = useMemo(
        () => data?.find(({ id }) => id === colorId)?.color,
        [colorId, data]
    );

    if (!colorId) return "text.secondary";
    if (typeof colorId !== "string") return "text.secondary";

    const iColorId = toNumberSafe(colorId);
    const isValid = iColorId > 0 && iColorId < 12;

    return isValid ? bgcolor : "text.secondary";
};

export default useCurrentColor;
