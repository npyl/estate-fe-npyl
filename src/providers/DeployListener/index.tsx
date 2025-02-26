import toast from "./Toast";
import useVersion from "./useVersion";
import useVersionLive from "./useVersionLive";

const localBuildId = process.env.NEXT_PUBLIC_BUILD_ID || "";

const onBuildId = (id?: string) => {
    if (!id || !localBuildId) return;

    const mismatch = localBuildId !== id;
    if (!mismatch) return;

    toast();
};

const DeployListener = () => {
    useVersion(onBuildId);
    useVersionLive(onBuildId);
    return null;
};

export default DeployListener;
