import React from 'react';
import Select from 'react-select'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";
import DashboardContext from '../../context/DashboardContext';

export default function SelectField(props) {

    const dashboardContext = useContext(DashboardContext);

    let data  = props.data;

    if( Object.keys(data.options).length === 0 || Object.keys(dashboardContext.dataValue).length === 0 ) {
        return;
    }

    let values = dashboardContext.dataValue[data.name];

    const [defaultValues, setDefaultValues] = useState([]);

    function getDefaultValues() {
        // default values
        let defaultOptions = [];

        if( (values !== undefined) ) {
            Object.keys(values).map( (option_key, index) => {
                let item = {}
                let value   = values[option_key];

                let ValueObject = data.options.filter(item=>item.value.toLowerCase().includes(value));

                console.log(data.options);
                console.log(value);
                console.log(ValueObject);

                item.value  = value;
                item.label  = ValueObject[0].label;

                defaultOptions.push(item);
            });
        }

        return defaultOptions;
    }


    const handleChange = (newValue) => {

        console.log(newValue);



        // const inputValue = newValue.replace(/\W/g, "");
        // setInputValue(inputValue);
        // return inputValue;
    };


    const promiseOptions = (inputValue) => {


        console.log(inputValue);

        return new Promise((resolve) => {
            setTimeout(() => {
                // resolve(filterColors(inputValue));

                return data.options;
            }, 1000);
        });
    }


    return (
        <>
            <Select
                cacheOptions
                defaultOptions
                value={getDefaultValues()}
                placeholder={ data.placeholder }
                onChange={dashboardContext.onChangeSelect.bind(this)}
                options={data.options}
                name={data.name + "[]"}
                // loadingIndicator={true}
                isMulti
            />
        </>
    )
}