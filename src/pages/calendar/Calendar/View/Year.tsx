const YearView = ({ date }: any) => {
    const year = date.getFullYear();
    const months = [];

    for (let i = 0; i < 12; i++) {
        months.push(
            <div key={i} style={{ border: "1px solid black", padding: "5px" }}>
                {new Date(year, i, 1).toLocaleString("default", {
                    month: "long",
                })}
            </div>
        );
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "5px",
            }}
        >
            {months}
        </div>
    );
};

export default YearView;
