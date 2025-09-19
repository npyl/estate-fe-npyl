import { useWatch } from "react-hook-form";
import { useMemo } from "react";
import Image from "@/components/image";
import { BlogPostReq } from "@/types/company";

const IMAGE_HEIGHT = "600px";

const Thumbnail = () => {
    const images = useWatch<BlogPostReq>({ name: "images" });

    const thumbnail = useMemo(() => {
        const i = ((images as File[]) ?? []).at(0);
        if (!i) return;
        return URL.createObjectURL(i);
    }, [images]);

    if (!thumbnail) return null;

    return <Image src={thumbnail} style={{ height: IMAGE_HEIGHT }} />;
};

export default Thumbnail;
