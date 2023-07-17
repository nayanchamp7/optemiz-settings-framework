import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";
import DashboardContext from '../../context/DashboardContext';

export default function Select(props) {

    const dashboardContext = useContext(DashboardContext);

    let data  = props.data;

    if( Object.keys(data.options).length === 0 ) {
        return;
    }

    let values = dashboardContext.dataValue[data.name];

    return (
        <select className='opt-select-list' name={data.name + "[]"} multiple={ data.multiple }>
            {
                Object.keys(data.options).map( (option_key, index) => {
                    let option_label    = data.options[option_key];
                    let isSelected      = false;

                    //@TODO apply select 2 here
                    if( (values !== undefined) ) {
                        if( Object.values(values).includes(option_key) ) {
                            isSelected = true;
                        }
                    }

                    return(
                        <option value={option_key} selected={isSelected}>{ option_label }</option>
                    )
                })
            }
        </select>
    )
}