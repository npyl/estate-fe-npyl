import { usePathname } from "next/navigation";
import CustomersCreateIcon from "@/assets/icons/customers-create";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

const isb2b = (p: string) => p.startsWith("/b2b/");

const CreateIcon = () => {
    const path = usePathname();
    const isB2B = isb2b(path);
    return isB2B ? <CorporateFareIcon /> : <CustomersCreateIcon />;
};

export default CreateIcon;
