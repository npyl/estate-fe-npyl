import React from "react";

const defaultImage = "/static/james_edition.jpg";

const JamesEditionIcon = () => {
    return (
        <div>
            <img
                src={defaultImage}
                alt="My Image"
                width="100px"
                height="100px"
            />
        </div>
    );
};

export default JamesEditionIcon;
