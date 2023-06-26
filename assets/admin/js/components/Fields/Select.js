import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

export default function Select(props) {

    useEffect(  () => {
        
    }, [] )

    let data  = props.data;

    if( Object.keys(data.options).length === 0 ) {
        return;
    }
    
    //@TODO apply select 2 here
    
    return (
        <select className='opt-select-list' name={data.name + "[]"} multiple={ data.multiple }>
            { 
                Object.keys(data.options).map( (option_key, index) => {
                    let option_label = data.options[option_key];
                    
                    //@TODO need to be dynamic values after default value parsing
                    let isSelected =  Object.values(data.default_value).includes(option_key) ? 'selected' : '';

                    return(
                        <option value={option_key} selected={isSelected}>{ option_label }</option>
                    )
                })
            }
        </select>
    )
}