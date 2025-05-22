import TabCounter from "@/ui/TabCounter";
import useCRMContentOperations from "../Content/hook/crm";
import { TwoDimentionsDndNode } from "@/components/TwoDimentionsDnd/types";

const NO_OP = (_: any, i: number): TwoDimentionsDndNode => null;

const CRMLabel = () => {
    const { publicImages } = useCRMContentOperations("CRM", NO_OP);
    return <TabCounter label="CRM" count={publicImages.length} />;
};

export default CRMLabel;
