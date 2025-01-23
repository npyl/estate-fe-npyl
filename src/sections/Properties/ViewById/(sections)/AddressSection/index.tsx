import { useRouter } from "next/router";
import { ViewLocation } from "src/components/Location/View";
import { useGetPropertyByIdQuery } from "src/services/properties";
import PanelWithQuickView from "../../PanelWithQuickView";
import dynamic from "next/dynamic";
import { SxProps, Theme } from "@mui/material";
const VisibilityStatus = dynamic(() => import("./VisibilityStatus"));

const HeaderSx: SxProps<Theme> = { py: 1 };

const AddressSection = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data } = useGetPropertyByIdQuery(+propertyId!);
    const location = data?.location;

    if (!location) return null;

    return (
        <PanelWithQuickView
            label="AddressSection"
            endNode={<VisibilityStatus />}
            headerSx={HeaderSx}
        >
            <ViewLocation location={location} />
        </PanelWithQuickView>
    );
};

export default AddressSection;
