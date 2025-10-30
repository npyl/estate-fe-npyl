import { BlogPostReq } from "@/types/company";
import PublicSitesPicker from "@/ui/Pickers/PublicSites";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const PublishTo = () => {
    const { t } = useTranslation();
    const { control } = useFormContext<BlogPostReq>();
    return (
        <Controller
            name="publicSites"
            control={control}
            render={({ field: { value, onChange } }) => (
                <PublicSitesPicker
                    label={t<string>("Public Sites")}
                    sites={value}
                    onChange={onChange}
                    sx={{ width: "200px" }}
                />
            )}
        />
    );
};

export default PublishTo;
