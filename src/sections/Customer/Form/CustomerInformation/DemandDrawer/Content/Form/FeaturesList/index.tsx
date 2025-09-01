import { useWatch } from "react-hook-form";
import PriorityFeatures from "./PriorityFeatures";
import { ICustomerYup } from "@/sections/Customer/Form/types";
import { filterName } from "../util";
import { FC } from "react";

interface Props {
    index: number;
}

const FeaturesList: FC<Props> = ({ index }) => {
    const parentCategories = (useWatch<ICustomerYup>({
        name: filterName("parentCategories", index),
    }) || []) as string[];

    return (
        <>
            {parentCategories.map((e) => (
                <PriorityFeatures
                    key={`${index}_${e}_PriorityFeatures`}
                    index={index}
                    parentCategory={e}
                />
            ))}
        </>
    );
};

export default FeaturesList;
