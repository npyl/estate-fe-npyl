import dynamic from "next/dynamic";

const BarChart = dynamic(
    () => import("@mui/x-charts").then((mod) => mod.BarChart),
    {
        ssr: false,
    }
);

export default BarChart;
