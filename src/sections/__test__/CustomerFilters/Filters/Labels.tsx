import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";
import { DELETE_LABELS_ID, SET_LABELS_ID } from "./constants";

const Labels = () => {
    const { setLabels, deleteFilter } = useFiltersContext();

    const onSetLabels = () => setLabels([1, 2, 3]);
    const onClear = () => deleteFilter("labels");

    return (
        <>
            <button data-testid={SET_LABELS_ID} onClick={onSetLabels} />
            <button data-testid={DELETE_LABELS_ID} onClick={onClear} />
        </>
    );
};

export default Labels;
