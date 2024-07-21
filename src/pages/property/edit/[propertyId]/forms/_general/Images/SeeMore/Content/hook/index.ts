import useCRMContentOperations from "./crm";
import useListingContentOperations from "./listing";
import TUseContentOperations from "./type";

//
//  Hook that merges functionality from two sub-hooks
//  1. crm content hook
//  2. listing content hook
//

const useContentOperations: TUseContentOperations = (tab, createItemCb) => {
    const crmOps = useCRMContentOperations(tab, createItemCb);
    const listingOps = useListingContentOperations(tab, createItemCb);

    return tab === "CRM" ? crmOps : listingOps;
};

export default useContentOperations;
