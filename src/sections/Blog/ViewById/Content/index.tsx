import { RHFTextField } from "@/components/hook-form";
import RHFEditor from "@/components/hook-form/RHFEditor";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import ImagePicker from "./ImagePicker";
import { FC } from "react";

interface ContentProps {
    siteId: number;
    postId: number;
}

const Content: FC<ContentProps> = ({ siteId, postId }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={1}>
            <ImagePicker siteId={siteId} postId={postId} />
            <RHFTextField label={t("Title")} name="title" />
            <RHFEditor name="content" height="500px" />
        </Stack>
    );
};

export default Content;
