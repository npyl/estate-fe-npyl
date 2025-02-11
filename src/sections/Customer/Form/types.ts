import { ICustomerPOST } from "@/types/customer";

interface ICustomerLocationYup {
    street: string;
    number: string;
    city: string;
}

// required fields
interface ICustomerYup
    extends Partial<Omit<ICustomerPOST, "location" | "managedBy">> {
    firstName: string;
    lastName: string;
    managedBy?: string | number;
    location?: ICustomerLocationYup;
}

export type { ICustomerYup };
