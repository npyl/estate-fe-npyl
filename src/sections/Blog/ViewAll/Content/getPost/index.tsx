import Link from "@/components/Link";
import getBorderColor from "@/theme/borderColor";
import { BlogPostShort } from "@/types/company";
import { Box, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import RemoveOpener from "./RemoveOpener";
import Image from "@/components/image";

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
        <Box width={300}>
            <Image
                src={p.url}
                alt=""
                style={{
                    objectFit: "contain",
                    borderRadius: "8px",
                }}
            />
        </Box>
        {p.title}
        <RemoveOpener postId={p.id} />
    </Link>
);

const getPost = (p: BlogPostShort) => <Post key={p.id} p={p} />;

export default getPost;
