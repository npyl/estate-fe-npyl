import { IPropertyFileMini } from "@/types/file";
import isFalsy from "@/utils/isFalsy";
import getBlogPostById from "./getBlogPostById";
import debugLog from "@/_private/debugLog";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog`;

const removeImage = async (
    Authorization: string,
    postId: number,
    imageId: number
) => {
    debugLog("removing image by id: ", imageId);

    const res = await fetch(`${baseUrl}/${postId}/image/${imageId}`, {
        headers: { Authorization },
        method: "DELETE",
    });
    if (!res.ok) throw await res.json();
};

const removeImageCb =
    (Authorization: string, postId: number) =>
    ({ id }: IPropertyFileMini) =>
        removeImage(Authorization, postId, id);

const removeAllImages = async (Authorization: string, postId?: number) => {
    // INFO: exit if we are on create
    if (isFalsy(postId)) return;

    const data = await getBlogPostById(Authorization, postId!);
    if (!data) throw new Error("Could not remove old images");

    const { images } = data;

    await Promise.all(images.map(removeImageCb(Authorization, postId!)));
};

export default removeAllImages;
