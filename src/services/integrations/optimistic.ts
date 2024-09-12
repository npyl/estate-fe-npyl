// import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
// import { integrations } from ".";
// import { ImagesOrderRes, UpdateImagesOrderReq } from "./types";
// import {
//     BaseQueryFn,
//     FetchArgs,
//     FetchBaseQueryError,
//     FetchBaseQueryMeta,
// } from "@reduxjs/toolkit/query";

// type OptimisticReorderCb = (
//     arg: UpdateImagesOrderReq,
//     api: MutationLifecycleApi<
//         UpdateImagesOrderReq,
//         BaseQueryFn<
//             string | FetchArgs,
//             unknown,
//             FetchBaseQueryError,
//             {},
//             FetchBaseQueryMeta
//         >,
//         void,
//         "integrations"
//     >
// ) => Promise<void>;

// export const optimisticSetOrderedImages: OptimisticReorderCb = async (
//     { propertyId, integrationSite, propertyImages },
//     { dispatch, queryFulfilled }
// ) => {
//     const patchResult = dispatch(
//         integrations.util.updateQueryData(
//             "getIntegrationOrderedImages",
//             { propertyId, integrationSite },
//             (draft) => {
//                 // Create a map of key to image object for quick lookup
//                 const imageMap = new Map(
//                     draft.map((item) => [item.image.key, item])
//                 );

//                 // Update the draft based on the new order
//                 const updatedDraft: ImagesOrderRes[] = propertyImages
//                     .map((id, index) => {
//                         const item = imageMap.get(id);

//                         if (item) {
//                             return {
//                                 ...item,
//                                 order: index, // Update the order if needed
//                             };
//                         }

//                         // If the id doesn't exist in the current draft, we'll skip it
//                         // You might want to handle this case differently based on your requirements
//                         return null;
//                     })
//                     .filter((item) => item !== null);

//                 // Replace the entire draft with the new order
//                 draft.splice(0, draft.length, ...updatedDraft);
//             }
//         )
//     );
//     try {
//         await queryFulfilled;
//     } catch {
//         patchResult.undo();
//     }
// };
