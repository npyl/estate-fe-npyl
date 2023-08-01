import React from "react";

interface EditProps {
    data: string;
    setData: (data: string) => void;
}

export const EditManager = ({ data, setData }: EditProps) => {
    return <div>EditManager Component</div>;
};

export const EditOwner = ({ data, setData }: EditProps) => {
    return <div>EditOwner Component</div>;
};

export const EditZipCode = ({ data, setData }: EditProps) => {
    return <div>EditZipCode Component</div>;
};

export const EditArea = ({ data, setData }: EditProps) => {
    return <div>EditArea Component</div>;
};

export const EditLabels = ({ data, setData }: EditProps) => {
    return <div>EditLabels Component</div>;
};

export const EditBedrooms = ({ data, setData }: EditProps) => {
    return <div>EditBedrooms Component</div>;
};

export const EditStatus = ({ data, setData }: EditProps) => {
    return <div>EditStatus Component</div>;
};
