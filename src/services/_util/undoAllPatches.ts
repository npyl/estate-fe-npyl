import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks";
const undoPatch = (c: PatchCollection) => c.undo();
const undoAllPatches = (r: PatchCollection[]) => r.forEach(undoPatch);
export default undoAllPatches;
