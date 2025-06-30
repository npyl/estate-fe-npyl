import { useTranslation } from "react-i18next";

const BlogPostCreate = () => {
    const { t } = useTranslation();
    return t("New");
};

export default BlogPostCreate;
