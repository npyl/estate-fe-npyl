import { Select } from "@/components/hook-form";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { getCATEGORIES } from "../../constants";

const CategorySelect = () => {
    const { t } = useTranslation();
    const CATEGORIES = useMemo(() => getCATEGORIES(t), [t]);

    return (
        <Select
            multiple
            name="categories"
            label={t("Categories")}
            options={CATEGORIES}
            sx={{
                minWidth: "180px",
                width: "fit-content",
            }}
        />
    );
};

export default CategorySelect;
