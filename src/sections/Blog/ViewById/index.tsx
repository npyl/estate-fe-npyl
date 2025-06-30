import { FC } from "react";
import Content from "./Content";
import Form from "./Form";
import { useGetBlogPostByIdQuery } from "@/services/blog";
import Actions from "./Actions";

interface Props {
    postId?: number;
}

const BlogViewByPublicId: FC<Props> = ({ postId }) => {
    const { data } = useGetBlogPostByIdQuery(postId!, {
        skip: !Boolean(postId),
    });
    return (
        <Form data={data}>
            <Content postId={postId} />
            <Actions postId={postId} />
        </Form>
    );
};

export default BlogViewByPublicId;
