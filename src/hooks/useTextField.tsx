import { ChangeEvent, useCallback, useState } from "react";

const useTextField = (initialValue: string = "") => {
    const [value, setValue] = useState(initialValue);
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        []
    );
    return [value, handleChange] as const;
};

export default useTextField;
