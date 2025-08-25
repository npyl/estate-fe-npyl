import { StyledInputLabel } from "@/components/Filters/styled";
import { CreateOrUpdateBlogPostReq } from "@/services/blog";
import PublicSitesPicker from "@/ui/Pickers/PublicSites";
import FormControl from "@mui/material/FormControl";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const PublishTo = () => {
    const { t } = useTranslation();
    const { control } = useFormContext<CreateOrUpdateBlogPostReq>();
    return (
        <Controller
            name="publicSites"
            control={control}
            render={({ field: { value, onChange } }) => (
                <FormControl sx={{ width: "150px" }}>
                    <StyledInputLabel>{t("Public Sites")}</StyledInputLabel>
                    <PublicSitesPicker
                        label={t<string>("Public Sites")}
                        sites={value}
                        onChange={onChange}
                    />
                </FormControl>
            )}
        />
    );
};

export default PublishTo;
