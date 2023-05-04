import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

import DashboardContext from '../context/DashboardContext';

export default function Menu() {

    //const [apiData, setApiData] = useState({});

    const dashboardContext = useContext(DashboardContext);

    const opt_form = dashboardContext.apiData.localData.settings.form;

    // console.log(dashboardContext);

    
    useEffect(  () => {

        function menuItems() {
            let menu_sidebar = document.querySelector('.left-sidebar .sidebar-ul');

            let menu_list_items = opt_form.items;

            let counter = 0;
            let menu_list = Object.keys(menu_list_items).map( (key) => {

                let menu_list_item = menu_list_items[key];

                let menu_item_classes = ['sidebar-li'];

                if( counter == 0 ) {
                    menu_item_classes.push('sidebar-li-active');
                }

                counter++;

                return (
                    <li className={ menu_item_classes.join(' ') } data-main-menu="first">
                        <img src={ opt_dashboard_data.plugin_url + "/assets/images/General.png" } alt="" /><span className="opt-sidebar-text">{ menu_list_item.menu.label }</span>
                    </li>
                )

            })

            ReactDOM.render(menu_list, menu_sidebar);
        }

        menuItems();

    }, [] )
    

    return (
        <div className="left-sidebar">
            <h4 className="left-sidebar-heading">{ opt_form.section.label }</h4>
            
            <ul className="sidebar-ul">
                
                {/* 
                <li className="sidebar-li sidebar-li-active" data-main-menu="first"><img src={ opt_dashboard_data.plugin_url + "/assets/images/General.png" } alt="" /><span className="opt-sidebar-text">General</span></li>
                <li className="sidebar-li" data-main-menu="second"><img src={ opt_dashboard_data.plugin_url + "/assets/images/style.png" } alt="" /><span className="opt-sidebar-text">Style</span></li>
                <li className="sidebar-li" data-main-menu="third"><img src={ opt_dashboard_data.plugin_url + "/assets/images/display.png" } alt="" /><span className="opt-sidebar-text">Display</span></li>
                <li className="sidebar-li"><img src={ opt_dashboard_data.plugin_url + "/assets/images/cart.png" } alt="" /><span className="opt-sidebar-text">Cart</span></li>
                <li className="sidebar-li"><img src={ opt_dashboard_data.plugin_url + "/assets/images/order.png" } alt="" /><span className="opt-sidebar-text">Order</span></li>
                <li className="sidebar-li"><img src={ opt_dashboard_data.plugin_url + "/assets/images/string.png" } alt="" /><span className="opt-sidebar-text">String</span></li>
                <li className="sidebar-li"><img src={ opt_dashboard_data.plugin_url + "/assets/images/global.png" } alt="" /><span className="opt-sidebar-text">Global</span></li>
                <li className="sidebar-li"><img src={ opt_dashboard_data.plugin_url + "/assets/images/license.png" } alt="" /><span className="opt-sidebar-text">License</span></li>
                <li className="sidebar-li"><img src={ opt_dashboard_data.plugin_url + "/assets/images/upload_manager.png" } alt="" /><span className="opt-sidebar-text">Upload Manager</span></li>
                <li className="sidebar-li"><img src={ opt_dashboard_data.plugin_url + "/assets/images/custom.png" } alt="" /><span className="opt-sidebar-text">Custom Code</span></li> */}
            </ul>
        </div>
    )
}