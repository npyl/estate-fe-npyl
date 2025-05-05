import { ComponentType } from "react";
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";

const VIEWS: ComponentType[] = [Step0, Step1, Step2];

export { default as FINAL } from "./Final";
export default VIEWS;
