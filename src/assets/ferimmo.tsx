import React from "react";

const ferimmo = "/static/ferimmo.jpg";

const FerimmoIcon = () => {
    return (
        <div>
            <img
                src={ferimmo}
                alt="James Edition"
                width="100px"
                height="100px"
            />
        </div>
    );
};

export default FerimmoIcon;
