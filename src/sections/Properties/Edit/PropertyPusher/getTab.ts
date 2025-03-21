import { ITab } from "@/types/tabs";

const getTab = (resourceId: number, isFirstEdit: boolean): ITab => ({
    path: `/property/edit/${resourceId}`,
    renderer: isFirstEdit ? "PROPERTY_CREATE" : "PROPERTY_EDIT",
    resourceId,
});

export default getTab;
