import {
    Controller,
    ControllerRenderProps,
    FieldValues,
    useFormContext,
} from "react-hook-form";
import CreateAssign from "@/ui/LabelSection/CreateAssign";
import { FC, useCallback, useMemo } from "react";
import { useGetLabelsQuery } from "@/services/labels";
import { ILabelPOST } from "@/types/label";
import isFalsy from "@/utils/isFalsy";
import Render from "./Render";

const RHFCreate = () => {
    const { control } = useFormContext();
    return (
        <Controller
            name="labels"
            control={control}
            render={(props) => <Render {...props} />}
        />
    );
};

export default RHFCreate;
