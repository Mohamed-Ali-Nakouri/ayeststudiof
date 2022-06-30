import React from "react";
import {Rings} from 'react-loader-spinner';

const Spinner = () => {
    const centred = {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '6em'
    }
    return (
        <div style={centred}>
        <Rings color="#00BFFF" height={80} width={80}  />
    </div>

    );
}
export {Spinner};

