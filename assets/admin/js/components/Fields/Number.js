import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

export default function Number(props) {

    let data  = props.data;

    return (
        <>
            <input
                className="opt-main-input"
                name={data.name}
                value={ data.value ? data.value : data.default_value }
                placeholder={data.placeholder}
                type="number" />
        </>
    )
}