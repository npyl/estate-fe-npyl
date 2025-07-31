import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";

const SortBy = () => {
    const { setSorting, deleteFilter } = useFiltersContext();

    return (
        <>
            <button
                data-testid="sort-name-asc"
                onClick={() => setSorting("name-asc")}
            />
            <button
                data-testid="sort-created-desc"
                onClick={() => setSorting("created-desc")}
            />
            <button
                data-testid="sort-default"
                onClick={() => setSorting("default")}
            />

            <button
                data-testid="delete-managerId-filter"
                onClick={() => deleteFilter("managerId")}
            />
        </>
    );
};

export default SortBy;
