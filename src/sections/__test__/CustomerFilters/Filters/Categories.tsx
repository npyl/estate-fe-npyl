import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";

const Categories = () => {
    const { filters, setCategories } = useFiltersContext();

    const { categories } = filters || {};

    // Category handlers
    const handleAddCategory = (category: string) => {
        const updatedCategories = [...(categories || []), category];
        setCategories(updatedCategories);
    };

    const handleRemoveCategory = (category: string) => {
        const updatedCategories = (categories || []).filter(
            (cat) => cat !== category
        );
        setCategories(updatedCategories);
    };

    const handleClearCategories = () => {
        setCategories([]);
    };

    return (
        <>
            <button
                data-testid="add-category-residential"
                onClick={() => handleAddCategory("residential")}
            />
            <button
                data-testid="add-category-commercial"
                onClick={() => handleAddCategory("commercial")}
            />
            <button
                data-testid="remove-category-residential"
                onClick={() => handleRemoveCategory("residential")}
            />
            <button
                data-testid="remove-category-commercial"
                onClick={() => handleRemoveCategory("commercial")}
            />
            <button
                data-testid="clear-categories"
                onClick={handleClearCategories}
            />
        </>
    );
};

export default Categories;
