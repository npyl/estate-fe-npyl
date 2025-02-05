import useCustomerExists from "../../../../CustomerName/useCustomerExists";
import UpdateDemandsButton from "./UpdateDemands";
import CreateCustomerButton from "../CreateCustomer";

// -------------------------------------------------------------------

const StayUpdatedButtons = () => {
    const { customer, didFound } = useCustomerExists();

    // TODO: show update demands only if there is *actually* an update

    return (
        <>
            {didFound ? (
                <UpdateDemandsButton customerId={customer?.id} />
            ) : null}

            {!didFound ? <CreateCustomerButton /> : null}
        </>
    );
};

export default StayUpdatedButtons;
