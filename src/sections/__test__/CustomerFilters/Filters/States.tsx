import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";

const States = () => {
    const { filters, setStates } = useFiltersContext();

    const { states } = filters || {};

    // State handlers
    const handleAddState = (state: string) => {
        const updatedStates = [...(states || []), state];
        setStates(updatedStates);
    };

    const handleRemoveState = (state: string) => {
        const updatedStates = (states || []).filter((s: string) => s !== state);
        setStates(updatedStates);
    };

    const handleClearStates = () => {
        setStates([]);
    };

    return (
        <>
            <button
                data-testid="add-state-active"
                onClick={() => handleAddState("active")}
            />
            <button
                data-testid="add-state-inactive"
                onClick={() => handleAddState("inactive")}
            />
            <button
                data-testid="remove-state-active"
                onClick={() => handleRemoveState("active")}
            />
            <button
                data-testid="remove-state-inactive"
                onClick={() => handleRemoveState("inactive")}
            />
            <button data-testid="clear-states" onClick={handleClearStates} />
        </>
    );
};

export default States;
