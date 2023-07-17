import React from 'react';
import Select from 'react-select'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";
import DashboardContext from '../../context/DashboardContext';

export default function SelectField(props) {

    const dashboardContext = useContext(DashboardContext);

    let data  = props.data;

    if( Object.keys(data.options).length === 0 ) {
        return;
    }

    let values = dashboardContext.dataValue[data.name];

    let options = [];
    Object.keys(data.options).map( (option_key, index) => {
        let item = {}
        item.value = option_key;
        item.label = data.options[option_key];

        options.push(item);
    });

    const handleChange = (newValue) => {

        console.log(newValue);

        // const inputValue = newValue.replace(/\W/g, "");
        // setInputValue(inputValue);
        // return inputValue;
    };

    return (
        <>
            <Select
                defaultValue={[{label: 'Ayub', value: 'ayub'}, {label: 'Kibria', value: 'kibria'}]}
                // onChange={dashboardContext.onChangeInput}
                onChange={handleChange}
                options={options}
                name={data.name + "[]"}
                loadingIndicator={true}
                isMulti
            />
        </>
    )
}