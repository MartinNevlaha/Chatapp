import React from 'react';
import DotLoader from "react-spinners/DotLoader";

const Spinner = () => {
    return (
        <DotLoader color="blue" loading={true} size={40} />
    )
}

export default Spinner;
