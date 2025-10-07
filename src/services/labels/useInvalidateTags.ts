import { useCallback } from "react";
import { properties } from "@/services/properties";
import { customers } from "@/services/customers";
import { getCardByIdLabelsTag, tasks } from "@/services/tasks";
import { useDispatch } from "react-redux";
import { LabelResourceType } from "@/types/label";
import { labels } from "@/services/labels";
import isFalsy from "@/utils/isFalsy";
import { Dispatch, AnyAction } from "redux";

// ---------------------------------------------------------------------------------------

const doLabels = (dispatch: Dispatch<AnyAction>) =>
    dispatch(labels.util.invalidateTags(["Labels"]));

const doProperty = (dispatch: Dispatch<AnyAction>) =>
    dispatch(properties.util.invalidateTags(["PropertyByIdLabels"]));

const doCustomer = (dispatch: Dispatch<AnyAction>) =>
    dispatch(customers.util.invalidateTags(["CustomerByIdLabels"]));

const doDocuments = (dispatch: Dispatch<AnyAction>) =>
    dispatch(properties.util.invalidateTags(["PropertyByIdDocuments"]));

const doTasks = (dispatch: Dispatch<AnyAction>, cardId?: number) => {
    // INFO: make sure cardId is passed before we invalidateTags
    if (isFalsy(cardId)) return;

    const TAG = getCardByIdLabelsTag(cardId!);

    dispatch(tasks.util.invalidateTags([TAG]));
};

// ---------------------------------------------------------------------------------------

const useInvalidateTags = (resourceId?: number) => {
    const dispatch = useDispatch();

    const invalidateTags = useCallback(
        (variant: LabelResourceType) => {
            // Global
            doLabels(dispatch);

            // By Resource Id
            if (variant === "property") doProperty(dispatch);
            if (variant === "customer") doCustomer(dispatch);
            if (variant === "document") doDocuments(dispatch);
            if (variant === "ticket") doTasks(dispatch, resourceId);
        },
        [resourceId]
    );

    return { invalidateTags };
};

export default useInvalidateTags;
