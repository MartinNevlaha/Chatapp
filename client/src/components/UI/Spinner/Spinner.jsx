import React from 'react';
import RingLoader from "react-spinners/RingLoader";

const Spinner = (props) => {
    return (
        <RingLoader color="blue" loading={true} size={30} />
    )
}

export default Spinner;
