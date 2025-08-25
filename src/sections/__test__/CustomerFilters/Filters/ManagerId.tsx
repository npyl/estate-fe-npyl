import { useFiltersContext } from "@/sections/Customer/ViewAll/(FilterSection)/Context";

const ManagerId = () => {
    const { setManagerId } = useFiltersContext();

    return (
        <>
            <button
                data-testid="set-manager"
                onClick={() => setManagerId(123)}
            />
            <button
                data-testid="clear-manager"
                onClick={() => setManagerId(undefined)}
            />
        </>
    );
};

export default ManagerId;
