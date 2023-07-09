import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";
import DashboardContext from '../../context/DashboardContext';

export default function Text(props) {

    const dashboardContext = useContext(DashboardContext);

    let data  = props.data;

    // console.log('text js');

    return (
        <>
            <input
                className="opt-main-input"
                name={data.name}
                value={ data.value ? data.value : data.default_value }
                placeholder={data.placeholder}
                onChange={dashboardContext.onChangeInput}
                type="text" />
        </>
    )
}