import { useWatch } from "react-hook-form";
import { CreateOrUpdateBlogPostReq } from "@/services/blog";
import { useMemo } from "react";
import Image from "@/components/image";

const IMAGE_HEIGHT = "600px";

const Thumbnail = () => {
    const images = useWatch<CreateOrUpdateBlogPostReq>({ name: "images" });

    const thumbnail = useMemo(() => {
        const i = ((images as File[]) ?? []).at(0);
        if (!i) return;
        return URL.createObjectURL(i);
    }, [images]);

    if (!thumbnail) return null;

    return <Image src={thumbnail} style={{ height: IMAGE_HEIGHT }} />;
};

export default Thumbnail;
