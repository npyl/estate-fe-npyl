import useFormPersistStorageKey from "@/ui/useFormPersistStorageKey";
import toNumberSafe from "@/utils/toNumberSafe";
import { useRouter } from "next/router";
import { parseAsInteger, useQueryState } from "nuqs";

/**
 * Read taskId from url param using nuqs;
 * This is faster than waiting for useGetCardQuery() and reading data?.id which means PersistNotice is calculated faster
 */
const useCookieKey = () => {
    const router = useRouter();
    const { taskId } = router.query;

    const iTaskId = toNumberSafe(taskId);

    return useFormPersistStorageKey("PPTaskForm", iTaskId);
};

export default useCookieKey;
