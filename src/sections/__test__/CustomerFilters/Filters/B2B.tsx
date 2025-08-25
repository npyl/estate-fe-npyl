import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";
import { useCallback } from "react";

const B2B = () => {
    const { setB2B, deleteFilter } = useFiltersContext();

    const enableB2B = useCallback(() => setB2B(true), []);
    const clearB2B = useCallback(() => deleteFilter("b2b"), []);

    return (
        <>
            <button data-testid="set-b2b" onClick={enableB2B} />
            <button data-testid="clear-b2b" onClick={clearB2B} />
        </>
    );
};

export default B2B;
