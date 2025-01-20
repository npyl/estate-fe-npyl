import { JSXElementConstructor, ReactNode } from "react";
import React from "react";

type ComponentWithName = {
    name: string;
} & (string | JSXElementConstructor<any>);

interface NamedReactElement extends React.ReactElement {
    type: ComponentWithName;
}

const isNamedComponent = (content: ReactNode): content is NamedReactElement =>
    React.isValidElement(content) &&
    typeof content.type === "function" &&
    "name" in content.type;

export default isNamedComponent;
