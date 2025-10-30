import { IUser, IUserPOST } from "@/types/user";

const IUserToReq = (user?: IUser): IUserPOST => ({
    id: user?.id,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    workspaceEmail: user?.workspaceEmail || "",
    mobilePhone: user?.mobilePhone || "",
    homePhone: user?.homePhone || "",
    businessPhone: user?.businessPhone || "",
    officePhone: user?.officePhone || "",
    callCenterNumber: user?.callCenterNumber || "",
    address: user?.address || "",
    zipCode: user?.zipCode || "",
    city: user?.city || "",
    region: user?.region || "",
    afm: user?.afm || "",
    doy: user?.doy || "",
    gemh: user?.gemh || "",
    status: "Active",
    preferredLanguage: user?.preferredLanguage?.key || "ENGLISH",

    assignedRoles: user?.assignedRoles?.map(({ id }) => id) ?? [],
});

export { IUserToReq };
