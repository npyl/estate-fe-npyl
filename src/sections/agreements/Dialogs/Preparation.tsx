// Fill-in basic information for property, customer, etc. before filling-in the actual pdf

import Dialog, { DialogProps } from "@/components/Dialog";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useState } from "react";

interface Props extends DialogProps {
    onSave: () => void;
}

const PreparationDialog: React.FC<Props> = ({ onSave, ...props }) => {
    const [variant, setVariant] = useState<"basic" | "purchase">("basic");

    const handleBasic = () => setVariant("basic");
    const handlePurchase = () => setVariant("purchase");

    const v1 = variant === "basic" ? "contained" : "outlined";
    const v2 = variant === "purchase" ? "contained" : "outlined";

    return (
        <Dialog
            {...props}
            title={<Typography>Agreement</Typography>}
            content={
                <>
                    <ButtonGroup>
                        <Button variant={v1} onClick={handleBasic}>
                            Basic
                        </Button>
                        <Button variant={v2} onClick={handlePurchase}>
                            Purchase
                        </Button>
                    </ButtonGroup>
                </>
            }
            actions={
                <>
                    <Button onClick={onSave}>Save</Button>
                </>
            }
        />
    );
};

export default PreparationDialog;
