import useCookie from "@/hooks/useCookie";
import { EMPTY_FALLBACK } from "./constant";
import { FieldValues } from "react-hook-form";

const useFormCookie = <TFieldValues extends FieldValues>(
    cookieKey: string | null
) => {
    return useCookie<TFieldValues | typeof EMPTY_FALLBACK>(
        cookieKey,
        EMPTY_FALLBACK
    );
};

export default useFormCookie;
