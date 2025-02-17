import { useGetPropertyGoogleEarthQuery } from "@/services/properties";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const DownloadButton = dynamic(() => import("./Button"));

const DownloadGoogleEarthButton = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data } = useGetPropertyGoogleEarthQuery(+propertyId!);

    if (!data) return null;

    return <DownloadButton googleEarth={data} />;
};

export default DownloadGoogleEarthButton;
