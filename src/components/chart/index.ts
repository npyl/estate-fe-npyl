import dynamic from "next/dynamic";

const DynamicChart = dynamic(() => import("./chart"), {
    ssr: false,
});

export default DynamicChart;
