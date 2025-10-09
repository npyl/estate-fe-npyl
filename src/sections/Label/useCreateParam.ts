import { parseAsBoolean, useQueryState } from "nuqs";
import { useCallback } from "react";

const CREATE_FLAG = "create";

const useIsCreate = () => {
    const [create, setCreate] = useQueryState(CREATE_FLAG, parseAsBoolean);
    const goBack = useCallback(() => setCreate(null), []);
    return { create, goBack };
};

export { CREATE_FLAG };
export default useIsCreate;
