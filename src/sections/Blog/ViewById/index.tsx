import { FC } from "react";
import Content from "./Content";
import Form from "./Form";

interface Props {
    publicId: number;
}

const BlogViewByPublicId: FC<Props> = ({ publicId }) => (
    <Form>
        <Content />
    </Form>
);

export default BlogViewByPublicId;
