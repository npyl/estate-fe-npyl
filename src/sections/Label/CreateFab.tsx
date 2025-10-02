import PPCreateFab from "@/ui/CreateFab";
import useIdParam from "./useIdParam";

const CreateFab = () => {
    const { gotoCreate } = useIdParam();
    return <PPCreateFab onClick={gotoCreate} />;
};

export default CreateFab;
