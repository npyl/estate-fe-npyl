import useFormPersistStorageKey from "@/sections/useFormPersistStorageKey";
import { parseAsInteger, useQueryState } from "nuqs";

/**
 * Read taskId from url param using nuqs;
 * This is faster than waiting for useGetCardQuery() and reading data?.id which means PersistNotice is calculated faster
 */
const useCookieKey = () => {
    const [taskId] = useQueryState("taskId", parseAsInteger.withDefault(-1));
    return useFormPersistStorageKey("PPTaskForm", taskId);
};

export default useCookieKey;
