import TabCounter from "@/sections/TabCounter";
import { TwoDimentionsDndNode } from "@/components/TwoDimentionsDnd/types";
import useListingContentOperations from "../Content/hook/listing";

const NO_OP = (_: any, i: number): TwoDimentionsDndNode => null;

const SpitogatosLabel = () => {
    const { publicImages } = useListingContentOperations("SPITOGATOS", NO_OP);
    return <TabCounter label="Spitogatos" count={publicImages.length} />;
};

export default SpitogatosLabel;
