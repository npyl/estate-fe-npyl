import Card, { CardProps } from "@mui/material/Card";
import { FC, forwardRef, useImperativeHandle, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { BottomCardRef } from "./types";

const PrintableCard = forwardRef<BottomCardRef, CardProps>((props, ref) => {
    const contentRef = useRef(null);
    const print = useReactToPrint({ contentRef });

    useImperativeHandle(
        ref,
        () => ({
            print,
        }),
        []
    );

    return <Card ref={contentRef} {...props} />;
});

PrintableCard.displayName = "PrintableCard";

export default PrintableCard;
