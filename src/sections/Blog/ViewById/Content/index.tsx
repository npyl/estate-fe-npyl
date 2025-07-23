import { RHFTextField, Select } from "@/components/hook-form";
import RHFEditor from "@/components/hook-form/RHFEditor";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { FC, useMemo } from "react";
import dynamic from "next/dynamic";
import { getCATEGORIES } from "../../constants";
const ImagePicker = dynamic(() => import("./ImagePicker"));

interface ContentProps {
    postId?: number;
    image?: string;
}

const Content: FC<ContentProps> = ({ postId, image }) => {
    const { t } = useTranslation();
    const CATEGORIES = useMemo(() => getCATEGORIES(t), [t]);
    return (
        <Stack spacing={1}>
            {Boolean(postId) ? (
                <ImagePicker postId={postId!} image={image} />
            ) : null}
            <Stack direction="row" spacing={1} alignItems="center">
                <RHFTextField fullWidth label={t("Title")} name="title" />
                <Select
                    multiple
                    fullWidth
                    name="categories"
                    label={t("Categories")}
                    options={CATEGORIES}
                />
            </Stack>
            <RHFEditor name="content" height="500px" />
        </Stack>
    );
};

export default Content;
