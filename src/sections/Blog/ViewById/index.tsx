import { FC } from "react";
import Content from "./Content";
import Form from "./Form";
import { useGetBlogPostByIdQuery } from "@/services/company";
import Actions from "./Actions";

interface Props {
    siteId: number;
    postId: number;
}

const BlogViewByPublicId: FC<Props> = ({ siteId, postId }) => {
    const { data } = useGetBlogPostByIdQuery({ siteId, postId });
    return (
        <Form data={data}>
            <Content />
            <Actions siteId={siteId} />
        </Form>
    );
};

export default BlogViewByPublicId;
