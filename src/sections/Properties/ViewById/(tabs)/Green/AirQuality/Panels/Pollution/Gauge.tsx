import dynamic from "next/dynamic";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
    ssr: false,
});

interface GaugeProps {
    value: number;
}

const Gauge = ({ value }: GaugeProps) => (
    <GaugeComponent
        type="semicircle"
        arc={{
            width: 0.07,
            colorArray: ["#00FF00", "#FFFF00", "#FFA500", "#FF0000"],
            padding: 0.005,
            subArcs: [
                { limit: 20 },
                { limit: 40 },
                { limit: 60 },
                { limit: 80 },
                { limit: 100 },
            ],
        }}
        labels={{
            tickLabels: {
                ticks: [
                    { value: 0 },
                    { value: 20 },
                    { value: 40 },
                    { value: 60 },
                    { value: 80 },
                    { value: 100 },
                ],
            },
            valueLabel: {
                hide: true,
            },
        }}
        value={value}
        pointer={{ type: "blob", animationDelay: 0 }}
    />
);

export default Gauge;
