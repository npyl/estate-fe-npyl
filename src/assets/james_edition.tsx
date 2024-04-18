import React from "react";

const jamesImage = "/static/james_edition.jpg";

const JamesEditionIcon = () => {
    return (
        <div>
            <img
                src={jamesImage}
                alt="James Edition"
                width="100px"
                height="100px"
            />
        </div>
    );
};

export default JamesEditionIcon;
