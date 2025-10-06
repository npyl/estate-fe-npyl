import PPCreateFab from "@/ui/CreateFab";
import { CREATE_FLAG } from "@/sections/Label/useCreateParam";
import CreateWatcher from "./Watcher";

const CreateFab = () => (
    <>
        <PPCreateFab href={`/label?${CREATE_FLAG}=true`} />
        <CreateWatcher />
    </>
);

export default CreateFab;
