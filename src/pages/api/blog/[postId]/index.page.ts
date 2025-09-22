import type { NextApiRequest, NextApiResponse } from "next/types";
import toNumberSafe from "@/utils/toNumberSafe";
import getBlogPostById from "../_service/getBlogPostById";
import { BlogPostRes } from "@/types/company";
import { IPropertyFileMini } from "@/types/file";

// -----------------------------------------------------------------------------------

const getPropertyFileMini = (url: string): IPropertyFileMini => ({
    id: Math.random(),
    uploadedAt: "",
    url,
});

const addImage = (images: IPropertyFileMini[]) => (f: IPropertyFileMini) =>
    images.push(f);

const editBlogPostRes = (res: BlogPostRes) => {
    let images: IPropertyFileMini[] = [];
    if (res.url) images.push(getPropertyFileMini(res.url));
    res.images.forEach(addImage(images));
    return { ...res, images };
};

// -----------------------------------------------------------------------------------

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "GET") throw new Error("Bad method");

        const Authorization = req.headers?.authorization || "";
        if (!Authorization) throw new Error("Bad Authorization");

        // postId
        const { postId } = req.query;
        const iPostId = toNumberSafe(postId);
        if (iPostId === -1) throw new Error("Bad postId");

        const json = await getBlogPostById(Authorization, iPostId);
        if (!json) throw new Error("Error!");

        const ret = editBlogPostRes(json);

        res.status(200).json(ret);
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
