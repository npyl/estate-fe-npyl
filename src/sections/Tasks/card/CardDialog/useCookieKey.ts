import useFormPersistStorageKey from "@/ui/useFormPersistStorageKey";
import toNumberSafe from "@/utils/toNumberSafe";
import { useRouter } from "next/router";

const useCookieKey = (quickCreate: boolean) => {
    const router = useRouter();
    const { taskId } = router.query;

    const iTaskId = toNumberSafe(taskId);

    return useFormPersistStorageKey("PPTaskForm", iTaskId, quickCreate);
};

export default useCookieKey;
