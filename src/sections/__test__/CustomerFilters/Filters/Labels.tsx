import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";

const Labels = () => {
    const { filters, setLabels, deleteFilter } = useFiltersContext();

    const old = filters?.labels ?? [];

    const handleAddLabel = (labelId: number) => {
        setLabels([...old, labelId]);
    };

    const handleRemoveLabel = (labelId: number) => {
        setLabels(old.filter((id) => id !== labelId));
    };

    const handleClearLabels = () => {
        setLabels([]);
    };

    return (
        <>
            <button
                data-testid="add-label-1"
                onClick={() => handleAddLabel(1)}
            />
            <button
                data-testid="add-label-2"
                onClick={() => handleAddLabel(2)}
            />
            <button
                data-testid="add-label-3"
                onClick={() => handleAddLabel(3)}
            />
            <button
                data-testid="remove-label-1"
                onClick={() => handleRemoveLabel(1)}
            />
            <button
                data-testid="remove-label-2"
                onClick={() => handleRemoveLabel(2)}
            />
            <button
                data-testid="remove-label-3"
                onClick={() => handleRemoveLabel(3)}
            />
            <button data-testid="clear-labels" onClick={handleClearLabels} />

            <button
                data-testid="delete-labels-filter"
                onClick={() => deleteFilter("labels")}
            />
        </>
    );
};

export default Labels;
