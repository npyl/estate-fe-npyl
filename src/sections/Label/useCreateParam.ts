import { parseAsBoolean, useQueryState } from "nuqs";

const CREATE_FLAG = "create";

const useIsCreate = () => {
    const [create] = useQueryState(CREATE_FLAG, parseAsBoolean);
    return create;
};

export { CREATE_FLAG };
export default useIsCreate;
