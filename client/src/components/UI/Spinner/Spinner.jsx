import React from 'react';
import CircleLoader from "react-spinners/CircleLoader";

const Spinner = () => {
    return (
        <CircleLoader color="blue" loading={true} size={30} />
    )
}

export default Spinner;
