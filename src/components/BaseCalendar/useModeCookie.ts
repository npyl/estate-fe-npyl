import useCookie from "@/hooks/useCookie";
import { TWeekViewMode } from "./types";

const cookieName = "pp-calendar-mode";
const useModeCookie = () => useCookie<TWeekViewMode>(cookieName, "monToSun");
export default useModeCookie;
