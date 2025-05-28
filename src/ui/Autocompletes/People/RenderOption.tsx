import { ICustomerMini } from "@/types/customer";
import { RenderOption as CustomerRenderOption } from "@/ui/Autocompletes/Customer";
import { RenderOption as ManagerRenderOption } from "@/ui/Autocompletes/Manager";
import { isIUser, IUser } from "@/types/user";

const RenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: ICustomerMini | IUser
) => {
    const Renderer = isIUser(option)
        ? ManagerRenderOption
        : CustomerRenderOption;

    return <Renderer option={option as any} {...props} />;
};

export default RenderOption;
