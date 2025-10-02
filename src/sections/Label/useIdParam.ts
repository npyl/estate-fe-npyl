import { parseAsString, useQueryState } from "nuqs";
import { useCallback } from "react";

const CREATE_FLAG = "create";

const useIdParam = () => {
    const [id, setId] = useQueryState("id", parseAsString.withDefault(""));
    const gotoCreate = useCallback(() => setId(CREATE_FLAG), []);
    const removeId = useCallback(() => setId(null), []);
    return { id, gotoCreate, setId, removeId };
};

export { CREATE_FLAG };
export default useIdParam;
