import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

import DashboardContext from '../context/DashboardContext';
import SubTab from './SubTab';

export default function TabContent(props) {

    const dashboardContext = useContext(DashboardContext);
    //let tabs = props.menu_item.tabs;

    //const opt_form = dashboardContext.apiData.localData.settings.form;

    useEffect(  () => {

    }, [] )

    let content_classes = ['opt-main-content'];

    if( props.counter == 0 ) {
        content_classes.push('opt-main-content-active');
    }

    console.log(props.item);

    let tabs = props.item.tabs;


    return (
        <div className={ content_classes.join(' ') } data-main-content={ props.item_type }>

            <SubTab menu_item={ props.item }/>

            <div className="opt-fields-area">
                <div data-content="init" className="opt-main-items opt-field-active">

                    <div className="opt-main-item">
                        <div className="opt-contents">
                            <h4 className="opt-item-heading">Enable front-end for roles</h4>
                            <p className="opt-item-para">Select the roles that will have access to the extra options.</p>
                        </div>
                        <input className="opt-main-input" name="opt_dashboard_data[opt_frontend]" type="text" />
                    </div>

                    <div className="opt-main-item">
                        <div className="opt-contents">
                            <h4 className="opt-item-heading">Enable front-end for roles</h4>
                            <p className="opt-item-para">Select the roles that will have access to the extra options.</p>
                        </div>
                        <input className="opt-main-input" name="opt_dashboard_data[opt_roles]" type="text" />
                    </div>
                </div>

            </div>
        </div>
    )
}