import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import ColorBox from "./Box";
import { useGetColorsQuery } from "@/services/calendar";
import { useAuth } from "@/sections/use-auth";
import toNumberSafe from "@/utils/toNumberSafe";

const useCurrentColor = () => {
    const { user } = useAuth();
    const { data } = useGetColorsQuery(+user?.id!);

    const colorId = useWatch({ name: "colorId" });
    const bgcolor = useMemo(
        () => data?.find(({ id }) => id === colorId)?.color,
        [colorId, data]
    );

    const iColorId = toNumberSafe(colorId);
    const isValid = iColorId > 0 && iColorId < 12;

    return isValid ? bgcolor : "text.secondary";
};

const SelectedColorBox = () => {
    const bgcolor = useCurrentColor();
    return <ColorBox bgcolor={bgcolor} />;
};

export default SelectedColorBox;
