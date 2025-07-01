import Link from "@/components/Link";
import getBorderColor from "@/theme/borderColor";
import { BlogPostShort } from "@/types/company";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";
import RemoveOpener from "./RemoveOpener";
import Image from "next/image";

const PostSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "background.paper",
    borderRadius: 1,
    boxShadow: 5,
    border: "1px solid",
    borderColor: getBorderColor,
};

interface PostProps {
    p: BlogPostShort;
}

const Post: FC<PostProps> = ({ p }) => (
    <Link href={`/blog/${p.id}`} sx={PostSx}>
        <Image
            src={p.url}
            alt=""
            width={300}
            height={300}
            style={{ borderRadius: "8px" }}
        />
        {p.title}
        <RemoveOpener postId={p.id} />
    </Link>
);

const getPost = (p: BlogPostShort) => <Post key={p.id} p={p} />;

export default getPost;
