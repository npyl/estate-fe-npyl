import { ICustomerMini } from "@/types/customer";
import { RenderOption as CustomerRenderOption } from "@/ui/Autocompletes/Customer";
import { RenderOption as ManagerRenderOption } from "@/ui/Autocompletes/Manager";
import { isIUser, IUser } from "@/types/user";

const getRenderOption = (
    props: React.HTMLAttributes<HTMLLIElement> & { key: any },
    option: ICustomerMini | IUser
) => {
    const { key, ...other } = props;

    const Renderer = isIUser(option)
        ? ManagerRenderOption
        : CustomerRenderOption;

    return <Renderer key={key} option={option as any} {...other} />;
};

export default getRenderOption;
