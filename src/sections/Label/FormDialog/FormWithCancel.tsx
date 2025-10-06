import Form, { LabelFormProps } from "@/ui/Label/Form";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

interface FormWithCancelProps extends Omit<LabelFormProps, "onCancel"> {}

const FormWithCancel: FC<FormWithCancelProps> = (props) => {
    const router = useRouter();
    const goBack = useCallback(() => router.push("/label"), []);
    return <Form onCancel={goBack} {...props} />;
};

export default FormWithCancel;
