import { FC } from "react";
import Content from "./Content";
import Form from "./Form";
import { useGetBlogPostByIdQuery } from "@/services/company";

interface Props {
    siteId: number;
    postId: number;
}

const BlogViewByPublicId: FC<Props> = ({ siteId, postId }) => {
    const { data } = useGetBlogPostByIdQuery({ siteId, postId });
    return (
        <Form siteId={siteId} data={data}>
            <Content />
        </Form>
    );
};

export default BlogViewByPublicId;
