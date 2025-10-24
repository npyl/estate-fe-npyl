import { useWatch } from "react-hook-form";
import PPCategorySelect from "@/ui/Pickers/RHF/Category";

const CategorySelect = () => {
    const parentCategory = useWatch({ name: "parentCategory" }) || "";
    return <PPCategorySelect name="category" parentCategory={parentCategory} />;
};

export default CategorySelect;
