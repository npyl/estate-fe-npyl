import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";

const Status = () => {
    const {
        setStatus,
        setLeaser,
        setLessor,
        setSeller,
        setBuyer,
        deleteFilter,
    } = useFiltersContext();

    return (
        <>
            <button data-testid="set-status" onClick={() => setStatus(1)} />
            <button
                data-testid="clear-status"
                onClick={() => setStatus(undefined)}
            />
            <button data-testid="set-leaser" onClick={() => setLeaser(true)} />
            <button
                data-testid="clear-leaser"
                onClick={() => setLeaser(false)}
            />
            <button data-testid="set-lessor" onClick={() => setLessor(true)} />
            <button
                data-testid="clear-lessor"
                onClick={() => setLessor(false)}
            />
            <button data-testid="set-seller" onClick={() => setSeller(true)} />
            <button
                data-testid="clear-seller"
                onClick={() => setSeller(false)}
            />
            <button data-testid="set-buyer" onClick={() => setBuyer(true)} />
            <button data-testid="clear-buyer" onClick={() => setBuyer(false)} />

            <button
                data-testid="delete-status-filter"
                onClick={() => deleteFilter("status")}
            />
        </>
    );
};

export default Status;
