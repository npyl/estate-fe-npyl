import { RHFTextField, Select } from "@/components/hook-form";
import RHFEditor from "@/components/hook-form/RHFEditor";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import dynamic from "next/dynamic";
import { KeyValue } from "@/types/KeyValue";
const ImagePicker = dynamic(() => import("./ImagePicker"));

const CATEGORIES: KeyValue[] = [
    { key: "PURCHASE_GREECE", value: "Purchase in Greece" },
    { key: "PURCHASE_PATRAS", value: "Purchase in Patras" },
    { key: "PURCHASE_ABROAD", value: "Purchase Abroad" },
    { key: "NEWS", value: "News" },
    { key: "GUIDES_ADVICE", value: "Guides and Advice" },
    { key: "DREAM_HOMES", value: "Dream Homes" },
    { key: "STUDENT_NEWS", value: "Student News" },
    { key: "LEGAL_TECHNICAL", value: "Legal and Technical" },
    { key: "TOURISM_ATHENS", value: "Tourism in Athens" },
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
