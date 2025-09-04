import useFormPersistStorageKey from "@/ui/useFormPersistStorageKey";
import toNumberSafe from "@/utils/toNumberSafe";
import { useRouter } from "next/router";

const BASENAME = "PPTaskForm";

const useCookieKey = (quickCreate: boolean) => {
    const router = useRouter();
    const { taskId } = router.query;

    const iTaskId = toNumberSafe(taskId);

    return useFormPersistStorageKey(BASENAME, iTaskId, quickCreate);
};

export { BASENAME };
export default useCookieKey;
