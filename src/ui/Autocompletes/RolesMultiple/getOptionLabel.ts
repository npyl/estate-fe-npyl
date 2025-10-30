import { RoleMini } from "@/types/roles";

const getOptionLabel = (o: RoleMini | number) =>
    typeof o === "number" ? "" : o.name;

export default getOptionLabel;
