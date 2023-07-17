import React from 'react';

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

import DashboardContext from '../context/DashboardContext';

import Tab from './Tab';
import Sidebar from './Sidebar';
import TabContent from './TabContent';
import SubmitButtons from './SubmitButtons';

export default function Body() {

    const dashboardContext = useContext(DashboardContext);
    const opt_form = dashboardContext.apiData.localData.settings.form;
    let menu_content_items = opt_form.items;

    return (
        <Fragment>
            <form
            className="opt-body opt-dashboard-form"
            onSubmit={dashboardContext.onSubmitData}
            enctype="multipart/form-data"
            >
                <div className="opt-body-left-child">

                    <Tab />

                    <div className="opt-main-content-area">

                        <div className='opt-main-contents'>
                        {
                            Object.keys(menu_content_items).map(function(menu_item_type, key){

                                let menu_content_item = menu_content_items[menu_item_type];

                                return <TabContent item={menu_content_item} item_type={menu_item_type} counter={key} key={key} />;
                            })
                        }
                        </div>

                        <SubmitButtons />

                    </div>
                </div>

                <Sidebar />

            </form>
        </Fragment>
    )
}