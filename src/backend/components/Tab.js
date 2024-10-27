import React from 'react';
import ReactDOM from 'react-dom'

import { Fragment, useState, useEffect, useContext } from "@wordpress/element";

import DashboardContext from '../context/DashboardContext';
import { updateURLParams } from './Utils';

export default function Tab() {

    const dashboardContext = useContext(DashboardContext);

    const opt_settings  = dashboardContext.apiData.localData.settings;
    const opt_form      = opt_settings.form;
    const params        = new URLSearchParams( window.location.search );

    useEffect(  () => {

        function tabItems() {
            let menu_sidebar = document.querySelector('.left-sidebar .opt-settings-sidebar-ul');
            let menu_list_items = opt_form.items;

            let activeTab = document.querySelector('.opt-settings-sidebar-li-active');

            if(activeTab) {
                activeTab.classList.remove('opt-settings-sidebar-li-active');
            }

            let counter = 0;
            let menu_list = Object.keys(menu_list_items).map( (key) => {

                let menu_list_item = menu_list_items[key];

                let menu_item_classes = ['opt-settings-sidebar-li'];

                let tabInURL = '';
                if ( params.has( 'tab' ) ) {
                    tabInURL = params.get( 'tab' );
                }

                if(tabInURL === key) {
                    menu_item_classes.push('opt-settings-sidebar-li-active');
                } else if( counter == 0 ) {
                    menu_item_classes.push('opt-settings-sidebar-li-active');
                }

                console.log('menu list');
                console.log(menu_list_item);

                let tabIcon = opt_dashboard_data.plugin_url + "/assets/images/general.png";
                // if('icon' in menu_list_item.menu) {
                //     tabIcon = opt_dashboard_data.plugin_url + "/assets/images/"+ menu_list_item.menu.icon +".svg";
                // }

                counter++;

                return (
                    <li className={ menu_item_classes.join(' ') } data-main-menu={key} onClick={onClickTab}>
                        <img src={ tabIcon } alt="" />
                        <span className="opt-sidebar-text">{ menu_list_item.menu.label }</span>
                    </li>
                )

            })

            ReactDOM.render(menu_list, menu_sidebar);
        }

        tabItems();

    }, [] )

    function onClickTab(event){
        event.preventDefault();
        event.stopPropagation();

        let $this = event.target;

        let currentItem = $this.closest('.opt-settings-sidebar-li');

        let tabID = currentItem.dataset.mainMenu;

        let tabContent = document.querySelector("[data-main-content="+ tabID + "]");

        let tabContentActive = document.querySelector(".opt-main-content-active");

        tabContentActive.classList.remove("opt-main-content-active");

        tabContent.classList.add("opt-main-content-active");

        // target content first item active
        let tabActiveItem    = tabContent.querySelector('.opt-main-content-ul .opt-main-content-li-active');

        // when active class is available, remove the active class
        if( tabActiveItem ) {
            tabActiveItem.classList.remove('opt-main-content-li-active');
        }

        // get the first tab item of the target menu item
        let targetFirstTab   = tabContent.querySelector('.opt-main-content-ul .opt-main-content-li:first-child');

        // add active class to the first tab of the target menu item
        targetFirstTab.classList.add('opt-main-content-li-active');

        // selector subtab menu list active item
        let mainTabActive = document.querySelector(".opt-settings-sidebar-li-active");

        //remove subtab menu list's active class
        mainTabActive.classList.remove("opt-settings-sidebar-li-active");

        // add active class to the target menu
        currentItem.classList.add('opt-settings-sidebar-li-active');

        //update url params.
        updateURLParams( 'tab', tabID );

    }

    return (
        <div className="left-sidebar">
            <h4 className="left-sidebar-heading">{ opt_settings.args.panel_title }</h4>

            <ul className="opt-settings-sidebar-ul"></ul>
        </div>
    )
}