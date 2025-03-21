import { EMPTY_FALLBACK } from "./constant";
import { FieldValues } from "react-hook-form";
import useLocalStorage from "@/hooks/useLocalStorage";

const useFormStorage = <TFieldValues extends FieldValues>(key: string | null) =>
    useLocalStorage<TFieldValues | typeof EMPTY_FALLBACK>(key, EMPTY_FALLBACK);

export default useFormStorage;
