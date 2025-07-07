import { RHFTextField } from "@/components/hook-form";
import RHFEditor from "@/components/hook-form/RHFEditor";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
const ImagePicker = dynamic(() => import("./ImagePicker"));
import { FC } from "react";
import dynamic from "next/dynamic";

interface ContentProps {
    postId?: number;
    image?: string;
}

const Content: FC<ContentProps> = ({ postId, image }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={1}>
            {Boolean(postId) ? (
                <ImagePicker postId={postId!} image={image} />
            ) : null}
            <RHFTextField label={t("Title")} name="title" />
            <RHFEditor name="content" height="500px" />
        </Stack>
    );
};

export default Content;
