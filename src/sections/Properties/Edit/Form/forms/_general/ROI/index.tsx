const ROI = dynamic(() => import("./Select"));
import dynamic from "next/dynamic";
import { useWatch } from "react-hook-form";

const ROISection = () => {
    const state = useWatch({ name: "state" });

    if (state === "Sale") return <ROI />;

    return null;
};

export default ROISection;
