import React from 'react';

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

import Menu from './Menu';
import Sidebar from './Sidebar';

export default function Body() {

    const dashboardContext = useContext(dashboardContext);

    return (
        <Fragment>
            <form 
            className="opt-body opt-dashboard-form" 
            onSubmit={dashboardContext.saveData}
            enctype="multipart/form-data"
            >
                <div className="opt-body-left-child">
                    
                    <Menu />
                    
                    <div className="opt-main-contents">

                        <div className="opt-main-content opt-main-content-active" data-main-content="first">
                            
                            <ul className="opt-main-content-ul">
                                <li className="opt-main-content-li opt-main-content-li-active" data-list="init">Initialization</li>
                                <li className="opt-main-content-li" data-list="final">Final total box</li>
                                <li className="opt-main-content-li" data-list="various">Various</li>
                            </ul>

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
                        
                        <div className="opt-main-items-button">
                            <div className="opt-main-item-button">
                                <button className="opt-main-content-bottom-btn" type="submit">Save Changes</button>
                                <a className="opt-main-content-bottom-anchor" href="">Reset Settings</a>
                            </div>
                        </div>

                    </div>
                </div>

                <Sidebar />

            </form>
        </Fragment>
    )
}