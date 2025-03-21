import { parseAsInteger, useQueryState } from "nuqs";

const getCookieKey = (id: number = -1) =>
    id === -1 ? `PPTaskForm-create` : `PPTaskForm-${id}`;

/**
 * Read taskId from url param using nuqs;
 * This is faster than waiting for useGetCardQuery() and reading data?.id which means PersistNotice is calculated faster
 */
const useCookieKey = () => {
    const [taskId] = useQueryState("taskId", parseAsInteger.withDefault(-1));
    return getCookieKey(taskId);
};

export default useCookieKey;
