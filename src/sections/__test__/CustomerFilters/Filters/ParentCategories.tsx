import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";

const ParentCategories = () => {
    const { filters, setParentCategories } = useFiltersContext();

    const { parentCategories } = filters || {};

    // Parent category handlers
    const handleAddParentCategory = (parentCategory: string) => {
        const updatedParentCategories = [
            ...(parentCategories || []),
            parentCategory,
        ];
        setParentCategories(updatedParentCategories);
    };

    const handleRemoveParentCategory = (parentCategory: string) => {
        const updatedParentCategories = (parentCategories || []).filter(
            (cat) => cat !== parentCategory
        );
        setParentCategories(updatedParentCategories);
    };

    const handleClearParentCategories = () => {
        setParentCategories([]);
    };

    return (
        <>
            <button
                data-testid="add-parent-category-sale"
                onClick={() => handleAddParentCategory("sale")}
            />
            <button
                data-testid="add-parent-category-rent"
                onClick={() => handleAddParentCategory("rent")}
            />
            <button
                data-testid="remove-parent-category-sale"
                onClick={() => handleRemoveParentCategory("sale")}
            />
            <button
                data-testid="remove-parent-category-rent"
                onClick={() => handleRemoveParentCategory("rent")}
            />
            <button
                data-testid="clear-parent-categories"
                onClick={handleClearParentCategories}
            />
        </>
    );
};

export default ParentCategories;
