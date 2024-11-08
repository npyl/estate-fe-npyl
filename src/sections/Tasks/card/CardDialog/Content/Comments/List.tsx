import { useFormContext } from "react-hook-form";
import { commentsKey } from "./contants";

const List = () => {
    const { watch } = useFormContext();

    const comments = watch(commentsKey) || [];

    return null;
};

export default List;
