import { useGetPropertyGoogleEarthQuery } from "@/services/properties";
import { useRouter } from "next/router";
import PanelWithQuickView from "../../PanelWithQuickView";
import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";
const EmptyPlaceholder = dynamic(() => import("./EmptyPlaceholder"));
const Item = dynamic(() => import("./Item"));

const GoogleEarthSection = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data, isLoading } = useGetPropertyGoogleEarthQuery(+propertyId!);

    return (
        <PanelWithQuickView
            label="GoogleEarthSection"
            childrenSx={{
                p: 2,
            }}
        >
            {isLoading ? <Skeleton width="30%" height="58px" /> : null}
            {!isLoading && !data ? <EmptyPlaceholder /> : null}
            {!isLoading && data ? <Item googleEarth={data} /> : null}
        </PanelWithQuickView>
    );
};

export default GoogleEarthSection;
