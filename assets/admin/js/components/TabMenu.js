import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

//import DashboardContext from '../context/DashboardContext';

export default function TabMenu(props) {

    //const dashboardContext = useContext(DashboardContext);
    let tabs = props.menu_item.tabs;

    //const opt_form = dashboardContext.apiData.localData.settings.form;

    console.log(tabs);


    useEffect(  () => {

    }, [] )


    return (
        <ul className="opt-main-content-ul">
            {
                Object.keys(tabs).map(function(tab_item_key, key) {

                    let tab_item = tabs[tab_item_key];

                    console.log(tab_item.menu.label);

                    return(
                        <li className="opt-main-content-li opt-main-content-li-active" data-list="init" key={key}>{ tab_item.menu.label }</li>
                    )
                })
            }
        </ul>
    )
}