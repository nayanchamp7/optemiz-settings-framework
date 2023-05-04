import React from 'react';

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

import DashboardContext from '../context/DashboardContext';

import Menu from './Menu';
import Sidebar from './Sidebar';
import TabMenu from './TabMenu';

export default function Body() {

    const dashboardContext = useContext(DashboardContext);
    const opt_form = dashboardContext.apiData.localData.settings.form;

    useEffect(  () => {

        function menuContents() {
            let menu_content_area = document.querySelector('.opt-main-contents');

            let menu_content_items = opt_form.items;

            let counter = 0;
            let menu_content_list = Object.keys(menu_content_items).map( (key) => {

                let menu_content_item = menu_content_items[key];

                let content_classes = ['opt-main-content'];

                if( counter == 0 ) {
                    content_classes.push('opt-main-content-active');
                }

                counter++;

                return (
                    <div className={ content_classes.join(' ') } data-main-content="first">
                            
                        <TabMenu menu_item={ menu_content_item }/>

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

            })

            ReactDOM.render(menu_content_list, menu_content_area);
        }

        menuContents();

    }, [] )

    return (
        <Fragment>
            <form 
            className="opt-body opt-dashboard-form" 
            onSubmit={dashboardContext.saveData}
            enctype="multipart/form-data"
            >
                <div className="opt-body-left-child">
                    
                    <Menu />
                    
                    <div className="opt-main-content-area">

                        <div className='opt-main-contents'></div>

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