import { LOCAL_DATE_FORMAT } from "@/constants/datepicker";
import dayjs from "dayjs";

/**
 * @param s ISO Date string
 */
const toLocalDate = (s: string) => dayjs(s).format(LOCAL_DATE_FORMAT);

export default toLocalDate;
