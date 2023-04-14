import React from 'react';

import { Fragment, useState, useEffect } from "@wordpress/element";

export default function Menu() {

    const [apiData, setApiData] = useState({});

    
    useEffect(  () => {


    }, [] )
    

    return (
        <div className="left-sidebar">
            <h4 className="left-sidebar-heading">Control Panel</h4>
            
            <ul className="sidebar-ul">
                <li className="sidebar-li sidebar-li-active" data-main-menu="first"><img src={ opt_dashboard_data.plugin_url + "/assets/images/General.png" } alt="" /><span className="opt-sidebar-text">General</span></li>
                
                
                {/* <li className="sidebar-li" data-main-menu="second"><img src={ opt_dashboard_data.plugin_url + "/assets/images/style.png" } alt="" /><span className="opt-sidebar-text">Style</span></li>
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