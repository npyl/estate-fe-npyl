import PanelWithQuickView from "../PanelWithQuickView";
import { useGetProperty } from "@/hooks/property";

const getVideoId = (url: string) => {
    if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1];
    } else if (url.includes("youtube.com/embed/")) {
        return url.split("youtube.com/embed/")[1];
    } else if (url.includes("watch?v=")) {
        let videoId = url.split("watch?v=")[1];
        const ampersandPosition = videoId.indexOf("&");
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId;
    }
    return null;
};

const VideoSection = () => {
    const { property } = useGetProperty();

    if (!property || !property.video) return null;

    const videoId = getVideoId(property.video.trim());

    if (!videoId) return null;

    return (
        <PanelWithQuickView label="VideoSection">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </PanelWithQuickView>
    );
};

export default VideoSection;
