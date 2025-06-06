import { useTranslation } from "react-i18next";
import { useFieldArray } from "react-hook-form";
import Panel from "@/components/Panel";
import { ICustomerYup } from "../types";
import getMember from "./getMember";
import { nameKey } from "./constants";
import Opener from "./Opener";

const MembersSection = () => {
    const { t } = useTranslation();

    const { fields, append, remove, update } = useFieldArray<ICustomerYup>({
        name: nameKey,
    });

    console.log("GOT: ", fields);

    return (
        <Panel label={t("Members")} endNode={<Opener onAdd={append} />}>
            {fields?.map(getMember(update, remove))}
        </Panel>
    );
};

export default MembersSection;
