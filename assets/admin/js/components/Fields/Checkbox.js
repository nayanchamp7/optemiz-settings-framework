import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

export default function Checkbox(props) {

    let data  = props.data;

    if( Object.keys(data.options).length === 0 ) {
        return;
    }


    return (
        <ul className='opt-checkbox-list'>
            {
                Object.keys(data.options).map( (option_key, index) => {
                    let label = data.options[option_key];

                    //@TODO need to be dynamic values after default value parsing
                    let isChecked =  Object.values(data.default_value).includes(option_key) ? 'checked' : '';

                    return(
                        <li>
                            <input
                                name={data.name + "[]"}
                                value={option_key}
                                checked={isChecked}
                                type="checkbox" />
                            <span>{ label }</span>
                        </li>
                    )
                })
            }
        </ul>
    )
}