import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

import DashboardContext from '../context/DashboardContext';
import Text from '../components/Fields/Text';

export default function Field(props) {

    const dashboardContext = useContext(DashboardContext);
    let counter = 0;

    useEffect(  () => {

    }, [] )

    let field_item  = props.field;
    let type        = field_item.type;

    // console.log(type);

    function displayField(type) {
        if( type == 'text' ) {
            return (
                <Text data={field_item} />
            );
        }
    }

    return (
        <div className="opt-main-item">
            <div className="opt-contents">
                <h4 className="opt-item-heading">{field_item.label}</h4>
                <p className="opt-item-para">{field_item.description}</p>
            </div>

            { displayField(type) }
        </div>
    )
}