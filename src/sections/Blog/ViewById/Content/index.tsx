import { RHFTextField, Select } from "@/components/hook-form";
import RHFEditor from "@/components/hook-form/RHFEditor";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import dynamic from "next/dynamic";
import { KeyValue } from "@/types/KeyValue";
const ImagePicker = dynamic(() => import("./ImagePicker"));

const CATEGORIES: KeyValue[] = [
    { key: "purchase-greece", value: "Purchase in Greece" },
    { key: "purchase-patras", value: "Purchase in Patras" },
    { key: "purchase-abroad", value: "Purchase Abroad" },
    { key: "news", value: "News" },
    { key: "guides-advice", value: "Guides and Advice" },
    { key: "dream-homes", value: "Dream Homes" },
    { key: "student-news", value: "Student News" },
    { key: "legal-technical", value: "Legal and Technical" },
    { key: "tourism-athens", value: "Tourism in Athens" },
];

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
            <Stack direction="row" spacing={1} alignItems="center">
                <RHFTextField fullWidth label={t("Title")} name="title" />
                <Select
                    fullWidth
                    name="category"
                    label={t("Category")}
                    options={CATEGORIES}
                />
            </Stack>
            <RHFEditor name="content" height="500px" />
        </Stack>
    );
};

export default Content;
