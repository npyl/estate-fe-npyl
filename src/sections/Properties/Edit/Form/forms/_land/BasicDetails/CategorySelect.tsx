import { useWatch } from "react-hook-form";
import PPCategorySelect from "@/ui/Pickers/RHFCategory";

const CategorySelect = () => {
    const parentCategory = useWatch({ name: "parentCategory" }) || "";
    return <PPCategorySelect name="category" parentCategory={parentCategory} />;
};

export default CategorySelect;
